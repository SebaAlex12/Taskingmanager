import { combineReducers } from "redux";

import { tasksReducer } from "./Tasks/reducers";
import { usersReducer } from "./Users/reducers";

export const reducers = combineReducers({
  tasks: tasksReducer,
  users: usersReducer
});
