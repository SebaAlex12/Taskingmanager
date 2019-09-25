import { FETCH_LOGGED_USER_SUCCESS, USER_ERROR } from "./types";

const initialState = {
  users: [],
  logged_user: null,
  errors: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGGED_USER_SUCCESS:
      return {
        ...state,
        logged_user: action.payload
      };
    case USER_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
