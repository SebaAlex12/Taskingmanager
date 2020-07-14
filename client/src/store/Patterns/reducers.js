import {
  FETCH_PATTERNS_SUCCESS,
  ADD_PATTERN_SUCCESS,
  REMOVE_PATTERN_SUCCESS,
  UPDATE_PATTERN_SUCCESS,
  PATTERNS_ERROR,
} from "./types";

const initialState = {
  patterns: [],
  errors: [],
};

export const patternsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PATTERNS_SUCCESS:
      return {
        ...state,
        patterns: action.payload,
      };
    case ADD_PATTERN_SUCCESS:
      return {
        ...state,
        patterns: [...state.patterns, action.payload],
      };
    case REMOVE_PATTERN_SUCCESS:
      return {
        ...state,
        patterns: state.patterns.filter(
          (pattern) => pattern._id !== action.payload._id
        ),
      };
    case UPDATE_PATTERN_SUCCESS:
      return {
        ...state,
        patterns: state.patterns.map((pattern) => {
          return pattern._id === action.payload._id ? action.payload : pattern;
        }),
      };
    case PATTERNS_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
