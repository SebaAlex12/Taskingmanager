import { UPDATE_MESSAGES_SUCCESS, MESSAGES_ERROR } from "./types";

const initialState = {
  messages: [],
  errors: []
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload
      };
    case MESSAGES_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
