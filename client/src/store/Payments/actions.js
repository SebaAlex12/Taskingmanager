import {
  FETCHING_PAYMENTS,
  ADDING_PAYMENT,
  REMOVING_PAYMENT,
  UPDATING_PAYMENT
} from "./types";

export const fetchPayments = () => ({
  type: FETCHING_PAYMENTS
});
export const addPayment = data => ({
  type: ADDING_PAYMENT,
  data
});
export const updatePayment = data => ({
  type: UPDATING_PAYMENT,
  data
});
export const removePayment = contractorId => ({
  type: REMOVING_PAYMENT,
  contractorId
});
