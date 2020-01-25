import axios from "axios";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_MESSENGERS_BY_NAME,
  FETCH_MESSENGERS_BY_NAME_SUCCESS,
  ADDING_MESSENGER,
  ADD_MESSEGNER_SUCCESS,
  UPDATING_MESSENGER,
  UPDATE_MESSENGER_SUCCESS,
  MESSENGERS_ERROR
} from "./types";

function* fetchMessengersByNameAsync(action) {
  const data = action.data;

  try {
    const graph = {
      query: `
      query {
        fetchMessengersByName(name:"${data.name}"){
          _id
          from
          to
          msg
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
      type: FETCH_MESSENGERS_BY_NAME_SUCCESS,
      payload: res.data.data.fetchMessengersByName
    });
  } catch (error) {
    yield put({ type: MESSENGERS_ERROR, payload: error });
  }
}

export function* fetchMessengersByNameWatcher() {
  yield takeEvery(FETCHING_MESSENGERS_BY_NAME, fetchMessengersByNameAsync);
}

function* updateMessengerAsync(action) {
  try {
    yield put({ type: UPDATE_MESSENGER_SUCCESS, payload: action.data });
  } catch (error) {
    yield put({ type: MESSENGERS_ERROR, payload: error });
  }
}

export function* updateMessengerWatcher() {
  yield takeEvery(UPDATING_MESSENGER, updateMessengerAsync);
}

function* addMessengerAsync(action) {
  try {
    const data = action.data;
    const messengerInput = {
      from: data.from,
      to: data.to,
      msg: data.msg,
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
    };
    const graph = {
      query: `mutation {
      addMessenger(messengerInput: {
      from: "${messengerInput.from}",
      to: """${messengerInput.to}""",
      msg: """${messengerInput.msg}""",
      createdAt: "${messengerInput.createdAt}"}){
        _id
        from
        to
        msg
        createdAt
      }
    }`
    };
    const messengerData = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    const response = messengerData.data.data.addMessenger;
    if (response.errors) {
      yield put({ type: MESSENGERS_ERROR, payload: response.errors });
    } else {
      yield put({
        type: ADD_MESSEGNER_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({ type: MESSENGERS_ERROR, payload: error });
  }
}

export function* addMessengerWatcher() {
  yield takeEvery(ADDING_MESSENGER, addMessengerAsync);
}
