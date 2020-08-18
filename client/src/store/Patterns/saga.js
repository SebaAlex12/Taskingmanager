import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_PATTERNS,
  FETCH_PATTERNS_SUCCESS,
  ADDING_PATTERN,
  ADD_PATTERN_SUCCESS,
  REMOVING_PATTERN,
  REMOVE_PATTERN_SUCCESS,
  UPDATING_PATTERN,
  UPDATE_PATTERN_SUCCESS,
  PATTERNS_ERROR,
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchPatternsAsync(action) {
  try {
    const graph = {
      query: `
        query {
          fetchPatterns{
            _id
            userId,
            taskId,
            createdBy,
            responsiblePerson,
            title,
            description,
            elements,
            type,
            status,
            finishedAt,
            termAt,
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
      type: FETCH_PATTERNS_SUCCESS,
      payload: res.data.data.fetchPatterns,
    });
  } catch (error) {
    yield put({ type: PATTERNS_ERROR, payload: error });
  }
}

export function* fetchPatternsWatcher() {
  yield takeEvery(FETCHING_PATTERNS, fetchPatternsAsync);
}

function* addPatternAsync(action) {
  // try {
  const data = action.data;
  const patternInput = {
    userId: data.userId,
    taskId: data.taskId,
    createdBy: data.createdBy,
    responsiblePerson: data.responsiblePerson,
    title: data.title,
    description: data.description,
    elements: JSON.stringify(data.elements),
    type: data.type,
    status: data.status,
    finishedAt: data.finishedAt,
    termAt: data.termAt,
    createdAt: data.createdAt,
  };

  const graph = {
    query: `mutation {
      addPattern(patternInput: {
        userId: "${patternInput.userId}",
        taskId: "${patternInput.taskId}",
        createdBy: "${patternInput.createdBy}",
        responsiblePerson: "${patternInput.responsiblePerson}",
        title: "${patternInput.title}",
        description: "${patternInput.description}",
        elements: """${patternInput.elements}""",
        type: "${patternInput.type}",
        status: "${patternInput.status}",
        finishedAt: "${patternInput.finishedAt}",
        termAt: "${patternInput.termAt}",
        createdAt: "${patternInput.createdAt}"
    }){
        _id
        userId,
        taskId,
        createdBy,
        responsiblePerson,
        title,
        description,
        elements,
        type,
        status,
        finishedAt,
        termAt,
        createdAt
      }
    }`,
  };
  // console.log("graph", JSON.stringify(graph));
  const patternData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = patternData.data.data.addPattern;

  if (response.errors) {
    yield put({ type: PATTERNS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: ADD_PATTERN_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Szablon został dodany" }] },
    });
  }
}

export function* addPatternWatcher() {
  yield takeEvery(ADDING_PATTERN, addPatternAsync);
}

function* updatePatternAsync(action) {
  // try {
  const data = action.data;

  const patternInput = {
    _id: data._id,
    userId: data.userId ? data.userId : "",
    taskId: data.taskId ? data.taskId : "",
    createdBy: data.createdBy ? data.createdBy : "",
    responsiblePerson: data.responsiblePerson ? data.responsiblePerson : "",
    title: data.title ? data.title : "",
    description: data.description ? data.description : "",
    elements: data.elements ? JSON.stringify(data.elements) : "",
    type: data.type ? data.type : "",
    status: data.status ? data.status : "",
    finishedAt: data.finishedAt ? data.finishedAt : "",
    termAt: data.termAt ? data.termAt : "",
    createdAt: data.createdAt ? data.createdAt : "",
  };

  const graph = {
    query: `mutation {
      updatePattern(patternInput: {
        _id: "${patternInput._id}",  
        userId: "${patternInput.userId}", 
        taskId: "${patternInput.taskId}",    
        createdBy: "${patternInput.createdBy}",
        responsiblePerson: "${patternInput.responsiblePerson}",
        title: "${patternInput.title}",
        description: "${patternInput.description}",
        elements: """${patternInput.elements}""",
        type: "${patternInput.type}",
        status: "${patternInput.status}",
        finishedAt: "${patternInput.finishedAt}",
        termAt: "${patternInput.termAt}",
        createdAt: "${patternInput.createdAt}"}){
        _id
        userId,
        taskId,
        createdBy,
        responsiblePerson,
        title,
        description,
        elements,
        type,
        status,
        finishedAt,
        termAt,
        createdAt
      }
    }`,
  };
  // console.log(graph);
  const patternData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = patternData.data.data.updatePattern;
  if (response.errors) {
    yield put({ type: PATTERNS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: UPDATE_PATTERN_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: {
        success: [{ message: "Szablon został zaktualizowany" }],
      },
    });
  }
}

export function* updatePatternWatcher() {
  yield takeEvery(UPDATING_PATTERN, updatePatternAsync);
}

function* removePatternAsync(action) {
  const patternId = action.data;
  const graph = {
    query: `mutation {
      removePattern(patternId: "${patternId}"){
        _id
      }
    }`,
  };

  const patternData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = patternData.data.data.removePattern;

  if (response.errors) {
    yield put({ type: PATTERNS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_PATTERN_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: REMOVE_PATTERN_SUCCESS, payload: response });
    yield put({
      type: UPDATE_PATTERN_SUCCESS,
      payload: { success: [{ message: "Szablon został usunięty" }] },
    });
  }
}

export function* removePatternWatcher() {
  yield takeEvery(REMOVING_PATTERN, removePatternAsync);
}
