import { fork, all } from "redux-saga/effects";
import { fetchFiltersWatcher, updateFilterWatcher } from "./Filters/saga";
import {
  addMessengerWatcher,
  fetchMessengersByNameWatcher,
  updateMessengerWatcher,
} from "./Messengers/saga";
import {
  updateMessagesWatcher,
  updateAlertMessagesWatcher,
  removeAlertMessagesWatcher,
  fetchMessagesWatcher,
} from "./Messages/saga";
import {
  fetchCalendarsWatcher,
  addCalendarWatcher,
  updateCalendarWatcher,
} from "./Calendar/saga";
import {
  fetchContractorsWatcher,
  addContractorWatcher,
  updateContractorWatcher,
  removeContractorWatcher,
} from "./Contractors/saga";
import {
  fetchCompaniesWatcher,
  fetchCompaniesByLoggedUserCompaniesWatcher,
  addCompanyWatcher,
  updateCompanyWatcher,
  removeCompanyWatcher,
} from "./Companies/saga";
import {
  fetchTasksWatcher,
  fetchTasksByLoggedUserProjectsWatcher,
  addTaskWatcher,
  updateTaskWatcher,
  removeTaskWatcher,
  sendMailingTaskWatcher,
} from "./Tasks/saga";
import {
  fetchCommentsWatcher,
  addCommentWatcher,
  removeCommentsByTaskIdWatcher,
} from "./Comments/saga";
import { addMailWatcher, fetchMailsWatcher } from "./Mails/saga";
import { fetchSettingsWatcher, updateSettingWatcher } from "./Settings/saga";
import {
  loginUserWatcher,
  registerUserWatcher,
  updateUserWatcher,
  fetchLoggedUserWatcher,
  fetchUsersWatcher,
  fetchUsersByLoggedUserProjectsWatcher,
  logoutUserWatcher,
} from "./Users/saga";
import {
  fetchUsersHistoryWatcher,
  addUserHistoryWatcher,
} from "./UsersHistory/saga";
import {
  fetchProjectsWatcher,
  fetchProjectsByLoggedUserProjectsWatcher,
  addProjectWatcher,
  updateProjectWatcher,
  removeProjectWatcher,
} from "./Projects/saga";
import {
  fetchFilesWatcher,
  addFileWatcher,
  removeFileWatcher,
} from "./Files/saga";
import {
  fetchPaymentsWatcher,
  fetchNotUsedPatternsWatcher,
  fetchLastInsertInvoiceWatcher,
  fetchLastInsertPatternWatcher,
  addPaymentWatcher,
  updatePaymentWatcher,
  removePaymentWatcher,
} from "./Payments/saga";
import {
  fetchPatternsWatcher,
  addPatternWatcher,
  updatePatternWatcher,
  removePatternWatcher,
} from "./Patterns/saga";

export default function* rootSaga() {
  yield all([
    fork(fetchSettingsWatcher),
    fork(updateSettingWatcher),
    fork(addMessengerWatcher),
    fork(updateMessagesWatcher),
    fork(updateAlertMessagesWatcher),
    fork(removeAlertMessagesWatcher),
    fork(fetchMessagesWatcher),
    fork(fetchCalendarsWatcher),
    fork(addCalendarWatcher),
    fork(updateCalendarWatcher),
    fork(fetchContractorsWatcher),
    fork(addContractorWatcher),
    fork(updateContractorWatcher),
    fork(removeContractorWatcher),
    fork(fetchCompaniesWatcher),
    fork(fetchCompaniesByLoggedUserCompaniesWatcher),
    fork(addCompanyWatcher),
    fork(updateCompanyWatcher),
    fork(removeCompanyWatcher),
    fork(loginUserWatcher),
    fork(registerUserWatcher),
    fork(updateUserWatcher),
    fork(fetchLoggedUserWatcher),
    fork(fetchUsersWatcher),
    fork(fetchUsersByLoggedUserProjectsWatcher),
    fork(logoutUserWatcher),
    fork(fetchTasksWatcher),
    fork(fetchTasksByLoggedUserProjectsWatcher),
    fork(sendMailingTaskWatcher),
    fork(addTaskWatcher),
    fork(fetchCommentsWatcher),
    fork(addCommentWatcher),
    fork(addMailWatcher),
    fork(fetchMailsWatcher),
    fork(removeCommentsByTaskIdWatcher),
    fork(updateTaskWatcher),
    fork(removeTaskWatcher),
    fork(fetchUsersHistoryWatcher),
    fork(addUserHistoryWatcher),
    fork(fetchProjectsWatcher),
    fork(fetchProjectsByLoggedUserProjectsWatcher),
    fork(addProjectWatcher),
    fork(updateProjectWatcher),
    fork(removeProjectWatcher),
    fork(fetchFiltersWatcher),
    fork(updateFilterWatcher),
    fork(fetchMessengersByNameWatcher),
    fork(updateMessengerWatcher),
    fork(fetchFilesWatcher),
    fork(addFileWatcher),
    fork(removeFileWatcher),
    fork(fetchPaymentsWatcher),
    fork(fetchNotUsedPatternsWatcher),
    fork(fetchLastInsertInvoiceWatcher),
    fork(fetchLastInsertPatternWatcher),
    fork(addPaymentWatcher),
    fork(updatePaymentWatcher),
    fork(removePaymentWatcher),
    fork(fetchPatternsWatcher),
    fork(addPatternWatcher),
    fork(updatePatternWatcher),
    fork(removePatternWatcher),
  ]);
}
