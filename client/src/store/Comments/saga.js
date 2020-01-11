import axios from "axios";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  ADDING_COMMENT,
  ADD_COMMENT_SUCCESS,
  COMMENTS_ERROR,
  REMOVING_COMMENTS_RELATIVE_TASK,
  REMOVE_COMMENTS_RELATIVE_TASK_SUCCESS
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchCommentsAsync(action) {
  const data = action.data;
  try {
    const graph = {
      query: `
        query {
          fetchComments(commentInput:{taskId: "${data.taskId}"}){
            _id
            taskId
            userId
            createdBy
            description
            createdAt
          }
        }
    `
    };

    const res = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_COMMENTS_SUCCESS,
      payload: res.data.data.fetchComments
    });
  } catch (error) {
    yield put({ type: COMMENTS_ERROR, payload: error });
  }
}

export function* fetchCommentsWatcher() {
  yield takeEvery(FETCHING_COMMENTS, fetchCommentsAsync);
}

function* addCommentAsync(action) {
  // try {
  const data = action.data;
  const commentInput = {
    taskId: data.taskId,
    userId: data.userId,
    createdBy: data.createdBy,
    description: data.description,
    createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
  };
  const graph = {
    query: `mutation {
      addComment(commentInput: {
      taskId: "${commentInput.taskId}",
      userId: "${commentInput.userId}",
      createdBy: "${commentInput.createdBy}",
      description: """${commentInput.description}""",
      createdAt: "${commentInput.createdAt}"}){
        _id
        taskId
        userId
        createdBy
        description
        createdAt
        errors{
          path
          message
        }
      }
    }`
  };
  const commentData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = commentData.data.data.addComment;
  if (response.errors) {
    yield put({ type: COMMENTS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors }
    });
  } else {
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: response
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Komentarz został dodany" }] }
    });
  }
}

export function* addCommentWatcher() {
  yield takeEvery(ADDING_COMMENT, addCommentAsync);
}

function* removeCommentsByTaskIdAsync(action) {
  const taskId = action.data;
  // console.log("saga data", data);
  const graph = {
    query: `mutation {
      removeCommentsByTaskId(taskId: "${taskId}"){
        _id
        errors{
          path
          message
        }
      }
    }`
  };

  const commentData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  console.log("return data graph", commentData);
  const response = commentData.data.data.removeTask;

  if (response.errors) {
    yield put({ type: COMMENTS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors }
    });
  } else {
    yield put({
      type: REMOVE_COMMENTS_RELATIVE_TASK_SUCCESS,
      payload: response
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Komentarze zostały usunięte" }] }
    });
  }
}

export function* removeCommentsByTaskIdWatcher() {
  yield takeEvery(REMOVING_COMMENTS_RELATIVE_TASK, removeCommentsByTaskIdAsync);
}
