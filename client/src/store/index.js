import { combineReducers } from "redux";

import { tasksReducer } from "./Tasks/reducers";
import { commentsReducer } from "./Comments/reducers";
import { usersReducer } from "./Users/reducers";
import { projectsReducer } from "./Projects/reducers";
import { filesReducer } from "./Files/reducers";
import { filtersReducer } from "./Filters/reducers";
import { messagesReducer } from "./Messages/reducers";

export const reducers = combineReducers({
  tasks: tasksReducer,
  comments: commentsReducer,
  users: usersReducer,
  projects: projectsReducer,
  files: filesReducer,
  filters: filtersReducer,
  messages: messagesReducer
});
