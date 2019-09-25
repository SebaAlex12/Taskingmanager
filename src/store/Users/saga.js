import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_LOGGED_USER,
  FETCH_LOGGED_USER_SUCCESS,
  USER_ERROR
} from "./types";

function* fetchLoggedUserAsync() {
  try {
    const res = yield call(
      [axios, axios.get],
      "https://my-json-server.typicode.com/SebaAlex12/Tasks/db"
    );
    const loggedUserData = res.data.users.filter(user => user.logged === true);
    // console.log(loggedUserData[0]); // toDo better
    yield put({ type: FETCH_LOGGED_USER_SUCCESS, payload: loggedUserData[0] });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* fetchLoggedUserWatcher() {
  yield takeEvery(FETCHING_LOGGED_USER, fetchLoggedUserAsync);
}
