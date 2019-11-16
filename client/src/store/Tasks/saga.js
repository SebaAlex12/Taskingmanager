import axios from "axios";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_TASKS,
  FETCH_TASKS_SUCCESS,
  ADDING_TASK,
  ADD_TASK_SUCCESS,
  REMOVING_TASK,
  REMOVE_TASK_SUCCESS,
  UPDATING_TASK,
  UPDATE_TASK_SUCCESS,
  TASKS_ERROR
} from "./types";

function* fetchTasksAsync(action) {
  try {
    const graph = {
      query: `
        query {
          fetchTasks(taskInput:{createdBy: "${action.data.createdBy}", responsiblePerson: "${action.data.responsiblePerson}"}){
            _id
            createdBy
            projectId
            projectName
            responsiblePerson
            title
            description
            priority
            status
            responsiblePersonLastComment
            createdAt
            finishedAt
            termAt
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
    // console.log(res.data.data.fetchTasks);
    yield put({ type: FETCH_TASKS_SUCCESS, payload: res.data.data.fetchTasks });
  } catch (error) {
    yield put({ type: TASKS_ERROR, payload: error });
  }
}

export function* fetchTasksWatcher() {
  yield takeEvery(FETCHING_TASKS, fetchTasksAsync);
}

function* addTaskAsync(action) {
  try {
    const data = action.data;

    const taskInput = {
      userId: data.userId,
      createdBy: data.createdBy,
      projectId: data.projectId,
      projectName: data.projectName,
      responsiblePerson: data.responsiblePerson,
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      responsiblePersonLastComment: data.responsiblePersonLastComment,
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
      termAt: moment(data.termAt, "YYYY-MM-DD HH:mm:ss").format()
      // finishedAt: data.finishedAt
    };

    const graph = {
      query: `mutation {
      addTask(taskInput: {userId: "${taskInput.userId}",
      createdBy: "${taskInput.createdBy}",
      projectId: "${taskInput.projectId}",
      projectName: "${taskInput.projectName}",
      responsiblePerson: "${taskInput.responsiblePerson}",
      title: "${taskInput.title}",
      description: """${taskInput.description}""",
      priority: "${taskInput.priority}",
      status: "${taskInput.status}",
      responsiblePersonLastComment: "${taskInput.responsiblePersonLastComment}",
      createdAt: "${taskInput.createdAt}",
      finishedAt: "",
      termAt: "${taskInput.termAt}"}){
        _id
        createdBy
        projectId
        projectName
        responsiblePerson
        title
        description
        priority
        status
        responsiblePersonLastComment
        createdAt
        finishedAt
        termAt
      }
    }`
    };

    const taskData = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    // console.log(taskData.data.data.addTask);
    yield put({ type: ADD_TASK_SUCCESS, payload: taskData.data.data.addTask });
  } catch (error) {
    console.log("error:", error);
    yield put({ type: TASKS_ERROR, payload: error });
  }
}

export function* addTaskWatcher() {
  yield takeEvery(ADDING_TASK, addTaskAsync);
}

function* updateTaskAsync(action) {
  try {
    const data = action.data;
    // console.log("saga", data);
    const taskInput = {
      _id: data._id,
      userId: 1,
      createdBy: data.createdBy ? data.createdBy : "",
      projectId: data.projectId ? data.projectId : "",
      projectName: data.projectName ? data.projectName : "",
      responsiblePerson: data.responsiblePerson ? data.responsiblePerson : "",
      title: data.title ? data.title : "",
      description: data.description ? data.description : "",
      priority: data.priority ? data.priority : "",
      status: data.status ? data.status : "",
      responsiblePersonLastComment:
        data.responsiblePersonLastComment === true ? true : false,
      termAt: data.termAt
        ? moment(data.termAt, "YYYY-MM-DD HH:mm:ss").format()
        : "",
      finishedAt: data.finishedAt
        ? moment(data.finishedAt, "YYYY-MM-DD HH:mm:ss").format()
        : ""
    };
    // console.log("saga", taskInput);
    const graph = {
      query: `mutation {
      updateTask(taskInput: {
      _id: "${taskInput._id}",  
      userId: "${taskInput.userId}",
      createdBy: "${taskInput.createdBy}",
      projectId: "${taskInput.projectId}",
      projectName: "${taskInput.projectName}",
      responsiblePerson: "${taskInput.responsiblePerson}",
      title: "${taskInput.title}",
      description: """${taskInput.description}""",
      priority: "${taskInput.priority}",
      status: "${taskInput.status}",
      responsiblePersonLastComment: "${taskInput.responsiblePersonLastComment}",
      finishedAt: "${taskInput.finishedAt}",
      termAt: "${taskInput.termAt}"}){
        _id
        createdBy
        projectId
        projectName
        responsiblePerson
        title
        description
        priority
        status
        responsiblePersonLastComment
        createdAt
        finishedAt
        termAt
      }
    }`
    };
    // console.log(graph);
    const taskData = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    // console.log("saga", taskData.data.data.updateTask);
    yield put({
      type: UPDATE_TASK_SUCCESS,
      payload: taskData.data.data.updateTask
    });
  } catch (error) {
    yield put({ type: TASKS_ERROR, payload: error });
  }
}

export function* updateTaskWatcher() {
  yield takeEvery(UPDATING_TASK, updateTaskAsync);
}

function* removeTaskAsync(action) {
  try {
    yield put({ type: REMOVE_TASK_SUCCESS, payload: action.taskId });
  } catch (error) {
    yield put({ type: TASKS_ERROR, payload: error });
  }
}

export function* removeTaskWatcher() {
  yield takeEvery(REMOVING_TASK, removeTaskAsync);
}
