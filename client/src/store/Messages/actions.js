import {
  FETCHING_MESSAGES,
  UPDATING_MESSAGES,
  REMOVING_ALERT_MESSAGES,
  UPDATING_ALERT_MESSAGES
} from "./types";

export const fetchMessages = () => ({
  type: FETCHING_MESSAGES
});
export const updateMessages = data => ({
  type: UPDATING_MESSAGES,
  data
});
export const updateAlertMessages = data => ({
  type: UPDATING_ALERT_MESSAGES,
  data
});
export const removeAlertMessages = data => ({
  type: REMOVING_ALERT_MESSAGES,
  data
});
