import axios from "axios";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  ADDING_MAIL,
  ADD_MAIL_SUCCESS,
  FETCHING_MAILS,
  FETCH_MAILS_SUCCESS,
  MAILS_ERRORS
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchMailsAsync() {
  try {
    const graph = {
      query: `
        query {
          fetchMails{
            _id
            from
            to
            projectName
            title
            description
            attachments
            createdBy
            createdAt
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
    yield put({
      type: FETCH_MAILS_SUCCESS,
      payload: res.data.data.fetchMails
    });
  } catch (error) {
    yield put({ type: MAILS_ERRORS, payload: error });
  }
}

export function* fetchMailsWatcher() {
  yield takeEvery(FETCHING_MAILS, fetchMailsAsync);
}

function* addMailAsync(action) {
  // const multifiles = document.getElementById("mail-file-select");
  // const files = multifiles.files;
  // const formData = new FormData();

  // for (let i = 0; i < files.length; i++) {
  //   formData.append("files", files[i], files[i].name);
  // }
  try {
    const data = action.data;

    const mailInput = {
      from: data.from,
      to: data.to,
      projectName: data.projectName,
      title: data.title,
      description: data.description,
      absolutePathFile: data.absolutePathFile ? data.absolutePathFile : "",
      attachments: "",
      createdBy: data.createdBy,
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
    };
    const graph = {
      query: `mutation {
        addMail(mailInput: {
            from: "${mailInput.from}",
            to: "${mailInput.to}",
            projectName: "${mailInput.projectName}",
            title: "${mailInput.title}",
            description: "${mailInput.description}",
            absolutePathFile: "${mailInput.absolutePathFile}",
            attachments: "${mailInput.attachments}",
            createdBy: "${mailInput.createdBy}",
            createdAt: "${mailInput.createdAt}"}){
          _id
          from
          to
          projectName
          title
          description
          absolutePathFile
          attachments
          createdBy
          createdAt
          errors{
            path
            message
          }
        }
      }`
    };

    const mailData = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    const response = mailData.data.data.addMail;
    if (response.errors) {
      yield put({ type: MAILS_ERRORS, payload: response.errors });
      yield put({
        type: UPDATE_MESSAGES_SUCCESS,
        payload: { errors: response.errors }
      });
    } else {
      yield put({
        type: ADD_MAIL_SUCCESS,
        payload: response
      });
      yield put({
        type: UPDATE_MESSAGES_SUCCESS,
        payload: { success: [{ message: "Email został dodany/wysłany" }] }
      });
    }
  } catch (error) {
    yield put({ type: MAILS_ERRORS, payload: error });
  }
}

export function* addMailWatcher() {
  yield takeEvery(ADDING_MAIL, addMailAsync);
}
