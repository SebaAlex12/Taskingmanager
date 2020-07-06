import {
  FETCH_CALENDARS_SUCCESS,
  ADD_CALENDAR_SUCCESS,
  UPDATE_CALENDAR_SUCCESS,
  CALENDARS_ERROR,
} from "./types";

const initialState = {
  calendars: [],
  errors: [],
};

export const calendarsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CALENDARS_SUCCESS:
      return {
        ...state,
        calendars: action.payload,
      };
    case ADD_CALENDAR_SUCCESS:
      return {
        ...state,
        calendars: [...state.calendars, action.payload],
      };
    case UPDATE_CALENDAR_SUCCESS:
      return {
        ...state,
        calendars: state.calendars.map((calendar) => {
          return calendar._id === action.payload._id
            ? action.payload
            : calendar;
        }),
      };
    case CALENDARS_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
