import * as React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import Tooltip from "@material-ui/core/Tooltip";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { computeSize } from "./utils";
import TagsAutoComplete from "./tagsAutoComplete";
import {
  completeUpload,
  pauseUpload,
  deleteUpload,
  startUpload,
  queueUpload,
  monkeyPatchReducer,
  setUploadError,
  setTags,
  setTagsTouched,
  setTagsError,
} from "./redux";
import { FileUploadContext } from "./context";
import tus from "tus-js-client";
import RefreshIcon from "@material-ui/icons/Refresh";
import StopIcon from "@material-ui/icons/Stop";

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginBottom: theme.spacing(1),
  },
}));

export const FileList = ({ files, maxAllowedConcurrentUploads }) => {
  const filesArray = files.map((file) => {
    return file.rejected ? (
      <FileListItemRejected {...file} key={file.id} />
    ) : (
      <FileListItem
        {...file}
        key={file.id}
        maxAllowedConcurrentUploads={maxAllowedConcurrentUploads}
      />
    );
  });
  return <List dense={true}>{filesArray}</List>;
};

const FileListItemRejected = ({ id, fd, error }) => {
  const fileUploadCtx = React.useContext(FileUploadContext);
  const classes = useStyles();
  const handleDelete = () => {
    deleteUpload(id)(fileUploadCtx.dispatch);
  };
  return (
    <ListItem key={id} className={classes.listItem}>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={fd.name} secondary={error} />
      <ListItemSecondaryAction>
        <IconButton onClick={handleDelete}>
          <Tooltip title="delete upload">
            <ClearIcon />
          </Tooltip>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const FileListItem = ({
  id,
  fd,
  uploadedInititated,
  uploading,
  uploaded,
  error,
  maxAllowedConcurrentUploads,
  tags,
  tagsTouched,
  tagsError,
}) => {
  const classes = useStyles();
  const fileUploadCtx = React.useContext(FileUploadContext);
  const [progress, setProgress] = React.useState({
    percentage: 0,
    totalSize: computeSize(fd.size),
    uploadedLengthStr: "0 bytes",
  });
  const uploadInstanceRef = React.useRef(null);
  const [triggerError, setTriggerError] = React.useState(false);
  const [triggerCompleted, setTriggerCompleted] = React.useState(false);
  const sendErrorMessageRef = React.useRef(null);
  const [deleteStarted, setDeleteStarted] = React.useState(false);
  //something interesting happened, since tus used callbacks, the context values form
  //closure, and hence stale context value was used to update redux store and created pleny of
  //trouble, so fixed the issue by triggering the callbacks in hooks and always getting
  //updated context value. LOL closures can bite your ass hard if you dont pay attention.
  /*eslint-disable react-hooks/exhaustive-deps*/
  React.useEffect(() => {
    if (triggerError === true) {
      if (uploading === true) {
        monkeyPatchReducer(
          pauseUpload(id),
          setUploadError(id, sendErrorMessageRef.current),
          queueUpload(maxAllowedConcurrentUploads)
        )(fileUploadCtx.dispatch, fileUploadCtx.state);
      } else {
        monkeyPatchReducer(
          setUploadError(id, sendErrorMessageRef.current),
          queueUpload(maxAllowedConcurrentUploads)
        )(fileUploadCtx.dispatch, fileUploadCtx.state);
      }
      setTriggerError(false);
    }
  }, [triggerError]);
  React.useEffect(() => {
    if (triggerCompleted === true) {
      monkeyPatchReducer(
        completeUpload(id),
        queueUpload(maxAllowedConcurrentUploads)
      )(fileUploadCtx.dispatch, fileUploadCtx.state);
      setTriggerCompleted(false);
    }
  }, [triggerCompleted]);
  React.useEffect(() => {
    if (uploaded === false) {
      if (uploading === true) {
        uploadInstance.start();
      } else {
        uploadInstance.abort();
      }
    }
  }, [uploading, uploaded]);
  React.useEffect(() => {
    return () => {
      if (uploaded === false && uploading === true) {
        uploadInstance.abort(true, (err) => {
          if (err instanceof Error) {
            console.log("failed to delete file on server");
          } else {
            console.log(`file: ${id}-${fd.name} is deleted`);
          }
        });
      }
    };
  }, []);
  const handleDelete = () => {
    setDeleteStarted(true);
    uploadInstance.abort(true, (err) => {
      setDeleteStarted(false);
      if (err instanceof Error) {
        setUploadError(
          id,
          "failed to delete file on server"
        )(fileUploadCtx.dispatch);
      } else {
        deleteUpload(id)(fileUploadCtx.dispatch);
      }
    });
  };
  const handleResume = () => {
    if (uploaded === false && uploading === false) {
      monkeyPatchReducer(startUpload(id, maxAllowedConcurrentUploads))(
        fileUploadCtx.dispatch,
        fileUploadCtx.state
      );
    }
  };
  const handleStop = () => {
    if (uploaded === false && uploading === true) {
      monkeyPatchReducer(
        pauseUpload(id),
        setUploadError(id, "upload cancelled")
      )(fileUploadCtx.dispatch, fileUploadCtx.state);
    }
  };
  const initiateUpload = () => {
    let instance = uploadInstanceRef.current;
    if (instance !== null) {
      return instance;
    }
    uploadInstanceRef.current = new tus.Upload(fd, {
      endpoint: fileUploadCtx.endpoint,
      resume: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        filename: fd.name,
        filetype: fd.type,
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        setProgress({
          totalSize: progress.totalSize,
          percentage: Number(percentage),
          uploadedLengthStr: computeSize(bytesUploaded),
        });
      },
      onSuccess: () => {
        setTriggerCompleted(true);
      },
      onError: function (error) {
        if (error.message.indexOf("tus: failed to resume upload") >= 0) {
          sendErrorMessageRef.current = "failed to resume upload try again";
        } else if (error.message.indexOf("tus: failed to create upload") >= 0) {
          sendErrorMessageRef.current = "failed to start upload try again";
        } else if (
          error.message.indexOf("tus: failed to upload chunk at offset") >= 0
        ) {
          sendErrorMessageRef.current = "could not connect to server";
        } else {
          sendErrorMessageRef.current = "unknown error occured";
        }
        setTriggerError(true);
      },
    });
    return uploadInstanceRef.current;
  };
  const uploadInstance = initiateUpload();
  const setValue = React.useCallback(setTags(id), [id]);
  const setTouched = React.useCallback(setTagsTouched(id), [id]);
  const setError = React.useCallback(setTagsError(id), [id]);
  return (
    <ListItem key={id} className={classes.listItem}>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        disableTypography={true}
        primary={
          <Typography>
            {uploaded ? (
              <a
                href={uploadInstanceRef.current.url}
                rel="noopener noreferrer"
                type={fd.type}
                target="_blank"
              >
                {fd.name}
              </a>
            ) : (
              fd.name
            )}
          </Typography>
        }
        secondary={
          uploaded ? (
            <>
              <Typography variant="body2">
                uploaded successfully completed
              </Typography>
              <TagsAutoComplete
                label={"tags"}
                setValue={setValue}
                setTouched={setTouched}
                setError={setError}
                value={tags}
                touched={tagsTouched}
                error={tagsError} 
                getOptionLabel
                callback
                dispatch={fileUploadCtx.dispatch}
                state={fileUploadCtx.state}
              />
            </>
          ) : uploadedInititated ? (
            <>
              <LinearProgress
                variant="determinate"
                value={progress.percentage}
                style={{ width: "80%" }}
              />
              <Typography variant="body2" color={!!error ? "error" : "initial"}>
                {uploading
                  ? `uploaded ${progress.uploadedLengthStr} of ${progress.totalSize}`
                  : error}
              </Typography>
            </>
          ) : (
            <Typography variant="body2">Waiting for upload to start</Typography>
          )
        }
      />
      <ListItemSecondaryAction>
        {uploaded === false ? (
          uploading === true ? (
            <Tooltip title="stop upload">
              <IconButton onClick={handleStop}>
                <StopIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip
              title={uploadedInititated ? "retry upload" : "start upload"}
            >
              <IconButton onClick={handleResume}>
                {uploadedInititated ? <RefreshIcon /> : <PlayArrowIcon />}
              </IconButton>
            </Tooltip>
          )
        ) : null}
        <IconButton onClick={handleDelete} disabled={deleteStarted}>
          <Tooltip title="delete upload">
            <ClearIcon />
          </Tooltip>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
