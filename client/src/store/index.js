import { combineReducers } from "redux";

import { tasksReducer } from "./Tasks/reducers";
import { commentsReducer } from "./Comments/reducers";
import { mailsReducer } from "./Mails/reducers";
import { usersReducer } from "./Users/reducers";
import { projectsReducer } from "./Projects/reducers";
import { filesReducer } from "./Files/reducers";
import { filtersReducer } from "./Filters/reducers";
import { messengersReducer } from "./Messengers/reducers";
import { messagesReducer } from "./Messages/reducers";

export const reducers = combineReducers({
  tasks: tasksReducer,
  comments: commentsReducer,
  mails: mailsReducer,
  users: usersReducer,
  projects: projectsReducer,
  files: filesReducer,
  filters: filtersReducer,
  messengers: messengersReducer,
  messages: messagesReducer
});
