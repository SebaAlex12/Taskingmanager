import { put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  UPDATING_MESSAGES,
  UPDATE_MESSAGES_SUCCESS,
  UPDATING_ALERT_MESSAGES,
  UPDATE_ALERT_MESSAGES_SUCCESS,
  REMOVING_ALERT_MESSAGES,
  REMOVE_ALERT_MESSAGES_SUCCESS,
  MESSAGES_ERROR
} from "./types";

function* fetchMessagesAsync() {
  try {
    const res = {};
    yield put({
      type: FETCH_MESSAGES_SUCCESS,
      payload: res.data.data.fetchMessages
    });
  } catch (error) {
    yield put({ type: MESSAGES_ERROR, payload: error });
  }
}

export function* fetchMessagesWatcher() {
  yield takeEvery(FETCHING_MESSAGES, fetchMessagesAsync);
}

function* updateMessagesAsync(action) {
  try {
    yield put({ type: UPDATE_MESSAGES_SUCCESS, payload: action.data });
  } catch (error) {
    yield put({ type: MESSAGES_ERROR, payload: error });
  }
}

export function* updateMessagesWatcher() {
  yield takeEvery(UPDATING_MESSAGES, updateMessagesAsync);
}

function* updateAlertMessagesAsync(action) {
  try {
    yield put({ type: UPDATE_ALERT_MESSAGES_SUCCESS, payload: action.data });
  } catch (error) {
    yield put({ type: MESSAGES_ERROR, payload: error });
  }
}

export function* updateAlertMessagesWatcher() {
  yield takeEvery(UPDATING_ALERT_MESSAGES, updateAlertMessagesAsync);
}

function* removeAlertMessagesAsync(action) {
  try {
    yield put({ type: REMOVE_ALERT_MESSAGES_SUCCESS, payload: action.data });
  } catch (error) {
    yield put({ type: MESSAGES_ERROR, payload: error });
  }
}

export function* removeAlertMessagesWatcher() {
  yield takeEvery(REMOVING_ALERT_MESSAGES, removeAlertMessagesAsync);
}
