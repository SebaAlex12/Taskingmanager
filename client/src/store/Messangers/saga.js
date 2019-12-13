import { put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_MESSANGERS,
  FETCH_MESSANGERS_SUCCESS,
  UPDATING_MESSANGER,
  UPDATE_MESSANGER_SUCCESS,
  MESSANGERS_ERROR
} from "./types";

function* fetchMessangersAsync() {
  try {
    const res = {};
    yield put({
      type: FETCH_MESSANGERS_SUCCESS,
      payload: res.data.data.fetchMessangers
    });
  } catch (error) {
    yield put({ type: MESSANGERS_ERROR, payload: error });
  }
}

export function* fetchMessangersWatcher() {
  yield takeEvery(FETCHING_MESSANGERS, fetchMessangersAsync);
}

function* updateMessangerAsync(action) {
  // console.log(action.data);
  try {
    yield put({ type: UPDATE_MESSANGER_SUCCESS, payload: action.data });
  } catch (error) {
    yield put({ type: MESSANGERS_ERROR, payload: error });
  }
}

export function* updateMessangerWatcher() {
  yield takeEvery(UPDATING_MESSANGER, updateMessangerAsync);
}
