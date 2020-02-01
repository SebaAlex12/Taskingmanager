import {
  FETCH_MESSENGERS_BY_NAME_SUCCESS,
  ADD_MESSEGNER_SUCCESS,
  UPDATE_MESSENGER_SUCCESS,
  MESSENGERS_ERROR
} from "./types";

const initialState = {
  messengers: [],
  errors: []
};

export const messengersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSENGERS_BY_NAME_SUCCESS:
      return {
        ...state,
        messengers: action.payload
      };
    case ADD_MESSEGNER_SUCCESS:
      return {
        ...state
      };
    case UPDATE_MESSENGER_SUCCESS:
      return {
        ...state,
        messengers: [...state.messengers, action.payload]
      };
    case MESSENGERS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
