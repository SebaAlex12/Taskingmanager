import { FETCHING_SETTINGS, UPDATING_SETTINGS } from "./types";

export const fetchSettings = data => ({
  type: FETCHING_SETTINGS,
  data
});

export const updateSettings = data => ({
  type: UPDATING_SETTINGS,
  data
});
