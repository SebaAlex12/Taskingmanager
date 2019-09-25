import { fork, all } from "redux-saga/effects";
import {
  fetchTasksWatcher,
  addTaskWatcher,
  updateTaskWatcher,
  removeTaskWatcher
} from "./Tasks/saga";
import { fetchLoggedUserWatcher } from "./Users/saga";

export default function* rootSaga() {
  yield all([
    fork(fetchTasksWatcher),
    fork(addTaskWatcher),
    fork(updateTaskWatcher),
    fork(removeTaskWatcher),
    fork(fetchLoggedUserWatcher)
  ]);
}
