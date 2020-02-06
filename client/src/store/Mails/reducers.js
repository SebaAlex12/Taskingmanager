import { SEND_MAIL_SUCCESS, FETCH_MAILS_SUCCESS, MAILS_ERRORS } from "./types";

const initialState = {
  mails: [],
  errors: []
};

export const mailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAILS_SUCCESS:
      return {
        ...state,
        mails: action.payload
      };
    case SEND_MAIL_SUCCESS:
      return {
        ...state,
        mails: [...state.mails, action.payload]
      };
    case MAILS_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
