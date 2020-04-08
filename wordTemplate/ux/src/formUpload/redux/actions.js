import {
  QUEUE_FILES,
  START_UPLOAD,
  COMPLETE_UPLOAD,
  PAUSE_UPLOAD,
  DELETE_FILE,
  REPLACE_STATE,
  SET_ERROR,
} from "./consts";
import shortId from "shortid";
import produce from "immer";
import { immutableReducer } from "./state";

//utils

export const monkeyPatchReducer = (...fns) => (dispatchx, initialState) => {
  let payload = [];
  const patchDispatch = (value) => {
    payload.push(value);
  };
  let parentState = initialState;
  for (let i = 0; i < fns.length; i++) {
    if (typeof fns[i] === "function") {
      fns[i](patchDispatch, parentState);
      for (let j = 0; j < payload.length; j++) {
        parentState = produce(parentState, (draft) => {
          immutableReducer(draft, payload[j]);
        });
      }
    }
    payload = [];
  }
  replaceState(dispatchx, parentState);
};

const createFilesObject = (files = []) => {
  const newFilesObject = files.map((file) => ({
    id: shortId.generate(),
    fd: file,
    uploaded: false,
    uploading: false,
    uploadInterrupted: false,
    error: "",
    rejected: false,
  }));
  return newFilesObject;
};

const getPendingFiles = (files) => {
  let currentUploadingFilesCount = 0;
  let pendingFiles = [];
  for (let file of files) {
    if (
      file.rejected === false &&
      file.uploaded === false &&
      file.uploadInterrupted === false
    ) {
      if (file.uploading === true) {
        currentUploadingFilesCount++;
      } else {
        pendingFiles.push(file.id);
      }
    }
  }
  return [currentUploadingFilesCount, pendingFiles];
};

//actions

let maxUploadCount = 5;

export const queueFilesForUpload = (files) => (dispatch) => {
  if (Array.isArray(files)) {
    const filesObj = createFilesObject(files);
    dispatch({ type: QUEUE_FILES, payload: { files: filesObj } });
  }
};

export const queueUpload = (dispatch, state) => {
  const { files } = state;
  let [currentUploadingFilesCount, pendingFiles] = getPendingFiles(files);
  if (currentUploadingFilesCount < maxUploadCount) {
    const diff = maxUploadCount - currentUploadingFilesCount;
    pendingFiles.splice(diff);
    dispatch({ type: START_UPLOAD, payload: { fileIDs: pendingFiles } });
  }
};

export const startUpload = (fileID) => (dispatch, state) => {
  const { files } = state;
  let currentUploadingFileCount = 0;
  let fileToPauseID;
  let isFileIDRunning = false;
  for (let file of files) {
    if (
      file.rejected === false &&
      file.uploaded === false &&
      file.uploading === true
    ) {
      currentUploadingFileCount++;
      fileToPauseID = file.id;
      if (file.id === fileID) {
        isFileIDRunning = true;
        break;
      }
    }
  }
  if (!isFileIDRunning) {
    if (currentUploadingFileCount >= maxUploadCount) {
      pauseUpload(fileToPauseID, false)(dispatch);
    }
    dispatch({ type: START_UPLOAD, payload: { fileIDs: [fileID] } });
  }
};

export const completeUpload = (fileID) => (dispatch) => {
  dispatch({ type: COMPLETE_UPLOAD, payload: { fileID: fileID } });
};

export const pauseUpload = (fileID, byUser = false) => (dispatch) => {
  dispatch({ type: PAUSE_UPLOAD, payload: { fileID: fileID, byUser: byUser } });
};

export const deleteUpload = (fileID) => (dispatch) => {
  dispatch({ type: DELETE_FILE, payload: { fileID: fileID } });
};

export const setUploadError = (fileID, error) => (dispatch) => {
  dispatch({ type: SET_ERROR, payload: { fileID: fileID, error: error } });
};

const replaceState = (dispatch, newState) => {
  console.log(REPLACE_STATE);
  dispatch({ type: REPLACE_STATE, payload: { newState: newState } });
};
