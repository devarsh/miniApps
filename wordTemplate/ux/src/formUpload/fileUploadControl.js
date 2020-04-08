//pending task
//1. Queuing of the uploads scheduler with pause all and resume all
//2. Deriving mime types using magic numbers
//3. reject upload of file types with particular mime-types

import React from "react";
import Card from "@material-ui/core/card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";
import produce from "immer";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import DragDropPlaceholder from "./dragDropPlaceholder";
import { FileList } from "./filesList";
import {
  immutableReducer,
  initialState,
  queueFilesForUpload,
  queueUpload,
  monkeyPatchReducer,
} from "./redux";
import { FileUploadContext } from "./context";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
  },
  card: {
    minWidth: "450px",
    boxShadow: theme.shadows[2],
  },
  cardContent: {
    height: "350px",
  },
  listContainer: {
    height: "250px",
    overflow: "scroll",
  },
}));

const useImmerReducer = (reducer, initialState, initialAction) => {
  const cachedReducer = React.useCallback(produce(reducer), [reducer]);
  return React.useReducer(cachedReducer, initialState, initialAction);
};

const FileUploadController = () => {
  const classes = useStyles();
  const fileDialogRef = React.useRef();
  const [state, dispatch] = useImmerReducer(immutableReducer, initialState);
  const dispatchActionsToQueueFiles = (files) => {
    monkeyPatchReducer(queueFilesForUpload(files), queueUpload)(
      dispatch,
      state
    );
  };
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: NativeTypes.FILE,
    drop(items) {
      const { files } = items;
      dispatchActionsToQueueFiles(files);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });
  const selectedFilesCapture = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    dispatchActionsToQueueFiles(filesArray);
  };
  const uploadFileHandler = () => fileDialogRef.current.click();
  return (
    <FileUploadContext.Provider
      value={{
        dispatch: dispatch,
        state: state,
        endpoint: "http://localhost:8080/files/",
      }}
    >
      <input
        type="file"
        multiple
        style={{ display: "none" }}
        ref={fileDialogRef}
        onChange={selectedFilesCapture}
      />
      <Card classes={{ root: classes.card }}>
        <CardHeader
          title="File Upload Control"
          classes={{ root: classes.cardHeader }}
        />
        <CardContent className={classes.cardContent} ref={drop}>
          <DragDropPlaceholder
            uploadHandler={uploadFileHandler}
            height={"100px"}
            canDrop={canDrop}
            isOver={isOver}
          />
          <div className={classes.listContainer}>
            <FileList files={state.files} />
          </div>
        </CardContent>
      </Card>
    </FileUploadContext.Provider>
  );
};

export default FileUploadController;
