import {
  FETCH_USERS_HISTORY_SUCCESS,
  ADD_USER_HISTORY_SUCCESS,
  USERS_HISTORY_ERROR,
} from "./types";

const initialState = {
  usersHistory: [],
  errors: [],
};

export const usersHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_HISTORY_SUCCESS:
      return {
        ...state,
        usersHistory: action.payload,
      };
    case ADD_USER_HISTORY_SUCCESS:
      return {
        ...state,
        usersHistory: [...state.usersHistory, action.payload],
      };
    case USERS_HISTORY_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
