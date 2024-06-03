import {
  UPDATE_MESSAGE,
  UPDATE_ALERT_MESSAGE,
  CLEAR_MESSAGES
} from "./types";

const initialState = {
  message: "",
  alert_message: ""
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE:
      console.log('upd message reducer...',action.payload);
      return {
        ...state,
        message: action.payload,
        alert_message: ""
      };
    case UPDATE_ALERT_MESSAGE:
      return {
        ...state,
        alert_message: action.payload,
        message: ""
      };
    case CLEAR_MESSAGES:
      return {
        message: "",
        alert_message: ""
      };
    default:
      return state;
  }
};
