import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_LOGGED_USER,
  FETCH_LOGGED_USER_SUCCESS,
  USER_ERROR
} from "./types";

function* fetchLoggedUserAsync() {
  console.log("sssss");
  try {
    const res = yield call(
      [axios, axios.get],
      "https://my-json-server.typicode.com/SebaAlex12/Tasks/db"
    );
    console.log(res);
    yield put({ type: FETCH_LOGGED_USER_SUCCESS, payload: res.data.user });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* fetchLoggedUserWatcher() {
  yield takeEvery(FETCHING_LOGGED_USER, fetchLoggedUserAsync);
}
