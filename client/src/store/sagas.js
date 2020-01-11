import { fork, all } from "redux-saga/effects";
import { fetchFiltersWatcher, updateFilterWatcher } from "./Filters/saga";
import {
  fetchMessengersWatcher,
  updateMessengerWatcher
} from "./Messengers/saga";
import {
  updateMessagesWatcher,
  updateAlertMessagesWatcher,
  removeAlertMessagesWatcher,
  fetchMessagesWatcher
} from "./Messages/saga";
import {
  fetchTasksWatcher,
  addTaskWatcher,
  updateTaskWatcher,
  removeTaskWatcher
} from "./Tasks/saga";
import {
  fetchCommentsWatcher,
  addCommentWatcher,
  removeCommentsByTaskIdWatcher
} from "./Comments/saga";
import {
  loginUserWatcher,
  registerUserWatcher,
  updateUserWatcher,
  fetchLoggedUserWatcher,
  fetchUsersWatcher,
  logoutUserWatcher
} from "./Users/saga";
import {
  fetchProjectsWatcher,
  addProjectWatcher,
  updateProjectWatcher,
  removeProjectWatcher
} from "./Projects/saga";
import {
  fetchFilesWatcher,
  addFileWatcher,
  removeFileWatcher
} from "./Files/saga";

export default function* rootSaga() {
  yield all([
    fork(updateMessagesWatcher),
    fork(updateAlertMessagesWatcher),
    fork(removeAlertMessagesWatcher),
    fork(fetchMessagesWatcher),
    fork(loginUserWatcher),
    fork(registerUserWatcher),
    fork(updateUserWatcher),
    fork(fetchLoggedUserWatcher),
    fork(fetchUsersWatcher),
    fork(logoutUserWatcher),
    fork(fetchTasksWatcher),
    fork(addTaskWatcher),
    fork(fetchCommentsWatcher),
    fork(addCommentWatcher),
    fork(removeCommentsByTaskIdWatcher),
    fork(updateTaskWatcher),
    fork(removeTaskWatcher),
    fork(fetchProjectsWatcher),
    fork(addProjectWatcher),
    fork(updateProjectWatcher),
    fork(removeProjectWatcher),
    fork(fetchFiltersWatcher),
    fork(updateFilterWatcher),
    fork(fetchMessengersWatcher),
    fork(updateMessengerWatcher),
    fork(fetchFilesWatcher),
    fork(addFileWatcher),
    fork(removeFileWatcher)
  ]);
}
