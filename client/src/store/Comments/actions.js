import { ADDING_COMMENT, FETCHING_COMMENTS } from "./types";

export const fetchComments = data => ({
  type: FETCHING_COMMENTS,
  data
});

export const addComment = data => ({
  type: ADDING_COMMENT,
  data
});
