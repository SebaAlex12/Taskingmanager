import {
  FETCHING_MESSENGERS_BY_NAME,
  UPDATING_MESSENGER,
  ADDING_MESSENGER
} from "./types";

export const fetchMessengersByName = data => ({
  type: FETCHING_MESSENGERS_BY_NAME,
  data
});
export const addMessenger = data => ({
  type: ADDING_MESSENGER,
  data
});
export const updateMessenger = data => ({
  type: UPDATING_MESSENGER,
  data
});
