import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_FILES,
  ADDING_FILE,
  ADD_FILE_SUCCESS,
  REMOVING_FILE,
  REMOVE_FILE_SUCCESS,
  FILES_ERROR
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";
import { apiUrl } from '../../store/ini';

function* fetchFilesAsync() {}

export function* fetchFilesWatcher() {
  yield takeEvery(FETCHING_FILES, fetchFilesAsync);
}

function* addFileAsync(action) {
  const multifiles = document.getElementById("file-select");
  const files = multifiles.files;
  const formData = new FormData();
  const dest = "tasks-" + action.data.taskId;

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i], files[i].name);
  }

  const fileData = yield call(
    [axios, axios.post],
    `/upload-files/${dest}`,
    formData
  );

  const response = fileData;
  if (response.errors) {
    yield put({ type: FILES_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors }
    });
  } else {
    yield put({
      type: ADD_FILE_SUCCESS,
      payload: response
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Pliki zostały dodane" }] }
    });
  }
}

export function* addFileWatcher() {
  yield takeEvery(ADDING_FILE, addFileAsync);
}

function* removeFileAsync(action) {
  try {
    yield put({ type: REMOVE_FILE_SUCCESS, payload: action.projectId });
  } catch (error) {
    yield put({ type: FILES_ERROR, payload: error });
  }
}

export function* removeFileWatcher() {
  yield takeEvery(REMOVING_FILE, removeFileAsync);
}
