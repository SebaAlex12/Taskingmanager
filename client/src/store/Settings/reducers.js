import {
  FETCH_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_SUCCESS,
  SETTINGS_ERROR
} from "./types";

const initialState = {
  settings: [],
  errors: []
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.payload
      };
    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.payload
      };
    case SETTINGS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
