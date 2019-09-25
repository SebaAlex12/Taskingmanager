import { FETCH_USER_SUCCESS, USER_ERROR } from "./types";

const initialState = {
  users: [],
  errors: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        tasks: action.payload
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
