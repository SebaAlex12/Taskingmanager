import {
  FETCH_PAYMENTS_SUCCESS,
  ADD_PAYMENT_SUCCESS,
  REMOVE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_SUCCESS,
  PAYMENTS_ERROR
} from "./types";

const initialState = {
  payments: [],
  errors: []
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: action.payload
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
          payment => payment.id !== action.payload
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
