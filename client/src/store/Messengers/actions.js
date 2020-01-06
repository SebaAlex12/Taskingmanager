import { FETCHING_MESSENGERS, UPDATING_MESSENGER } from "./types";

export const fetchMessengers = () => ({
  type: FETCHING_MESSENGERS
});
export const updateMessenger = data => ({
  type: UPDATING_MESSENGER,
  data
});
