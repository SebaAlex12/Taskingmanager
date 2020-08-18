import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_PROJECTS,
  FETCHING_PROJECTS_BY_LOGGED_USER_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  ADDING_PROJECT,
  ADD_PROJECT_SUCCESS,
  REMOVING_PROJECT,
  REMOVE_PROJECT_SUCCESS,
  UPDATING_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  PROJECTS_ERROR,
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchProjectsAsync(action) {
  const data = action.data;
  // console.log("saga", data);
  try {
    const graph = {
      query: `
        query {
          fetchProjects(projectInput:{company:"${data.company}"}){
            _id
            name
            company
            description
            cms
            ftp
            panel
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
      type: FETCH_PROJECTS_SUCCESS,
      payload: res.data.data.fetchProjects,
    });
  } catch (error) {
    yield put({ type: PROJECTS_ERROR, payload: error });
  }
}

export function* fetchProjectsWatcher() {
  yield takeEvery(FETCHING_PROJECTS, fetchProjectsAsync);
}

function* fetchProjectsByLoggedUserProjectsAsync(action) {
  const data = action.data;
  try {
    const graph = {
      query: `
        query {
          fetchProjectsByLoggedUserProjects(projects:"${data}"){
            _id
            name
            company
            description
            cms
            ftp
            panel
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
      type: FETCH_PROJECTS_SUCCESS,
      payload: res.data.data.fetchProjectsByLoggedUserProjects,
    });
  } catch (error) {
    yield put({ type: PROJECTS_ERROR, payload: error });
  }
}

export function* fetchProjectsByLoggedUserProjectsWatcher() {
  yield takeEvery(
    FETCHING_PROJECTS_BY_LOGGED_USER_PROJECTS,
    fetchProjectsByLoggedUserProjectsAsync
  );
}

function* addProjectAsync(action) {
  // try {
  const data = action.data;
  const projectInput = {
    name: data.name,
    company: data.company,
    description: data.description,
    cms: data.cms,
    ftp: data.ftp,
    panel: data.panel,
  };

  const graph = {
    query: `mutation {
      addProject(projectInput: {
      name: "${projectInput.name}",
      company: "${projectInput.company}",
      description: """${projectInput.description}""",
      cms: """${projectInput.cms}""",
      ftp: """${projectInput.ftp}""",
      panel: """${projectInput.panel}"""}){
        _id
        name
        company
        description
        cms
        ftp
        panel
        errors{
          path
          message
        }
      }
    }`,
  };

  const projectData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  //   yield put({
  //     type: ADD_PROJECT_SUCCESS,
  //     payload: projectData.data.data.addProject
  //   });
  // } catch (error) {
  //   yield put({ type: PROJECTS_ERROR, payload: error });
  // }

  const response = projectData.data.data.addProject;
  // console.log("saga resolver ", response);
  if (response.errors) {
    yield put({ type: PROJECTS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: ADD_PROJECT_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Projekt został dodany" }] },
    });
  }
}

export function* addProjectWatcher() {
  yield takeEvery(ADDING_PROJECT, addProjectAsync);
}

function* updateProjectAsync(action) {
  // try {
  const data = action.data;

  const projectInput = {
    _id: data._id,
    name: data.name ? data.name : "",
    company: data.company ? data.company : "",
    description: data.description ? data.description : "",
    cms: data.cms ? data.cms : "",
    ftp: data.ftp ? data.ftp : "",
    panel: data.panel ? data.panel : "",
  };

  const graph = {
    query: `mutation {
      updateProject(projectInput: {
      _id: "${projectInput._id}",  
      name: "${projectInput.name}",
      company: "${projectInput.company}",
      description: """${projectInput.description}""",
      cms: """${projectInput.cms}""",
      ftp: """${projectInput.ftp}""",
      panel: """${projectInput.panel}"""}){
        _id
        name
        company
        description
        cms
        ftp
        panel
        errors{
          path
          message
        }
      }
    }`,
  };
  // console.log(graph);
  const projectData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  //   yield put({
  //     type: UPDATE_PROJECT_SUCCESS,
  //     payload: projectData.data.data.updateProject
  //   });
  // } catch (error) {
  //   yield put({ type: PROJECTS_ERROR, payload: error });
  // }
  const response = projectData.data.data.updateProject;
  if (response.errors) {
    yield put({ type: PROJECTS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: UPDATE_PROJECT_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Projekt został zaktualizowany" }] },
    });
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
