import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  UPDATING_SETTINGS,
  UPDATE_SETTINGS_SUCCESS,
  FETCHING_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  SETTINGS_ERROR
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";
import { apiUrl } from '../../store/ini';

function* fetchSettingsAsync() {
  try {
    const graph = {
      query: `
        query {
          fetchSettings{
            _id
            mailingDate
          }
        }
    `
    };

    // const res = yield call(
    //   [axios, axios.post],
    //    apiUrl + "/graphql",
    //   JSON.stringify(graph),
    //   { headers: { "Content-Type": "application/json" } }
    // );

    const res = yield call(
      [axios, axios.post],apiUrl+"graphql/",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } }
    );

    yield put({
      type: FETCH_SETTINGS_SUCCESS,
      payload: res.data.data.fetchSettings
    });
  } catch (error) {
    yield put({ type: SETTINGS_ERROR, payload: error });
  }
}

export function* fetchSettingsWatcher() {
  yield takeEvery(FETCHING_SETTINGS, fetchSettingsAsync);
}

function* updateSettingAsync(action) {
  // try {
  const data = action.data;

  const settingsInput = {
    _id: data._id,
    mailingDate: data.mailingDate ? data.mailingDate : ""
  };

  const graph = {
    query: `mutation {
        updateSettings(settingsInput: {
        _id: "${settingsInput._id}",  
        mailingDate: "${settingsInput.mailingDate}"}){
          _id
          mailingDate
        }
      }`
  };
  // const settingsData = yield call(
  //   [axios, axios.post],
  //    apiUrl + "/graphql",
  //   JSON.stringify(graph),
  //   { headers: { "Content-Type": "application/json" } }
  // );

  const settingsData = yield call(
    [axios, axios.post],apiUrl+"graphql/",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } }
  );

  const response = settingsData.data.data.updateSettings;
  if (response.errors) {
    yield put({ type: SETTINGS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_SETTINGS_SUCCESS,
      payload: { errors: response.errors }
    });
  } else {
    yield put({
      type: UPDATE_SETTINGS_SUCCESS,
      payload: response
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Ustawienia zostały zaktualizowane" }] }
    });
  }
}

export function* updateSettingWatcher() {
  yield takeEvery(UPDATING_SETTINGS, updateSettingAsync);
}
