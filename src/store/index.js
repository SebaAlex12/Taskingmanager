import { combineReducers } from "redux";

import { tasksReducer } from "./Tasks/reducers";

export const reducers = combineReducers({
  tasks: tasksReducer
});
