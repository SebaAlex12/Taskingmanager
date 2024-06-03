import {
  UPDATE_MESSAGES,
  UPDATE_ALERT_MESSAGES,
  CLEAR_MESSAGES
} from "./types";

const initialState = {
  messages: [],
  alert_messages: []
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case UPDATE_ALERT_MESSAGES:
      return {
        ...state,
        alert_messages: action.payload
      };
    case CLEAR_MESSAGES:
      return {
        messages: [],
        alert_messages: []
      };
    default:
      return state;
  }
};
