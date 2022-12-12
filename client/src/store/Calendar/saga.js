import axios from "axios";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_CALENDARS,
  FETCH_CALENDARS_SUCCESS,
  ADDING_CALENDAR,
  ADD_CALENDAR_SUCCESS,
  UPDATING_CALENDAR,
  UPDATE_CALENDAR_SUCCESS,
  CALENDARS_ERROR,
  REMOVING_CALENDAR,
  REMOVE_CALENDAR_SUCCESS,
} from "./types";
import { apiUrl } from '../../store/ini';

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchCalendarsAsync(action) {
  try {
    const graph = {
      query: `
        query {
          fetchCalendars(loggedUserId:"${action.loggedUserId}"){
            _id
            eventId,
            userId,
            eventType,
            title,
            description,
            selectedDate,
            status,
            createdAt,
          }
        }
    `,
    };

    const res = yield call(
      [axios, axios.post],
       apiUrl + "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_CALENDARS_SUCCESS,
      payload: res.data.data.fetchCalendars,
    });
  } catch (error) {
    yield put({ type: CALENDARS_ERROR, payload: error });
  }
}

export function* fetchCalendarsWatcher() {
  yield takeEvery(FETCHING_CALENDARS, fetchCalendarsAsync);
}

function* addCalendarAsync(action) {
  try {
    const data = action.data;
    const calendarInput = {
      eventId: data.eventId,
      userId: data.userId,
      eventType: data.eventType,
      title: data.title,
      description: data.description,
      selectedDate: data.selectedDate,
      status: data.status,
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
    };

    const graph = {
      query: `mutation {
      addCalendar(calendarInput: {
      eventId: "${calendarInput.eventId}",
      userId: "${calendarInput.userId}",
      eventType: "${calendarInput.eventType}",
      title: "${calendarInput.title}",
      description: "${calendarInput.description}",
      selectedDate: "${calendarInput.selectedDate}",
      status: "${calendarInput.status}",
      createdAt: "${calendarInput.createdAt}"}){
        _id
        eventId,
        userId,
        eventType,
        title,
        description,
        selectedDate,
        status,
        createdAt,
        errors{
          path
          message
        }
      },
    }`,
    };

    const calendarData = yield call(
      [axios, axios.post],
       apiUrl + "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );

    const response = calendarData.data.data.addCalendar;

    if (response.errors) {
      yield put({ type: CALENDARS_ERROR, payload: response.errors });
      yield put({
        type: UPDATE_MESSAGES_SUCCESS,
        payload: { errors: response.errors },
      });
    } else {
      yield put({
        type: ADD_CALENDAR_SUCCESS,
        payload: response,
      });
      yield put({
        type: UPDATE_MESSAGES_SUCCESS,
        payload: { success: [{ message: "Wydarzenie zostało dodane" }] },
      });
    }
  } catch (error) {
    yield put({ type: CALENDARS_ERROR, payload: error });
  }
}

export function* addCalendarWatcher() {
  yield takeEvery(ADDING_CALENDAR, addCalendarAsync);
}

function* updateCalendarAsync(action) {
  // try {
  const data = action.data;

  const calendarInput = {
    _id: data._id,
    eventId: data.eventId ? data.eventId : "",
    userId: data.userId ? data.userId : "",
    eventType: data.eventType ? data.eventType : "",
    title: data.title ? data.title : "",
    description: data.description ? data.description : "",
    selectedDate: data.selectedDate ? data.selectedDate : "",
    status: data.status ? data.status : "",
    createdAt: data.createdAt ? data.createdAt : "",
  };

  const graph = {
    query: `mutation {
      updateCalendar(calendarInput: {
        _id: "${calendarInput._id}",
        eventId: "${calendarInput.eventId}",
        userId: "${calendarInput.userId}",
        eventType: "${calendarInput.eventType}",
        title: "${calendarInput.title}",
        description: "${calendarInput.description}",
        selectedDate: "${calendarInput.selectedDate}",
        status: "${calendarInput.status}",
        createdAt: "${calendarInput.createdAt}",}){
        _id
        eventId,
        userId,
        eventType,
        title,
        description,
        selectedDate,
        status,
        createdAt,
        errors{
          path
          message
        }
      }
    }`,
  };
  const calendarData = yield call(
    [axios, axios.post],
     apiUrl + "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = calendarData.data.data.updateCalendar;
  if (response.errors) {
    yield put({ type: CALENDARS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: UPDATE_CALENDAR_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Kalendarz został zaktualizowany" }] },
    });
  }
}

export function* updateCalendarWatcher() {
  yield takeEvery(UPDATING_CALENDAR, updateCalendarAsync);
}
function* removeCalendarAsync(action) {
  const eventId = action.data;
  const graph = {
    query: `mutation {
      removeCalendar(eventId: "${eventId}"){
        _id,
        errors{
          path
          message
        }
      }
    }`,
  };

  const eventData = yield call(
    [axios, axios.post],
     apiUrl + "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = eventData.data.data.removeCalendar;

  if (response.errors) {
    yield put({ type: CALENDARS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: REMOVE_CALENDAR_SUCCESS, payload: response });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Wydarzenie zostało usunięte" }] },
    });
  }
}

export function* removeCalendarWatcher() {
  yield takeEvery(REMOVING_CALENDAR, removeCalendarAsync);
}
