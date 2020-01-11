import {
  FETCH_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  COMMENTS_ERROR,
  REMOVE_COMMENTS_RELATIVE_TASK_SUCCESS
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
    case REMOVE_COMMENTS_RELATIVE_TASK_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment._id !== action.payload._id
        )
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
