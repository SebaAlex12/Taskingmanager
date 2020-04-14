import { FETCHING_USERS_HISTORY, ADDING_USER_HISTORY } from "./types";

export const fetchUsersHistory = (data) => ({
  type: FETCHING_USERS_HISTORY,
  data,
});
export const addUserHistory = (data) => ({
  type: ADDING_USER_HISTORY,
  data,
});
