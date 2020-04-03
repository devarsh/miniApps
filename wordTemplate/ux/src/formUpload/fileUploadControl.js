import React from "react";
import Card from "@material-ui/core/card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import produce from "immer";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import DragDropPlaceholder from "./dragDropPlaceholder";
import File from "./file";
import {
  immutableReducer,
  initialState,
  queueFilesForUpload,
  startUpload,
  monkeyPatchReducer,
  replaceState
} from "./redux";
import { FileUploadContext } from "./context";

const useStyles = makeStyles(theme => ({
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1)
  },
  card: {
    minWidth: "450px",
    boxShadow: theme.shadows[2]
  },
  cardContent: {
    height: "250px",
    overflow: "scroll"
  }
}));

const useImmerReducer = (reducer, initialState, initialAction) => {
  const cachedReducer = React.useCallback(produce(reducer), [reducer]);
  return React.useReducer(cachedReducer, initialState, initialAction);
};

const FileList = ({ files }) => {
  const filesArray = files.map(file => <File {...file} key={file.id} />);
  return <List dense={true}>{filesArray}</List>;
};

const FileUploadController = () => {
  const classes = useStyles();
  const fileDialogRef = React.useRef();
  const [state, dispatch] = useImmerReducer(immutableReducer, initialState);
  const [, drop] = useDrop({
    accept: NativeTypes.FILE,
    drop(items) {
      const { files } = items;
      let newState = monkeyPatchReducer(state, queueFilesForUpload, files);
      newState = monkeyPatchReducer(newState, startUpload);
      replaceState(dispatch)(newState);
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    })
  });
  const selectedFilesCapture = e => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    let newState = monkeyPatchReducer(state, queueFilesForUpload, filesArray);
    newState = monkeyPatchReducer(newState, startUpload);
    replaceState(dispatch)(newState);
  };

  return (
    <FileUploadContext.Provider value={{ dispatch: dispatch, state: state }}>
      <Card classes={{ root: classes.card }}>
        <CardHeader
          title="File Upload Control"
          classes={{ root: classes.cardHeader }}
        />
        <CardContent ref={drop} className={classes.cardContent}>
          {state.files.length ? (
            <FileList files={state.files} />
          ) : (
            <DragDropPlaceholder />
          )}
        </CardContent>
        <CardActions>
          <input
            type="file"
            multiple
            style={{ display: "none" }}
            ref={fileDialogRef}
            onChange={selectedFilesCapture}
          />
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => fileDialogRef.current.click()}
          >
            Upload File
          </Button>
        </CardActions>
      </Card>
    </FileUploadContext.Provider>
  );
};

export default FileUploadController;
