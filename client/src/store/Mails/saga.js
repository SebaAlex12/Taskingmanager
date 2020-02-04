import axios from "axios";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import { SENDING_MAIL, SEND_MAIL_SUCCESS, MAIL_ERRORS } from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* sendMailAsync(action) {
  try {
    const data = action.data;
    const mailInput = {
      from: data.from,
      to: data.to,
      projectName: data.projectName,
      title: data.title,
      description: data.description,
      attachments: data.attachments,
      createdBy: data.createdBy,
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
    };
    const graph = {
      query: `mutation {
        sendMail(mailInput: {
            from: "${mailInput.from}",
            to: "${mailInput.to}",
            projectName: "${mailInput.projectName}",
            title: "${mailInput.title}",
            description: "${mailInput.description}",
            attachments: "${mailInput.attachments}",
            createdBy: "${mailInput.createdBy}",
            createdAt: "${mailInput.createdAt}"}){
          _id
          from
          to
          projectName
          title
          description
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
    console.log("mail data", mailData.data.data);
    const response = mailData.data.data.addMail;
    if (response.errors) {
      yield put({ type: MAIL_ERRORS, payload: response.errors });
      yield put({
        type: UPDATE_MESSAGES_SUCCESS,
        payload: { errors: response.errors }
      });
    } else {
      yield put({
        type: SEND_MAIL_SUCCESS,
        payload: response
      });
      yield put({
        type: UPDATE_MESSAGES_SUCCESS,
        payload: { success: [{ message: "Komentarz został dodany" }] }
      });
    }
  } catch (error) {
    yield put({ type: MAIL_ERRORS, payload: error });
  }
}

export function* sendMailWatcher() {
  yield takeEvery(SENDING_MAIL, sendMailAsync);
}
