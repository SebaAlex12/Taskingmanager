import { FETCHING_MESSAGES, UPDATING_MESSAGES } from "./types";

export const fetchMessages = () => ({
  type: FETCHING_MESSAGES
});
export const updateMessages = data => ({
  type: UPDATING_MESSAGES,
  data
});
