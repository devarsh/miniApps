import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  completeUpload,
  pauseUpload,
  deleteUpload,
  startUpload,
  monkeyPatchReducer,
  replaceState
} from "./redux";

import { FileUploadContext } from "./context";
import tus from "tus-js-client";

const useStyles = makeStyles(theme => ({
  listItem: {
    boxShadow: theme.shadows[2],
    marginBottom: theme.spacing(1)
  }
}));

const File = ({ id, fd, uploading, uploaded, uploadInterrupted }) => {
  const fileUploadState = React.useContext(FileUploadContext);

  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const uploadInstanceRef = React.useRef(null);
  const initiateUpload = () => {
    let instance = uploadInstanceRef.current;
    if (instance !== null) {
      return instance;
    }
    instance = new tus.Upload(fd, {
      endpoint: "http://localhost:8080/files",
      /*retryDelays: [0, 3000, 5000, 10000, 20000],*/
      metadata: {
        filename: fd.name,
        filetype: fd.type
      },
      onProgress: function(bytesUploaded, bytesTotal) {
        let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        setProgress(percentage);
      },
      onSuccess: function() {
        let newState = monkeyPatchReducer(
          fileUploadState.state,
          completeUpload,
          id
        );
        newState = monkeyPatchReducer(newState, startUpload);
        replaceState(fileUploadState.dispatch)(newState);
      },
      onError: function(error) {
        console.log(error);
        pauseUpload(fileUploadState.dispatch)(id, false);
      }
    });
    return instance;
  };
  const uploadInstance = initiateUpload();
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
    return () => console.log(`file: ${id}-${fd.name} is deleted`);
  }, []);
  const handleDelete = () => {
    deleteUpload(fileUploadState.dispatch)(id);
  };
  return (
    <ListItem key={id} className={classes.listItem}>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        disableTypography={true}
        primary={<Typography>{fd.name}</Typography>}
        secondary={
          uploading ? (
            <LinearProgress
              variant="determinate"
              value={progress}
              style={{ width: "90%" }}
            />
          ) : (
            `${fd.size} bytes`
          )
        }
      />
      <ListItemSecondaryAction>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default File;
