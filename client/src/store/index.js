import { combineReducers } from "redux";

import { calendarsReducer } from "./Calendar/reducers";
import { catalogsReducer } from "./Catalogs/reducers";
import { contractorsReducer } from "./Contractors/reducers";
import { companiesReducer } from "./Companies/reducers";
import { tasksReducer } from "./Tasks/reducers";
import { settingsReducer } from "./Settings/reducers";
import { commentsReducer } from "./Comments/reducers";
import { mailsReducer } from "./Mails/reducers";
import { usersReducer } from "./Users/reducers";
import { usersHistoryReducer } from "./UsersHistory/reducers";
import { projectsReducer } from "./Projects/reducers";
import { filesReducer } from "./Files/reducers";
import { filtersReducer } from "./Filters/reducers";
import { messengersReducer } from "./Messengers/reducers";
import { messagesReducer } from "./Messages/reducers";
import { paymentsReducer } from "./Payments/reducers";
import { patternsReducer } from "./Patterns/reducers";

export const reducers = combineReducers({
  calendars: calendarsReducer,
  catalogs: catalogsReducer,
  tasks: tasksReducer,
  settings: settingsReducer,
  contractors: contractorsReducer,
  companies: companiesReducer,
  comments: commentsReducer,
  mails: mailsReducer,
  users: usersReducer,
  usersHistory: usersHistoryReducer,
  projects: projectsReducer,
  files: filesReducer,
  filters: filtersReducer,
  messengers: messengersReducer,
  messages: messagesReducer,
  payments: paymentsReducer,
  patterns: patternsReducer,
});
