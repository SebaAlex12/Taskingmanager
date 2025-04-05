import {
    FETCHING_REPORTS_PAYMENTS,
    ADDING_REPORT_PAYMENTS,
    REMOVING_REPORT_PAYMENTS,
    UPDATING_REPORT_PAYMENTS,
  } from "./types";
  export const fetchReportsPayments = data => ({
    type: FETCHING_REPORTS_PAYMENTS,
    data
  });
  export const addReportPayments = data => ({
    type: ADDING_REPORT_PAYMENTS,
    data
  });
  export const updateReportPayments = data => ({
    type: UPDATING_REPORT_PAYMENTS,
    data
  });
  export const removeReportPayments = id => ({
    type: REMOVING_REPORT_PAYMENTS,
    id
  });