import {
  ADDING_COMMENT,
  FETCHING_COMMENTS,
  REMOVING_COMMENTS_RELATIVE_TASK
} from "./types";

export const fetchComments = data => ({
  type: FETCHING_COMMENTS,
  data
});

export const addComment = data => ({
  type: ADDING_COMMENT,
  data
});

export const removeCommentsByTaskId = taskId => ({
  type: REMOVING_COMMENTS_RELATIVE_TASK,
  taskId
});
