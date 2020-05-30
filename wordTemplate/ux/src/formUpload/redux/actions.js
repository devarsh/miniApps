import produce from "immer";
import { getMimeType, isMimeTypeValid, isFileSizeAllowed } from "../utils";
import shortId from "shortid";
import {
  QUEUE_FILES,
  START_UPLOAD,
  COMPLETE_UPLOAD,
  PAUSE_UPLOAD,
  DELETE_FILE,
  REPLACE_STATE,
  SET_ERROR,
  SET_FILE_TAGS,
  SET_FILE_TAGS_ERROR,
  SET_FILE_TAGS_TOUCHED,
} from "./consts";
import { immutableReducer } from "./state";

export const monkeyPatchReducer = (...fns) => (dispatchx, initialState) => {
  let payload = [];
  const patchDispatch = (value) => {
    payload.push(value);
  };
  /*eslint-disable no-loop-func*/
  let parentState = initialState;
  for (let i = 0; i < fns.length; i++) {
    if (typeof fns[i] === "function") {
      fns[i](patchDispatch, parentState);
      for (let j = 0; j < payload.length; j++) {
        console.group(payload[j].type);
        console.log(payload[j]);
        console.log(parentState);
        parentState = produce(parentState, (draft) => {
          immutableReducer(draft, payload[j]);
        });
        console.log(parentState);
        console.groupEnd();
      }
    }
    payload = [];
  }
  replaceState(dispatchx, parentState);
};

export const transformFileObjAndValidate = async (
  files,
  whiteListExtensions,
  maxAllowedSizeInBytes
) => {
  if (Array.isArray(files)) {
    const filesObjArray = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let mime = await getMimeType(file);
      let result = isMimeTypeValid(mime, whiteListExtensions);
      if (result.isRejected === false) {
        result = isFileSizeAllowed(maxAllowedSizeInBytes, file.size);
      }
      filesObjArray.push(constructNewFileObject(file, result));
    }
    return filesObjArray;
  }
  return null;
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

const constructNewFileObject = (file, result) => ({
  id: shortId.generate(),
  fd: file,
  uploadedInititated: false,
  uploaded: false,
  uploading: false,
  uploadInterrupted: false,
  rejected: result?.isRejected,
  error: result?.isRejected ? result?.rejectReason : "",
  tags: [],
  tagsTouched: false,
  tagsError: "",
});

//actions

export const isCompleted = () => {};

export const queueFilesForUpload = (files) => (dispatch) => {
  dispatch({ type: QUEUE_FILES, payload: { files: files } });
};

export const queueUpload = (maxUploadCount) => (dispatch, state) => {
  const { files } = state;
  let [currentUploadingFilesCount, pendingFiles] = getPendingFiles(files);
  if (currentUploadingFilesCount < maxUploadCount) {
    const diff = maxUploadCount - currentUploadingFilesCount;
    pendingFiles.splice(diff);
    dispatch({ type: START_UPLOAD, payload: { fileIDs: pendingFiles } });
  }
};

export const startUpload = (fileID, maxUploadCount) => (dispatch, state) => {
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
      pauseUpload(fileToPauseID)(dispatch);
    }
    dispatch({ type: START_UPLOAD, payload: { fileIDs: [fileID] } });
  }
};

export const completeUpload = (fileID) => (dispatch) => {
  dispatch({ type: COMPLETE_UPLOAD, payload: { fileID: fileID } });
};

export const pauseUpload = (fileID) => (dispatch) => {
  dispatch({ type: PAUSE_UPLOAD, payload: { fileID: fileID } });
};

export const deleteUpload = (fileID) => (dispatch) => {
  dispatch({ type: DELETE_FILE, payload: { fileID: fileID } });
};

export const setUploadError = (fileID, error) => (dispatch) => {
  dispatch({ type: SET_ERROR, payload: { fileID: fileID, error: error } });
};

export const setTags = (fileID) => (tags) => (dispatch) => {
  dispatch({ type: SET_FILE_TAGS, payload: { fileID: fileID, tags: tags } });
};

export const setTagsTouched = (fileID) => (touched) => (dispatch) => {
  dispatch({
    type: SET_FILE_TAGS_TOUCHED,
    payload: { fileID: fileID, touched: touched },
  });
};

export const setTagsError = (fileID) => (error) => (dispatch) => {
  dispatch({
    type: SET_FILE_TAGS_ERROR,
    payload: { fileID: fileID, error: error },
  });
};

const replaceState = (dispatch, newState) => {
  dispatch({ type: REPLACE_STATE, payload: { newState: newState } });
};
