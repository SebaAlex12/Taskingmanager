import {
  FETCHING_PAYMENTS,
  FETCHING_NOT_USED_PATTERNS,
  FETCHING_LAST_INSERT_INVOICE,
  FETCHING_LAST_INSERT_PATTERN,
  ADDING_PAYMENT,
  REMOVING_PAYMENT,
  UPDATING_PAYMENT
} from "./types";

export const fetchPayments = data => ({
  type: FETCHING_PAYMENTS,
  data
});
export const fetchNotUsedPatterns = data => ({
  type: FETCHING_NOT_USED_PATTERNS,
  data
});
export const fetchLastInsertInvoice = () => ({
  type: FETCHING_LAST_INSERT_INVOICE
});
export const fetchLastInsertPattern = () => ({
  type: FETCHING_LAST_INSERT_PATTERN
});
export const addPayment = data => ({
  type: ADDING_PAYMENT,
  data
});
export const updatePayment = data => ({
  type: UPDATING_PAYMENT,
  data
});
export const removePayment = data => ({
  type: REMOVING_PAYMENT,
  data
});
