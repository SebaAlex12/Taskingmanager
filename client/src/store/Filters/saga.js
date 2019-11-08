import { put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_FILTERS,
  FETCH_FILTERS_SUCCESS,
  UPDATING_FILTER,
  UPDATE_FILTER_SUCCESS,
  FILTERS_ERROR
} from "./types";

function* fetchFiltersAsync() {
  try {
    const res = {};
    yield put({
      type: FETCH_FILTERS_SUCCESS,
      payload: res.data.data.fetchFilters
    });
  } catch (error) {
    yield put({ type: FILTERS_ERROR, payload: error });
  }
}

export function* fetchFiltersWatcher() {
  yield takeEvery(FETCHING_FILTERS, fetchFiltersAsync);
}

function* updateFilterAsync(action) {
  // console.log(action.data);
  try {
    yield put({ type: UPDATE_FILTER_SUCCESS, payload: action.data });
  } catch (error) {
    yield put({ type: FILTERS_ERROR, payload: error });
  }
}

export function* updateFilterWatcher() {
  yield takeEvery(UPDATING_FILTER, updateFilterAsync);
}
