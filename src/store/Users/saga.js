import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { FETCHING_USER, FETCH_USER_SUCCESS, USER_ERROR } from "./types";

function* fetchUserAsync() {
  try {
    const res = yield call(
      [axios, axios.get],
      "https://my-json-server.typicode.com/SebaAlex12/Tasks/db"
    );
    // console.log(res);
    yield put({ type: FETCH_USER_SUCCESS, payload: res.data.user });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* fetchUserWatcher() {
  yield takeEvery(FETCHING_USER, fetchUserAsync);
}
