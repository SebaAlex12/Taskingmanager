import {
  FETCHING_LOGGED_USER,
  FETCHING_USERS,
  REGISTERING_USER,
  LOGGING_USER,
  LOGGING_OUT_USER
} from "./types";

export const loginUser = (data: any) => ({
  type: LOGGING_USER,
  data
});

export const registerUser = (data: any) => ({
  type: REGISTERING_USER,
  data
});

export const fetchLoggedUser = (data: any) => ({
  type: FETCHING_LOGGED_USER,
  data
});

export const fetchUsers = () => ({
  type: FETCHING_USERS
});

export const removeUser = () => ({});

export const updateUser = () => ({});

export const logoutUser = () => ({
  type: LOGGING_OUT_USER
});
