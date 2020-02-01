import {
  FETCH_FILES_SUCCESS
  // ADD_FILE_SUCCESS,
  // REMOVE_FILE_SUCCESS,
  // FILES_ERROR
} from "./types";

const initialState = {
  files: []
};

export const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILES_SUCCESS:
      return {
        ...state,
        files: action.payload
      };
    default:
      return state;
  }
};
