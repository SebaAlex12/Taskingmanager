import { fork, all } from "redux-saga/effects";
import {
  fetchTasksWatcher,
  addTaskWatcher,
  updateTaskWatcher,
  removeTaskWatcher
} from "./Tasks/saga";
import {
  loginUserWatcher,
  registerUserWatcher,
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
    fork(loginUserWatcher),
    fork(registerUserWatcher),
    fork(fetchLoggedUserWatcher),
    fork(fetchUsersWatcher),
    fork(logoutUserWatcher),
    fork(fetchTasksWatcher),
    fork(addTaskWatcher),
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
