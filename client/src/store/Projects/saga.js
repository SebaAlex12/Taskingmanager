import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  ADDING_PROJECT,
  ADD_PROJECT_SUCCESS,
  REMOVING_PROJECT,
  REMOVE_PROJECT_SUCCESS,
  UPDATING_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  PROJECTS_ERROR
} from "./types";

function* fetchProjectsAsync() {
  try {
    const graph = {
      query: `
        query {
          fetchProjects{
            _id
            name
            description
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
      type: FETCH_PROJECTS_SUCCESS,
      payload: res.data.data.fetchProjects
    });
  } catch (error) {
    yield put({ type: PROJECTS_ERROR, payload: error });
  }
}

export function* fetchProjectsWatcher() {
  yield takeEvery(FETCHING_PROJECTS, fetchProjectsAsync);
}

function* addProjectAsync(action) {
  try {
    const data = action.data;
    const projectInput = {
      name: data.name,
      description: data.description
    };

    const graph = {
      query: `mutation {
      addProject(projectInput: {
      name: "${projectInput.name}",
      description: "${projectInput.description}"}){
        _id
        name
        description
      }
    }`
    };

    const projectData = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: ADD_PROJECT_SUCCESS,
      payload: projectData.data.data.addProject
    });
  } catch (error) {
    yield put({ type: PROJECTS_ERROR, payload: error });
  }
}

export function* addProjectWatcher() {
  yield takeEvery(ADDING_PROJECT, addProjectAsync);
}

function* updateProjectAsync(action) {
  try {
    const data = action.data;

    const projectInput = {
      _id: data._id,
      name: data.name ? data.name : "",
      description: data.description ? data.description : ""
    };

    const graph = {
      query: `mutation {
      updateProject(projectInput: {
      _id: "${projectInput._id}",  
      name: "${projectInput.name}",
      description: "${projectInput.description}"}){
        _id
        name
        description
      }
    }`
    };
    // console.log(graph);
    const projectData = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: UPDATE_PROJECT_SUCCESS,
      payload: projectData.data.data.updateProject
    });
  } catch (error) {
    yield put({ type: PROJECTS_ERROR, payload: error });
  }
}

export function* updateProjectWatcher() {
  yield takeEvery(UPDATING_PROJECT, updateProjectAsync);
}

function* removeProjectAsync(action) {
  try {
    yield put({ type: REMOVE_PROJECT_SUCCESS, payload: action.projectId });
  } catch (error) {
    yield put({ type: PROJECTS_ERROR, payload: error });
  }
}

export function* removeProjectWatcher() {
  yield takeEvery(REMOVING_PROJECT, removeProjectAsync);
}
