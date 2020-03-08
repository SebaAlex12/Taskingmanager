import {
  FETCH_PAYMENTS_SUCCESS,
  FETCH_NOT_USED_PATTERNS_SUCCESS,
  FETCH_LAST_INSERT_INVOICE_SUCCESS,
  FETCH_LAST_INSERT_PATTERN_SUCCESS,
  ADD_PAYMENT_SUCCESS,
  REMOVE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_SUCCESS,
  PAYMENTS_ERROR
} from "./types";

const initialState = {
  payments: [],
  lastInsertInvoice: null,
  lastInsertPattern: null,
  errors: []
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: action.payload
      };
    case FETCH_NOT_USED_PATTERNS_SUCCESS:
      return {
        ...state,
        payments: action.payload
      };
    case FETCH_LAST_INSERT_INVOICE_SUCCESS:
      return {
        ...state,
        lastInsertInvoice: action.payload
      };
    case FETCH_LAST_INSERT_PATTERN_SUCCESS:
      return {
        ...state,
        lastInsertPattern: action.payload
      };
    case ADD_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: [...state.payments, action.payload]
      };
    case REMOVE_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: state.payments.filter(
          payment => payment._id !== action.payload._id
        )
      };
    case UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: state.payments.map(payment => {
          return payment._id === action.payload._id ? action.payload : payment;
        })
      };
    case PAYMENTS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
