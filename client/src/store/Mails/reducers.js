import { SEND_MAIL_SUCCESS, MAIL_ERRORS } from "./types";

const initialState = {
  mails: [],
  errors: []
};

export const mailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MAIL_SUCCESS:
      return {
        ...state,
        mails: [...state.mails, action.payload]
      };
    case MAIL_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
