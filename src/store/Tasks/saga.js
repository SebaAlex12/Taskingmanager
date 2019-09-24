import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_TASKS,
  FETCH_TASKS_SUCCESS,
  ADDING_TASK,
  ADD_TASK_SUCCESS,
  REMOVING_TASK,
  REMOVE_TASK_SUCCESS,
  UPDATING_TASK,
  UPDATE_TASK_SUCCESS
} from "./types";

function* fetchTasksAsync() {
  const res = yield call(
    [axios, axios.get],
    "https://my-json-server.typicode.com/SebaAlex12/Tasks/db"
  );
  yield put({ type: FETCH_TASKS_SUCCESS, payload: res.data.tasks });
}

export function* fetchTasksWatcher() {
  yield takeEvery(FETCHING_TASKS, fetchTasksAsync);
}

function* addTaskAsync(action) {
  const data = action.data;
  const presentDate = new Date();

  const taskData = {
    id: data.id,
    userId: 1,
    title: data.title,
    description: data.description,
    createdAt: presentDate.toDateString(),
    status: "active",
    finishedAt: null
  };
  yield put({ type: ADD_TASK_SUCCESS, payload: taskData });
}

export function* addTaskWatcher() {
  yield takeEvery(ADDING_TASK, addTaskAsync);
}

function* updateTaskAsync(action) {
  //   console.log(action);
  const data = action.data;
  const presentDate = new Date();

  const taskData = {
    id: data.id,
    userId: 1,
    title: data.title,
    description: data.description,
    createdAt: data.createdAt,
    status: data.status,
    finishedAt: presentDate.toDateString()
  };

  yield put({ type: UPDATE_TASK_SUCCESS, payload: taskData });
}

export function* updateTaskWatcher() {
  yield takeEvery(UPDATING_TASK, updateTaskAsync);
}

function* removeTaskAsync(action) {
  yield put({ type: REMOVE_TASK_SUCCESS, payload: action.taskId });
}

export function* removeTaskWatcher() {
  yield takeEvery(REMOVING_TASK, removeTaskAsync);
}
