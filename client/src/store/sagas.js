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
  logoutUserWatcher
} from "./Users/saga";

export default function* rootSaga() {
  yield all([
    fork(loginUserWatcher),
    fork(registerUserWatcher),
    fork(fetchLoggedUserWatcher),
    fork(logoutUserWatcher),
    fork(fetchTasksWatcher),
    fork(addTaskWatcher),
    fork(updateTaskWatcher),
    fork(removeTaskWatcher)
  ]);
}
