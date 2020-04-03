import {
  QUEUE_FILES,
  START_UPLOAD,
  COMPLETE_UPLOAD,
  PAUSE_UPLOAD,
  DELETE_FILE,
  REPLACE_STATE
} from "./consts";
import shortId from "shortid";
import produce from "immer";
import { immutableReducer } from "./state";

//utils

export const monkeyPatchReducer = (initialState, fn, ...args) => {
  let payload;
  const dispatch = value => {
    payload = value;
  };
  const res = fn(dispatch, initialState);
  res(...args);
  const nextState = produce(initialState, draft => {
    immutableReducer(draft, payload);
  });
  return nextState;
};

const computeSize = sizeInBytes => {
  if (Number.isInteger(sizeInBytes)) {
    let sOutput = `${sizeInBytes} bytes`;
    const aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    for (
      let nMultiple = 0, nApprox = sizeInBytes / 1024;
      nApprox > 1;
      nApprox = nApprox / 1024, nMultiple++
    ) {
      sOutput = `${nApprox.toFixed(2)} ${aMultiples[nMultiple]}`;
    }
    return sOutput;
  } else {
    return "cannot compute size";
  }
};

const createFilesObject = (files = []) => {
  const newFilesObject = files.map(file => ({
    id: shortId.generate(),
    fd: file,
    size: computeSize(file.size),
    uploaded: false,
    uploading: false,
    uploadInterrupted: false
  }));
  return newFilesObject;
};

const getPendingFiles = files => {
  let currentUploadingFilesCount = 0;
  let pendingFiles = [];
  for (let file of files) {
    if (file.uploaded === false && file.uploadInterrupted === false) {
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

export const queueFilesForUpload = dispatch => files => {
  if (Array.isArray(files)) {
    const filesObj = createFilesObject(files);
    dispatch({ type: QUEUE_FILES, payload: { files: filesObj } });
  }
};

export const startUpload = (dispatch, state) => () => {
  const { files } = state;
  let [currentUploadingFilesCount, pendingFiles] = getPendingFiles(files);
  if (currentUploadingFilesCount < maxUploadCount) {
    const diff = maxUploadCount - currentUploadingFilesCount;
    pendingFiles.splice(diff);
    dispatch({ type: START_UPLOAD, payload: { fileIDs: pendingFiles } });
  }
};

export const completeUpload = dispatch => fileID => {
  dispatch({ type: COMPLETE_UPLOAD, payload: { fileID: fileID } });
};

export const pauseUpload = dispatch => (fileID, byUser = false) => {
  dispatch({ type: PAUSE_UPLOAD, payload: { fileID: fileID, byUser: byUser } });
};

export const resumeUpload = (dispatch, state) => fileID => {
  const { files } = state;
  let currentUploadingFileCount = 0;
  let fileToPauseID;
  for (let file of files) {
    if (file.uploaded === false && file.uploading === true) {
      currentUploadingFileCount++;
      fileToPauseID = file.id;
    }
  }
  if (currentUploadingFileCount >= maxUploadCount) {
    //pauseUpload(dispatch, fileToPauseID, false); //need to change this
  }
  dispatch({ type: START_UPLOAD, payload: { fileIDs: [fileID] } });
};

export const deleteUpload = dispatch => fileID => {
  dispatch({ type: DELETE_FILE, payload: { fileID: fileID } });
};

export const replaceState = dispatch => newState => {
  dispatch({ type: REPLACE_STATE, payload: { newState: newState } });
};
