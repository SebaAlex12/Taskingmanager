import { put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_MESSENGERS,
  FETCH_MESSENGERS_SUCCESS,
  UPDATING_MESSENGER,
  UPDATE_MESSENGER_SUCCESS,
  MESSENGERS_ERROR
} from "./types";

function* fetchMessengersAsync() {
  try {
    const res = {};
    yield put({
      type: FETCH_MESSENGERS_SUCCESS,
      payload: res.data.data.fetchMessengers
    });
  } catch (error) {
    yield put({ type: MESSENGERS_ERROR, payload: error });
  }
}

export function* fetchMessengersWatcher() {
  yield takeEvery(FETCHING_MESSENGERS, fetchMessengersAsync);
}

function* updateMessengerAsync(action) {
  // console.log(action.data);
  try {
    yield put({ type: UPDATE_MESSENGER_SUCCESS, payload: action.data });
  } catch (error) {
    yield put({ type: MESSENGERS_ERROR, payload: error });
  }
}

export function* updateMessengerWatcher() {
  yield takeEvery(UPDATING_MESSENGER, updateMessengerAsync);
}
