import axios from "axios";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  LOGGING_USER,
  REGISTERING_USER,
  REGISTER_USER_SUCCESS,
  FETCHING_LOGGED_USER,
  FETCH_LOGGED_USER_SUCCESS,
  FETCHING_USERS,
  FETCHING_USERS_BY_LOGGED_USER_PROJECTS,
  FETCH_USERS_SUCCESS,
  LOGGING_OUT_USER,
  LOGGED_OUT_SUCCESS,
  UPDATING_USER,
  UPDATE_USER_SUCCESS,
  USER_ERROR,
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* loginUserAsync(action) {
  try {
    const graph = {
      query: `query {
          loginUser(email:"${action.data.email}",password:"${action.data.password}"){
            _id
            name
            email
            status
            company
            projects
            users
            lastActive
            createdAt
            token
          }
        }
      `,
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
      payload: res.data.data.loginUser,
    });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* loginUserWatcher() {
  yield takeEvery(LOGGING_USER, loginUserAsync);
}

function* registerUserAsync(action) {
  // try {
  const presentDate = moment(new Date(), "YYYY-MM-DD HH:mm:ss").format();
  // console.log("action", action);
  const graph = {
    query: `mutation {
      createUser(userInput: {
        name: "${action.data.name}", 
        email: "${action.data.email}", 
        password: "${action.data.password}", 
        status: "${action.data.status}",
        company: "${action.data.company}",
        projects: "${action.data.projects}",
        users: "${action.data.users}", 
        lastActive: "${presentDate}",
        createdAt: "${presentDate}"}){
        _id
        name
        email
        password
        status
        company
        projects
        users
        lastActive
        createdAt
        errors{
          path
          message
        }
      }
    }`,
  };

  const res = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = res.data.data.createUser;
  if (response.errors) {
    yield put({ type: USER_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: REGISTER_USER_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Użytkownik został dodany" }] },
    });
  }
}

export function* registerUserWatcher() {
  yield takeEvery(REGISTERING_USER, registerUserAsync);
}

function* fetchLoggedUserAsync(action) {
  try {
    yield put({ type: FETCH_LOGGED_USER_SUCCESS, payload: action.data });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* fetchLoggedUserWatcher() {
  yield takeEvery(FETCHING_LOGGED_USER, fetchLoggedUserAsync);
}

function* fetchUsersAsync(action) {
  const data = action.data;
  try {
    const graph = {
      query: `
        query {
          fetchUsers(userInput:{company:"${data.company}"}){
            _id
            name
            email
            status
            company
            projects
            users
            lastActive
            createdAt
          }
        }
    `,
    };
    const res = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({ type: FETCH_USERS_SUCCESS, payload: res.data.data.fetchUsers });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* fetchUsersWatcher() {
  yield takeEvery(FETCHING_USERS, fetchUsersAsync);
}

function* fetchUsersByLoggedUserProjectsAsync(action) {
  const data = action.data;
  try {
    const graph = {
      query: `
        query {
          fetchUsersByLoggedUserProjects(projects:"${data}"){
            _id
            name
            email
            status
            company
            projects
            users
            lastActive
            createdAt
          }
        }
    `,
    };
    const res = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_USERS_SUCCESS,
      payload: res.data.data.fetchUsersByLoggedUserProjects,
    });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* fetchUsersByLoggedUserProjectsWatcher() {
  yield takeEvery(
    FETCHING_USERS_BY_LOGGED_USER_PROJECTS,
    fetchUsersByLoggedUserProjectsAsync
  );
}

function* updateUserAsync(action) {
  // try {
  const data = action.data;

  const userInput = {
    _id: data._id,
    name: data.name ? data.name : "",
    email: data.email ? data.email : "",
    password: data.password ? data.password : "",
    status: data.status ? data.status : "",
    company: data.company ? data.company : "",
    projects: data.projects ? data.projects : "",
    users: data.users ? data.users : "",
    lastActive: data.lastActive ? data.lastActive : "",
  };

  const graph = {
    query: `mutation {
      updateUser(userInput: {
      _id: "${userInput._id}",  
      name: "${userInput.name}",
      email: "${userInput.email}",
      password: "${userInput.password}",
      status: "${userInput.status}",
      company: "${userInput.company}",
      projects: "${userInput.projects}",
      users: "${userInput.users}",
      lastActive: "${userInput.lastActive}"}){
        _id
        name
        email
        status
        company
        projects
        users
        lastActive
        errors{
          path
          message
        }
      }
    }`,
  };
  // console.log(graph);
  const userData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = userData.data.data.updateUser;
  if (response.errors) {
    yield put({ type: USER_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: UPDATE_USER_SUCCESS, payload: response });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Użytkownik został zaktualizowany" }] },
    });
  }
}

export function* updateUserWatcher() {
  yield takeEvery(UPDATING_USER, updateUserAsync);
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
