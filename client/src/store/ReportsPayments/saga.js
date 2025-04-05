import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { FETCHING_REPORTS_PAYMENTS, ADDING_REPORT_PAYMENTS, UPDATING_REPORT_PAYMENTS, REMOVING_REPORT_PAYMENTS, FETCH_REPORTS_PAYMENTS_SUCCESS, ADD_REPORT_PAYMENTS_SUCCESS, REMOVE_REPORT_PAYMENTS_SUCCESS, UPDATE_REPORT_PAYMENTS_SUCCESS, REPORTS_PAYMENTS_ERROR } from "./types";

// import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";
import { apiUrl } from '../../store/ini';

function* fetchReportsPaymentsAsync() {
  try {
    const res = yield call(
      [axios, axios.get],apiUrl+"reports_payments/",{ headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_REPORTS_PAYMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    yield put({ type: REPORTS_PAYMENTS_ERROR, payload: error });
  }
}

export function* fetchReportsPaymentsWatcher() {
  yield takeEvery(FETCHING_REPORTS_PAYMENTS, fetchReportsPaymentsAsync);
}

function* addReportPaymentsAsync(action) {
  const data = action.data;

  try{
      const reqData = {
        userId: data.userId,
        month: data.month,
        description: data.description,
        sendedBy: data.sendedBy,
        approvedBy: '',
        MarianPrice: data.MarianPrice,
        PiotrekPrice: data.PiotrekPrice
      }
      const res = yield call(
        [axios, axios.post],apiUrl+"reports_payments/",JSON.stringify(reqData),{ headers: { "Content-Type": "application/json" } }
      );
      yield put({ type: ADD_REPORT_PAYMENTS_SUCCESS, payload: res.data })
  }catch(error){
    console.log('error',error);
    yield put({ type: REPORTS_PAYMENTS_ERROR, payload: error });
  }
}

export function* addReportPaymentsWatcher() {
  yield takeEvery(ADDING_REPORT_PAYMENTS, addReportPaymentsAsync);
}

function* updateReportPaymentsAsync(action){
    const data = action.data;
    try{
      const reqData = {
        _id: data._id,
        approvedBy: data.approvedBy
      }
      const res = yield call(
        [axios, axios.post],apiUrl+"reports_payments/update/",JSON.stringify(reqData),{ headers: { "Content-Type": "application/json" } }
      );
      yield put({ type: UPDATE_REPORT_PAYMENTS_SUCCESS, payload: res.data })
    }catch(error){
      yield put({ type: REPORTS_PAYMENTS_ERROR, payload: error })
    }
}

export function* updateReportPaymentsWatcher(){
  yield takeEvery(UPDATING_REPORT_PAYMENTS,updateReportPaymentsAsync);
}

function* removeReportPaymentsAsync(action){
  const id = action.id;
  console.log('delete saga item',id);

  try{
    const res = yield call(
      [axios, axios.post],apiUrl+"reports_payments/delete/",JSON.stringify({reportId:id}),{ headers: { "Content-Type": "application/json" } }
    );
    yield put({ type: REMOVE_REPORT_PAYMENTS_SUCCESS, payload: res.data })
  }catch(error){
    yield put({ type: REPORTS_PAYMENTS_ERROR, payload: error });
  }

}

export function* removeReportPaymentsWatcher() {
  yield takeEvery(REMOVING_REPORT_PAYMENTS,removeReportPaymentsAsync);
}