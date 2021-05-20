import {
  UPDATE_MESSAGES_SUCCESS,
  UPDATE_ALERT_MESSAGES_SUCCESS,
  REMOVE_ALERT_MESSAGES_SUCCESS
} from "./types";

const initialState = {
  messages: [],
  alert_messages: []
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload
      };
    case UPDATE_ALERT_MESSAGES_SUCCESS:
      return {
        ...state,
        alert_messages: action.payload
      };
    case REMOVE_ALERT_MESSAGES_SUCCESS:
      return {
        ...state,
        alert_messages: []
      };
    default:
      return state;
  }
};
