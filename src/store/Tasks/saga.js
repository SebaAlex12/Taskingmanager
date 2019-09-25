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

function* fetchTasksAsync() {
  try {
    const res = yield call(
      [axios, axios.get],
      "https://my-json-server.typicode.com/SebaAlex12/Tasks/db"
    );
    yield put({ type: FETCH_TASKS_SUCCESS, payload: res.data.tasks });
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
    const presentDate = moment().format("LLLL");
    console.log(data);
    const taskData = {
      id: data.id,
      userId: data.userId,
      userNickname: data.userNickname,
      title: data.title,
      description: data.description,
      createdAt: presentDate,
      status: "active",
      finishedAt: null
    };
    yield put({ type: ADD_TASK_SUCCESS, payload: taskData });
  } catch (error) {
    yield put({ type: TASKS_ERROR, payload: error });
  }
}

export function* addTaskWatcher() {
  yield takeEvery(ADDING_TASK, addTaskAsync);
}

function* updateTaskAsync(action) {
  try {
    const data = action.data;
    const presentDate = moment().format("LLLL");

    const taskData = {
      id: data.id,
      userId: 1,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      status: data.status,
      finishedAt: presentDate
    };

    yield put({ type: UPDATE_TASK_SUCCESS, payload: taskData });
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
