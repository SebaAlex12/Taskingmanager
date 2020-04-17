import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_USERS_HISTORY,
  FETCH_USERS_HISTORY_SUCCESS,
  ADDING_USER_HISTORY,
  ADD_USER_HISTORY_SUCCESS,
  USERS_HISTORY_ERROR,
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchUsersHistoryAsync(action) {
  const dataInput = {
    userId: action.data && action.data.userId ? action.data.userId : "",
  };

  try {
    const graph = {
      query: `
        query {
          fetchUsersHistory(userId:"${dataInput.userId}"){
            _id
            userId
            userName
            event
            createdAt
            errors{
              path
              message
            }
          }
        }
    `,
    };
    const result = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_USERS_HISTORY_SUCCESS,
      payload: result.data.data.fetchUsersHistory,
    });
  } catch (error) {
    yield put({ type: USERS_HISTORY_ERROR, payload: error });
  }
}

export function* fetchUsersHistoryWatcher() {
  yield takeEvery(FETCHING_USERS_HISTORY, fetchUsersHistoryAsync);
}

function* addUserHistoryAsync(action) {
  const data = action.data;
  const dataInput = {
    userId: data.userId,
    userName: data.userName,
    event: data.event,
    createdAt: data.createdAt,
  };

  const graph = {
    query: `mutation {
      addUserHistory(dataInput: {
      userId: "${dataInput.userId}",
      userName: "${dataInput.userName}",
      event: "${dataInput.event}",
      createdAt: "${dataInput.createdAt}"}){
        _id
        userId
        userName
        event
        createdAt
        errors{
          path
          message
        }
      }
    }`,
  };

  const result = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = result.data.data.storedUserHistory;

  if (response.errors) {
    yield put({ type: USERS_HISTORY_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: ADD_USER_HISTORY_SUCCESS,
      payload: response,
    });
    // yield put({
    //   type: UPDATE_MESSAGES_SUCCESS,
    //   payload: { success: [{ message: "Projekt został dodany" }] },
    // });
  }
}

export function* addUserHistoryWatcher() {
  yield takeEvery(ADDING_USER_HISTORY, addUserHistoryAsync);
}
