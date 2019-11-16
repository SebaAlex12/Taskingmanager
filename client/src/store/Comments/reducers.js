import {
  FETCH_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  COMMENTS_ERROR
} from "./types";

const initialState = {
  comments: [],
  errors: []
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    case COMMENTS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
