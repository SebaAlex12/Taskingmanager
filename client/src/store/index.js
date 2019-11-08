import { combineReducers } from "redux";

import { tasksReducer } from "./Tasks/reducers";
import { usersReducer } from "./Users/reducers";
import { projectsReducer } from "./Projects/reducers";
import { filtersReducer } from "./Filters/reducers";

export const reducers = combineReducers({
  tasks: tasksReducer,
  users: usersReducer,
  projects: projectsReducer,
  filters: filtersReducer
});
