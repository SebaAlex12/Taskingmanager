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

import { UPDATE_MESSAGE, UPDATE_ALERT_MESSAGE } from "../Messages/types";
// import { UPDATE_ALERT_MESSAGES_SUCCESS } from "../Messages/types";
import { apiUrl } from '../../store/ini';

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
            errors{
              path
              message
            }
          }
        }
      `,
    };

    // const response = yield call(
    //   [axios, axios.post],
    //   apiUrl + "/graphql",
    //   JSON.stringify(graph),
    //   { headers: { "Content-Type": "application/json" } }
    // );

    const response = yield call(
      [axios, axios.post],apiUrl+"graphql/",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } }
    );

    if(response){
      const { token, errors } = response.data.data.loginUser;
        if(errors){
          yield put({ type: USER_ERROR, payload: errors });
          // yield put({ type: UPDATE_ALERT_MESSAGES_SUCCESS, payload:errors });
        }else{
          localStorage.setItem(
            "jwtTokenAuthorization",
            token
          );
          yield put({
            type: FETCH_LOGGED_USER_SUCCESS,
            payload: response.data.data.loginUser,
          });
          // yield put({
          //   type: UPDATE_MESSAGES_SUCCESS,
          //   payload: [{ message: "Użytkownik został zalogowany" }],
          // });
          
        }
    }
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* loginUserWatcher() {
  yield takeEvery(LOGGING_USER, loginUserAsync);
}

function* registerUserAsync(action) {
  try {
  const presentDate = moment(new Date(), "YYYY-MM-DD HH:mm:ss").format();
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

  // const res = yield call(
  //   [axios, axios.post],
  //   apiUrl + "/graphql",
  //   JSON.stringify(graph),
  //   { headers: { "Content-Type": "application/json" } }
  // );

  const res = yield call(
    [axios, axios.post],apiUrl+"graphql/",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } }
  );

  if(res){
    const response = res.data.data.createUser;
    const { errors } = res.data.data.createUser;
      if(errors){
          yield put({ type: USER_ERROR, payload: errors });
          // yield put({ type: UPDATE_ALERT_MESSAGES_SUCCESS, payload:errors });
      }else{
          yield put({
            type: REGISTER_USER_SUCCESS,
            payload: response,
          });
          // yield put({
          //   type: UPDATE_MESSAGES_SUCCESS,
          //   payload: [{ message: "Użytkownik został dodany" }],
          // });
      }
    }
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
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
            errors{
              path
              message
            }
          }
        }
    `,
    };

    // console.log('api address',apiUrl + "/graphql");

    const res = yield call(
      [axios, axios.post],apiUrl+"graphql/",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } }
    );

    // const res = yield axios.post(apiUrl + "/graphql",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } });

    // const res = yield axios.post('http://crm.pozycjonowaniestron.hekko24.pl/api/graphql/',JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } });

    if(res){
      const response = res.data.data.fetchUsers;
      const { errors } = res.data.data.fetchUsers;
        if(errors){
            yield put({ type: USER_ERROR, payload: errors });
            // yield put({ type: UPDATE_ALERT_MESSAGES_SUCCESS, payload:errors });
        }else{
            yield put({ type: FETCH_USERS_SUCCESS, payload: response });
        }
    }
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
            errors{
              path
              message
            }
          }
        }
    `,
    };
    // const res = yield call(
    //   [axios, axios.post],
    //   apiUrl + "/graphql",
    //   JSON.stringify(graph),
    //   { headers: { "Content-Type": "application/json" } }
    // );

    const res = yield call(
      [axios, axios.post],apiUrl+"graphql/",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } }
    );

    if(res){
      const { errors } = res.data.data.fetchUsersByLoggedUserProjects;
      const response = res.data.data.fetchUsersByLoggedUserProjects;
        if(errors){
          yield put({ type: USER_ERROR, payload: errors });
          // yield put({ type: UPDATE_ALERT_MESSAGES_SUCCESS, payload:errors });
        }else{
          yield put({
            type: FETCH_USERS_SUCCESS,
            payload: response,
          });
        }
      }
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
  try {
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
      generateToken: data.generateToken ? data.generateToken : false
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
        lastActive: "${userInput.lastActive}",
        generateToken: "${userInput.generateToken}"}){
          _id
          name
          email
          status
          company
          projects
          users
          lastActive
          generateToken
          errors{
            path
            message
          }
        }
      }`,
    };

    // console.log('graph',graph);
    // const res = yield call(
    //   [axios, axios.post],
    //   apiUrl + "/graphql",
    //   JSON.stringify(graph),
    //   { headers: { "Content-Type": "application/json" } }
    // );

    const res = yield call(
      [axios, axios.post],apiUrl+"graphql/",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } }
    );

    if(res){
      const { errors } = res.data.data.updateUser;
      const response = res.data.data.updateUser;
        if(errors){
          yield put({ type: USER_ERROR, payload: errors });
          yield put({
            type: UPDATE_ALERT_MESSAGE,
            payload: response.errors[0].message,
          });
        }else{
          console.log('response',response);
          if(response.token){
              localStorage.setItem(
                "jwtTokenAuthorization",
                response.token
              );
          }

          yield put({ type: UPDATE_USER_SUCCESS, payload: response });
          yield put({
            type: UPDATE_MESSAGE,
            payload: "Dane żytkownika zostały zmodifikowane",
          });
        }
      }
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* updateUserWatcher() {
  yield takeEvery(UPDATING_USER, updateUserAsync);
}

function* logoutUserAsync() {
  try {
    localStorage.removeItem("jwtTokenAuthorization");
    yield put({ type: LOGGED_OUT_SUCCESS, payload: [] });
    // yield put({
    //   type: UPDATE_MESSAGES_SUCCESS,
    //   payload: { success: [{ message: "Użytkownik został wylogowany" }] },
    // });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

export function* logoutUserWatcher() {
  yield takeEvery(LOGGING_OUT_USER, logoutUserAsync);
}
