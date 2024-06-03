import axios from "axios";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_TASKS,
  FETCHING_TASKS_BY_LOGGED_USER_PROJECTS,
  FETCH_TASKS_SUCCESS,
  ADDING_TASK,
  ADD_TASK_SUCCESS,
  REMOVING_TASK,
  REMOVE_TASK_SUCCESS,
  UPDATING_TASK,
  UPDATE_TASK_SUCCESS,
  SENDING_MAILING_TASK,
  SEND_MAILING_TASK_SUCCESS,
  TASKS_ERROR,
} from "./types";

import { UPDATE_MESSAGE, UPDATE_ALERT_MESSAGE } from "../Messages/types";
import { apiUrl } from '../../store/ini';
// import { REMOVING_COMMENTS_RELATIVE_TASK } from "../Comments/types";

// import { formatErrors } from "../../common/tools";

function* fetchTasksAsync(action) {
  const data = action.data ? action.data : {};
  const taskInput = {
    projectName: data.projectName ? data.projectName : "",
    createdBy: data.createdBy ? data.createdBy : "",
    responsiblePerson: data.responsiblePerson ? data.responsiblePerson : "",
    mailReminderData: data.mailReminderData ? data.mailReminderData : ""
  }
  try {
    const graph = {
      query: `
        query {
          fetchTasks(taskInput:{
            projectName: "${taskInput.projectName}",
            createdBy: "${taskInput.createdBy}", 
            responsiblePerson: "${taskInput.responsiblePerson}",
            mailRemainderData: "${taskInput.mailRemainderData}"}){
            _id
            createdBy
            projectId
            projectName
            responsiblePerson
            title
            description
            priority
            status
            responsiblePersonLastComment
            createdAt
            finishedAt
            termAt
            mailRemainderData
            comments{
                _id
                taskId
                userId
                createdBy
                description
                createdAt
            }
            files
          }
        }
    `,
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

    yield put({ type: FETCH_TASKS_SUCCESS, payload: res.data.data.fetchTasks });
  } catch (e) {
    yield put({ type: TASKS_ERROR, payload: [e.message] });
  }
}

export function* fetchTasksWatcher() {
  yield takeEvery(FETCHING_TASKS, fetchTasksAsync);
}

function* fetchTasksByLoggedUserProjectsAsync(action) {
  const data = action.data;
  try {
    const graph = {
      query: `
        query {
          fetchTasksByLoggedUserProjects(taskInput:{
            projectName: "${data.projectName}",
            createdBy: "${data.createdBy}", 
            responsiblePerson: "${data.responsiblePerson}",
            mailRemainderData: "${data.mailRemainderData}"},projects: "${data.projects}"){
            _id
            createdBy
            projectId
            projectName
            responsiblePerson
            title
            description
            priority
            status
            responsiblePersonLastComment
            createdAt
            finishedAt
            mailRemainderData
            termAt
            comments{
                _id
                taskId
                userId
                createdBy
                description
                createdAt
            }
            files
          }
        }
    `,
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
      type: FETCH_TASKS_SUCCESS,
      payload: res.data.data.fetchTasksByLoggedUserProjects,
    });
  } catch (error) {
    yield put({ type: TASKS_ERROR, payload: error });
  }
}

export function* fetchTasksByLoggedUserProjectsWatcher() {
  yield takeEvery(
    FETCHING_TASKS_BY_LOGGED_USER_PROJECTS,
    fetchTasksByLoggedUserProjectsAsync
  );
}

function* addTaskAsync(action) {
  const data = action.data;

  const taskInput = {
    userId: data.userId,
    createdBy: data.createdBy,
    projectId: data.projectId,
    projectName: data.projectName,
    responsiblePerson: data.responsiblePerson,
    title: data.title,
    description: data.description,
    priority: data.priority,
    status: data.status,
    mailRemainderData: null,
    responsiblePersonLastComment: data.responsiblePersonLastComment,
    createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
    termAt: moment(data.termAt, "YYYY-MM-DD HH:mm:ss").format(),
    // finishedAt: data.finishedAt
  };
  const graph = {
    query: `mutation {
      addTask(taskInput: {userId: "${taskInput.userId}",
      createdBy: "${taskInput.createdBy}",
      projectId: "${taskInput.projectId}",
      projectName: "${taskInput.projectName}",
      responsiblePerson: "${taskInput.responsiblePerson}",
      title: "${taskInput.title}",
      description: """${taskInput.description}""",
      priority: "${taskInput.priority}",
      status: "${taskInput.status}",
      responsiblePersonLastComment: "${taskInput.responsiblePersonLastComment}",
      createdAt: "${taskInput.createdAt}",
      finishedAt: "",
      termAt: "${taskInput.termAt}",
      mailRemainderData: "${taskInput.mailRemainderData}"}){
        _id
        createdBy
        projectId
        projectName
        responsiblePerson
        title
        description
        priority
        status
        responsiblePersonLastComment
        createdAt
        finishedAt
        termAt
        mailRemainderData
        comments{
            _id
            taskId
            userId
            createdBy
            description
            createdAt
        }
        files
        errors{
          path
          message
        }
      }
    }`,
  };

  // const taskData = yield call(
  //   [axios, axios.post],
  //    apiUrl + "/graphql",
  //   JSON.stringify(graph),
  //   { headers: { "Content-Type": "application/json" } }
  // );

  const taskData = yield call(
    [axios, axios.post],apiUrl+"graphql/",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } }
  );

  const response = taskData.data.data.addTask;

  if (response.errors) {
    yield put({ type: TASKS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_ALERT_MESSAGE,
      payload: response.errors[0].message,
    });
  } else {
    yield put({ type: ADD_TASK_SUCCESS, payload: response });
    yield put({
      type: UPDATE_MESSAGE,
      payload: "Zadanie zostało dodane",
    });
  }
}

export function* addTaskWatcher() {
  yield takeEvery(ADDING_TASK, addTaskAsync);
}

function* updateTaskAsync(action) {
  const data = action.data;
  const taskInput = {
    _id: data._id,
    userId: 1,
    createdBy: data.createdBy ? data.createdBy : "",
    projectId: data.projectId ? data.projectId : "",
    projectName: data.projectName ? data.projectName : "",
    responsiblePerson: data.responsiblePerson ? data.responsiblePerson : "",
    title: data.title ? data.title : "",
    description: data.description ? data.description : "",
    priority: data.priority ? data.priority : "",
    status: data.status ? data.status : "",
    mailRemainderData: data.mailRemainderData ? data.mailRemainderData : null,
    responsiblePersonLastComment:
      data.responsiblePersonLastComment === true ||
      data.responsiblePersonLastComment === false
        ? data.responsiblePersonLastComment
        : "",
    termAt: data.termAt
      ? moment(data.termAt, "YYYY-MM-DD HH:mm:ss").format()
      : "",
    finishedAt: data.finishedAt
      ? moment(data.finishedAt, "YYYY-MM-DD HH:mm:ss").format()
      : "",
  };
  const graph = {
    query: `mutation {
      updateTask(taskInput: {
      _id: "${taskInput._id}",  
      userId: "${taskInput.userId}",
      createdBy: "${taskInput.createdBy}",
      projectId: "${taskInput.projectId}",
      projectName: "${taskInput.projectName}",
      responsiblePerson: "${taskInput.responsiblePerson}",
      title: "${taskInput.title}",
      description: """${taskInput.description}""",
      priority: "${taskInput.priority}",
      status: "${taskInput.status}",
      responsiblePersonLastComment: "${taskInput.responsiblePersonLastComment}",
      finishedAt: "${taskInput.finishedAt}",
      termAt: "${taskInput.termAt}",
      mailRemainderData: "${taskInput.mailRemainderData}"}){
        _id
        createdBy
        projectId
        projectName
        responsiblePerson
        title
        description
        priority
        status
        responsiblePersonLastComment
        createdAt
        finishedAt
        termAt
        mailRemainderData
        comments{
            _id
            taskId
            userId
            createdBy
            description
            createdAt
        }
        files
        errors{
          path
          message
        }
      }
    }`,
  };
  // const taskData = yield call(
  //   [axios, axios.post],
  //    apiUrl + "/graphql",
  //   JSON.stringify(graph),
  //   { headers: { "Content-Type": "application/json" } }
  // );

  const taskData = yield call(
    [axios, axios.post],apiUrl+"graphql/",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } }
  );

  const response = taskData.data.data.updateTask;

  if (response.errors) {
    yield put({ type: TASKS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_ALERT_MESSAGE,
      payload: response.errors[0].message,
    });
  } else {
    yield put({
      type: UPDATE_TASK_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGE,
      payload: "Zadanie zostało zaktualizowane",
    });
  }
}

export function* updateTaskWatcher() {
  yield takeEvery(UPDATING_TASK, updateTaskAsync);
}

function* removeTaskAsync(action) {
  const taskId = action.data;
  const graph = {
    query: `mutation {
      removeTask(taskId: "${taskId}"){
        _id
        errors{
          path
          message
        }
      }
    }`,
  };

  // const taskData = yield call(
  //   [axios, axios.post],
  //    apiUrl + "/graphql",
  //   JSON.stringify(graph),
  //   { headers: { "Content-Type": "application/json" } }
  // );

  const taskData = yield call(
    [axios, axios.post],apiUrl+"graphql/",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } }
  );

  const response = taskData.data.data.removeTask;

  if (response.errors) {
    yield put({ type: TASKS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_ALERT_MESSAGE,
      payload: response.errors[0].message,
    });
  } else {
    yield put({ type: REMOVE_TASK_SUCCESS, payload: response });
    yield put({
      type: UPDATE_MESSAGE,
      payload: "Zadanie zostało usunięte",
    });
  }
}

export function* removeTaskWatcher() {
  yield takeEvery(REMOVING_TASK, removeTaskAsync);
  // yield takeEvery(REMOVING_COMMENTS_RELATIVE_TASK)
}

function* sendMailingTaskAsync() {
  const graph = {
    query: `mutation {
      sendMailingTask{
        errors{
          path
          message
        }
      }
    }`,
  };

  // const taskData = yield call(
  //   [axios, axios.post],
  //    apiUrl + "/graphql",
  //   JSON.stringify(graph),
  //   { headers: { "Content-Type": "application/json" } }
  // );

  const taskData = yield call(
    [axios, axios.post],apiUrl+"graphql/",JSON.stringify(graph),{ headers: { "Content-Type": "application/json" } }
  );

  const response = taskData.data.data.sendMailingTask;

  if (response.errors) {
    yield put({ type: TASKS_ERROR, payload: response.errors });
    yield put({
      type: SEND_MAILING_TASK_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: REMOVE_TASK_SUCCESS, payload: response });
    yield put({
      type: SEND_MAILING_TASK_SUCCESS,
      payload: { success: [{ message: "Mailing rozesłany" }] },
    });
  }
}

export function* sendMailingTaskWatcher() {
  yield takeEvery(SENDING_MAILING_TASK, sendMailingTaskAsync);
}
