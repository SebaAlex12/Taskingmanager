import { fork, all } from "redux-saga/effects";
import { updateMessagesWatcher, fetchMessagesWatcher } from "./Messages/saga";
import {
  fetchTasksWatcher,
  addTaskWatcher,
  updateTaskWatcher,
  removeTaskWatcher
} from "./Tasks/saga";
import { fetchCommentsWatcher, addCommentWatcher } from "./Comments/saga";
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
import { fetchFiltersWatcher, updateFilterWatcher } from "./Filters/saga";

export default function* rootSaga() {
  yield all([
    fork(updateMessagesWatcher),
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
    fork(updateTaskWatcher),
    fork(removeTaskWatcher),
    fork(fetchProjectsWatcher),
    fork(addProjectWatcher),
    fork(updateProjectWatcher),
    fork(removeProjectWatcher),
    fork(fetchFiltersWatcher),
    fork(updateFilterWatcher)
  ]);
}
