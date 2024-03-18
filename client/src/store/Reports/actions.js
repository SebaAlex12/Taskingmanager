import {
    FETCHING_REPORTS,
    ADDING_REPORT,
    REMOVING_REPORT,
    UPDATING_REPORT,
  } from "./types";
  export const fetchReports = data => ({
    type: FETCHING_REPORTS,
    data
  });
  export const addReport = data => ({
    type: ADDING_REPORT,
    data
  });
  export const updateReport = data => ({
    type: UPDATING_REPORT,
    data
  });
  export const removeReport = data => ({
    type: REMOVING_REPORT,
    data
  });