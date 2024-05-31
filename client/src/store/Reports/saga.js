import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_REPORTS,
  FETCHING_REPORTS_BY_LOGGED_USER_PROJECTS,
  FETCH_REPORTS_SUCCESS,
  ADDING_REPORT,
  ADD_REPORT_SUCCESS,
  REMOVING_REPORT,
  REMOVE_REPORT_SUCCESS,
  UPDATING_REPORT,
  UPDATE_REPORT_SUCCESS,
  REPORTS_ERROR,
} from "./types";

// import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";
import { apiUrl } from '../../store/ini';

function* fetchReportsAsync() {
  try {
    const res = yield call(
      [axios, axios.get],apiUrl+"reports/",{ headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_REPORTS_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    yield put({ type: REPORTS_ERROR, payload: e });
  }
}

export function* fetchReportsWatcher() {
  yield takeEvery(FETCHING_REPORTS, fetchReportsAsync);
}

function* addReportAsync(action) {
  const data = action.data;
  try{
      const reqData = {
        userId: data.userId,
        date: data.date,
        description: data.description,
        Marian: data.Marian,
        Piotrek: data.Piotrek
      }
      const res = yield call(
        [axios, axios.post],apiUrl+"reports/",JSON.stringify(reqData),{ headers: { "Content-Type": "application/json" } }
      );
      yield put({ type: ADD_REPORT_SUCCESS, payload: res.data })
  }catch(e){
    yield put({ type: REPORTS_ERROR, payload: e });
  }
}

export function* addReportWatcher() {
  yield takeEvery(ADDING_REPORT, addReportAsync);
}

function* updateReportAsync(action){
    const data = action.data;
    try{
      const reqData = {
          _id: data._id,
          date: data.date,
          description: data.description,
          Marian: data.Marian,
          Piotrek: data.Piotrek
      }
      const res = yield call(
        [axios, axios.post],apiUrl+"reports/update",JSON.stringify(reqData),{ headers: { "Content-Type": "application/json" } }
      );
      yield put({ type: UPDATE_REPORT_SUCCESS, payload: res.data })
    }catch(e){
      yield put({ type: REPORTS_ERROR, payload: e })
    }
}

export function* updateReportWatcher(){
  yield takeEvery(UPDATING_REPORT,updateReportAsync);
}

function* removeReportAsync(action){
  const id = action.id;
  console.log('delete saga item',id);

  try{
    const res = yield call(
      [axios, axios.post],apiUrl+"reports/delete/",JSON.stringify({reportId:id}),{ headers: { "Content-Type": "application/json" } }
    );
    yield put({ type: REMOVE_REPORT_SUCCESS, payload: res.data })
  }catch(e){
    yield put({ type: REPORTS_ERROR, payload: e });
  }

}

export function* removeReportWatcher() {
  yield takeEvery(REMOVING_REPORT,removeReportAsync);
}