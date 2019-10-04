import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  LOGGING_USER,
  REGISTERING_USER,
  REGISTER_USER_SUCCESS,
  FETCHING_LOGGED_USER,
  FETCH_LOGGED_USER_SUCCESS,
  LOGGING_OUT_USER,
  LOGGED_OUT_SUCCESS,
  USER_ERROR
} from "./types";

function* loginUserAsync(action: any) {
  try {
    const graph = {
      query: `query {
          loginUser(email:"${action.data.email}",password:"${action.data.password}"){
            _id
            name
            email
            createdAt
            token
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

    localStorage.setItem(
      "jwtTokenAuthorization",
      res.data.data.loginUser.token
    );

    yield put({
      type: FETCH_LOGGED_USER_SUCCESS,
      payload: res.data.data.loginUser
    });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* loginUserWatcher() {
  yield takeEvery(LOGGING_USER, loginUserAsync);
}

function* registerUserAsync(action: any) {
  try {
    const presentDate = new Date();

    const graph = {
      query: `mutation {
      createUser(userInput: {name: "${action.data.name}", email: "${
        action.data.email
      }", password: "${
        action.data.password
      }", createdAt: "${presentDate.toISOString()}"}){
        _id
        name
        email
        password
        createdAt
      }
    }`
    };

    const res = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );

    yield put({ type: REGISTER_USER_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* registerUserWatcher() {
  yield takeEvery(REGISTERING_USER, registerUserAsync);
}

function* fetchLoggedUserAsync(action: any) {
  try {
    yield put({ type: FETCH_LOGGED_USER_SUCCESS, payload: action.data });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* fetchLoggedUserWatcher() {
  yield takeEvery(FETCHING_LOGGED_USER, fetchLoggedUserAsync);
}

function* logoutUserAsync() {
  try {
    localStorage.removeItem("jwtTokenAuthorization");
    yield put({ type: LOGGED_OUT_SUCCESS, payload: [] });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* logoutUserWatcher() {
  yield takeEvery(LOGGING_OUT_USER, logoutUserAsync);
}
