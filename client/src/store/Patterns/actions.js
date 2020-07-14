import {
  FETCHING_PATTERNS,
  ADDING_PATTERN,
  REMOVING_PATTERN,
  UPDATING_PATTERN,
} from "./types";

export const fetchPatterns = () => ({
  type: FETCHING_PATTERNS,
});
export const addPattern = (data) => ({
  type: ADDING_PATTERN,
  data,
});
export const updatePattern = (data) => ({
  type: UPDATING_PATTERN,
  data,
});
export const removePattern = (data) => ({
  type: REMOVING_PATTERN,
  data,
});
