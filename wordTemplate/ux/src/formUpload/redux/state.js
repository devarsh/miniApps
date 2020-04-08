import {
  QUEUE_FILES,
  START_UPLOAD,
  PAUSE_UPLOAD,
  COMPLETE_UPLOAD,
  DELETE_FILE,
  REPLACE_STATE,
  SET_ERROR,
} from "./consts";

export const initialState = {
  files: [],
};

export const immutableReducer = (draft, { type, payload }) => {
  switch (type) {
    case QUEUE_FILES: {
      const { files } = payload;
      for (let file of files) {
        draft.files.push(file);
      }
      return;
    }
    case START_UPLOAD: {
      const { fileIDs } = payload;
      for (let file of draft.files) {
        if (fileIDs.indexOf(file.id) >= 0) {
          file.uploading = true;
          file.uploadInterrupted = false;
          file.error = "";
        }
      }
      return;
    }
    case COMPLETE_UPLOAD: {
      const { fileID } = payload;
      for (let file of draft.files) {
        if (file.id === fileID) {
          file.uploading = false;
          file.uploadInterrupted = false;
          file.uploaded = true;
          file.error = "";
          return;
        }
      }
      return;
    }
    case PAUSE_UPLOAD: {
      const { fileID, byUser } = payload;
      for (let file of draft.files) {
        if (file.id === fileID) {
          if (file.uploaded === false) {
            file.uploading = false;
            file.uploadInterrupted = byUser;
          }
          return;
        }
      }
      return;
    }
    case DELETE_FILE: {
      const { fileID } = payload;
      let index = -1;
      for (let i = 0; i < draft.files.length; i++) {
        if (draft.files[i].id === fileID) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        draft.files.splice(index, 1);
      }
      return;
    }
    case SET_ERROR: {
      const { fileID, error } = payload;
      for (let file of draft.files) {
        if (file.id === fileID) {
          file.error = error;
          return;
        }
      }
      return;
    }
    case REPLACE_STATE: {
      const { newState } = payload;
      return newState;
    }
    default: {
      return;
    }
  }
};
