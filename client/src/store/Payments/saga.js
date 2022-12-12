import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_PAYMENTS,
  FETCH_PAYMENTS_SUCCESS,
  FETCHING_NOT_USED_PATTERNS,
  FETCH_NOT_USED_PATTERNS_SUCCESS,
  FETCHING_LAST_INSERT_INVOICE,
  FETCH_LAST_INSERT_INVOICE_SUCCESS,
  FETCHING_LAST_INSERT_PATTERN,
  FETCH_LAST_INSERT_PATTERN_SUCCESS,
  ADDING_PAYMENT,
  ADD_PAYMENT_SUCCESS,
  REMOVING_PAYMENT,
  REMOVE_PAYMENT_SUCCESS,
  UPDATING_PAYMENT,
  UPDATE_PAYMENT_SUCCESS,
  PAYMENTS_ERROR
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";
import { apiUrl } from '../../store/ini';

function* fetchPaymentsAsync(action) {
  try {
    const graph = {
      query: `
        query {
          fetchPayments(paymentInput: { paymentType: "${action.data.paymentType}" }){
            _id
            paymentNumber
            paymentMonth
            paymentYear
            paymentType
            paymentCycle
            companyName
            contractorName
            companyAddress
            contractorAddress
            companyNIP
            contractorNIP
            companyWebsite
            companyPhone
            contractorPhone
            companyMail
            contractorMail
            companyBankName
            companyBankAcount
            description
            netValue
            grossValue
            status
            paymentMethod
            termAt
            createdAt
          }
        }
    `
    };

    const res = yield call(
      [axios, axios.post],
       apiUrl + "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_PAYMENTS_SUCCESS,
      payload: res.data.data.fetchPayments
    });
  } catch (error) {
    yield put({ type: PAYMENTS_ERROR, payload: error });
  }
}

export function* fetchPaymentsWatcher() {
  yield takeEvery(FETCHING_PAYMENTS, fetchPaymentsAsync);
}

function* fetchNotUsedPatternsAsync(action) {
  try {
    const graph = {
      query: `
        query {
          fetchNotUsedPatterns(month: "${action.data.month}", year: "${action.data.year}"){
            _id
            paymentNumber
            paymentMonth
            paymentYear
            paymentType
            paymentCycle
            companyName
            contractorName
            companyAddress
            contractorAddress
            companyNIP
            contractorNIP
            companyWebsite
            companyPhone
            contractorPhone
            companyMail
            contractorMail
            companyBankName
            companyBankAcount
            description
            netValue
            grossValue
            status
            paymentMethod
            termAt
            createdAt
          }
        }
    `
    };
    const res = yield call(
      [axios, axios.post],
       apiUrl + "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );

    yield put({
      type: FETCH_NOT_USED_PATTERNS_SUCCESS,
      payload: res.data.data.fetchNotUsedPatterns
    });
  } catch (error) {
    yield put({ type: PAYMENTS_ERROR, payload: error });
  }
}

export function* fetchNotUsedPatternsWatcher() {
  yield takeEvery(FETCHING_NOT_USED_PATTERNS, fetchNotUsedPatternsAsync);
}

function* fetchLastInsertInvoiceAsync(action) {
  try {
    const graph = {
      query: `
        query {
          fetchLastInsertInvoice{
            _id
            paymentNumber
            paymentMonth
            paymentYear
            paymentType
            paymentCycle
            companyName
            contractorName
            companyAddress
            contractorAddress
            companyNIP
            contractorNIP
            companyWebsite
            companyPhone
            contractorPhone
            companyMail
            contractorMail
            companyBankName
            companyBankAcount
            description
            netValue
            grossValue
            status
            paymentMethod
            termAt
            createdAt
          }
        }
    `
    };

    const res = yield call(
      [axios, axios.post],
       apiUrl + "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_LAST_INSERT_INVOICE_SUCCESS,
      payload: res.data.data.fetchLastInsertInvoice
    });
  } catch (error) {
    yield put({ type: PAYMENTS_ERROR, payload: error });
  }
}

export function* fetchLastInsertInvoiceWatcher() {
  yield takeEvery(FETCHING_LAST_INSERT_INVOICE, fetchLastInsertInvoiceAsync);
}

function* fetchLastInsertPatternAsync(action) {
  try {
    const graph = {
      query: `
        query {
          fetchLastInsertPattern{
            _id
            paymentNumber
            paymentMonth
            paymentYear
            paymentType
            paymentCycle
            companyName
            contractorName
            companyAddress
            contractorAddress
            companyNIP
            contractorNIP
            companyWebsite
            companyPhone
            contractorPhone
            companyMail
            contractorMail
            companyBankName
            companyBankAcount
            description
            netValue
            grossValue
            status
            paymentMethod
            termAt
            createdAt
          }
        }
    `
    };

    const res = yield call(
      [axios, axios.post],
       apiUrl + "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_LAST_INSERT_PATTERN_SUCCESS,
      payload: res.data.data.fetchLastInsertPattern
    });
  } catch (error) {
    yield put({ type: PAYMENTS_ERROR, payload: error });
  }
}

export function* fetchLastInsertPatternWatcher() {
  yield takeEvery(FETCHING_LAST_INSERT_PATTERN, fetchLastInsertPatternAsync);
}

function* addPaymentAsync(action) {
  // try {
  const data = action.data;
  const paymentInput = {
    paymentNumber: data.paymentNumber,
    paymentMonth: data.paymentMonth,
    paymentYear: data.paymentYear,
    paymentType: data.paymentType,
    paymentCycle: data.paymentCycle,
    companyName: data.companyName,
    contractorName: data.contractorName,
    companyAddress: data.companyAddress,
    contractorAddress: data.contractorAddress,
    companyNIP: data.companyNIP,
    contractorNIP: data.contractorNIP,
    companyWebsite: data.companyWebsite,
    companyPhone: data.companyPhone,
    contractorPhone: data.contractorPhone,
    companyMail: data.companyMail,
    contractorMail: data.contractorMail,
    companyBankName: data.companyBankName,
    companyBankAcount: data.companyBankAcount,
    description: data.description,
    netValue: data.netValue,
    grossValue: data.grossValue,
    status: data.status,
    paymentMethod: data.paymentMethod,
    termAt: data.termAt,
    createdAt: data.createdAt
  };
  const graph = {
    query: `mutation {
      addPayment(paymentInput: {
        paymentNumber: "${paymentInput.paymentNumber}",
        paymentMonth: "${paymentInput.paymentMonth}",
        paymentYear: "${paymentInput.paymentYear}",
        paymentType: "${paymentInput.paymentType}",
        paymentCycle: "${paymentInput.paymentCycle}",
        companyName: "${paymentInput.companyName}",
        contractorName: "${paymentInput.contractorName}",
        companyAddress: "${paymentInput.companyAddress}",
        contractorAddress: "${paymentInput.contractorAddress}",
        companyNIP: "${paymentInput.companyNIP}",
        contractorNIP: "${paymentInput.contractorNIP}",
        companyWebsite: "${paymentInput.companyWebsite}",
        companyPhone: "${paymentInput.companyPhone}",
        contractorPhone: "${paymentInput.contractorPhone}",
        companyMail: "${paymentInput.companyMail}",
        contractorMail: "${paymentInput.contractorMail}",
        companyBankName: "${paymentInput.companyBankName}",
        companyBankAcount: "${paymentInput.companyBankAcount}",
        description: "${paymentInput.description}",
        netValue: "${paymentInput.netValue}",
        grossValue: "${paymentInput.grossValue}",
        status: "${paymentInput.status}",
        paymentMethod: "${paymentInput.paymentMethod}",
        termAt: "${paymentInput.termAt}",
        createdAt: "${paymentInput.createdAt}"}){
        _id
        paymentNumber,
        paymentMonth,
        paymentYear,
        paymentType,
        paymentCycle,
        companyName,
        contractorName,
        companyAddress,
        contractorAddress,
        companyNIP,
        contractorNIP,
        companyWebsite,
        companyPhone,
        contractorPhone,
        companyMail,
        contractorMail,
        companyBankName,
        companyBankAcount,
        description,
        netValue,
        grossValue,
        status,
        paymentMethod,
        termAt,
        createdAt
      }
    }`
  };
  const paymentData = yield call(
    [axios, axios.post],
     apiUrl + "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = paymentData.data.data.addPayment;

  if (response.errors) {
    yield put({ type: PAYMENTS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors }
    });
  } else {
    yield put({
      type: ADD_PAYMENT_SUCCESS,
      payload: response
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Płatność została dodana" }] }
    });
  }
}

export function* addPaymentWatcher() {
  yield takeEvery(ADDING_PAYMENT, addPaymentAsync);
}

function* updatePaymentAsync(action) {
  // try {
  const data = action.data;

  const paymentInput = {
    _id: data._id,
    paymentNumber: data.paymentNumber ? data.paymentNumber : "",
    paymentMonth: data.paymentMonth ? data.paymentMonth : "",
    paymentYear: data.paymentYear ? data.paymentYear : "",
    paymentType: data.paymentType ? data.paymentType : "",
    paymentCycle: data.paymentCycle ? data.paymentCycle : "",
    companyName: data.companyName ? data.companyName : "",
    contractorName: data.contractorName ? data.contractorName : "",
    companyAddress: data.companyAddress ? data.companyAddress : "",
    contractorAddress: data.contractorAddress ? data.contractorAddress : "",
    companyNIP: data.companyNIP ? data.companyNIP : "",
    contractorNIP: data.contractorNIP ? data.contractorNIP : "",
    companyWebsite: data.companyWebsite ? data.companyWebsite : "",
    companyPhone: data.companyPhone ? data.companyPhone : "",
    contractorPhone: data.contractorPhone ? data.contractorPhone : "",
    companyMail: data.companyMail ? data.companyMail : "",
    contractorMail: data.contractorMail ? data.contractorMail : "",
    companyBankName: data.companyBankName ? data.companyBankName : "",
    companyBankAcount: data.companyBankAcount ? data.companyBankAcount : "",
    description: data.description ? data.description : "",
    netValue: data.netValue ? data.netValue : "",
    grossValue: data.grossValue ? data.grossValue : "",
    status: data.status ? data.status : "",
    paymentMethod: data.paymentMethod ? data.paymentMethod : "",
    termAt: data.termAt ? data.termAt : "",
    createdAt: data.createdAt ? data.createdAt : ""
  };

  const graph = {
    query: `mutation {
      updatePayment(paymentInput: {
        _id: "${paymentInput._id}",
        paymentNumber: "${paymentInput.paymentNumber}",
        paymentMonth: "${paymentInput.paymentMonth}",
        paymentYear: "${paymentInput.paymentYear}",
        paymentType: "${paymentInput.paymentType}",
        paymentCycle: "${paymentInput.paymentCycle}",
        companyName: "${paymentInput.companyName}",
        contractorName: "${paymentInput.contractorName}",
        companyAddress: "${paymentInput.companyAddress}",
        contractorAddress: "${paymentInput.contractorAddress}",
        companyNIP: "${paymentInput.companyNIP}",
        contractorNIP: "${paymentInput.contractorNIP}",
        companyWebsite: "${paymentInput.companyWebsite}",
        companyPhone: "${paymentInput.companyPhone}",
        contractorPhone: "${paymentInput.contractorPhone}",
        companyMail: "${paymentInput.companyMail}",
        contractorMail: "${paymentInput.contractorMail}",
        companyBankName: "${paymentInput.companyBankName}",
        companyBankAcount: "${paymentInput.companyBankAcount}",
        description: "${paymentInput.description}",
        netValue: "${paymentInput.netValue}",
        grossValue: "${paymentInput.grossValue}",
        status: "${paymentInput.status}",
        paymentMethod: "${paymentInput.paymentMethod}",
        termAt: "${paymentInput.termAt}",
        createdAt: "${paymentInput.createdAt}"}){
        _id
        paymentNumber,
        paymentMonth,
        paymentYear,
        paymentType,
        paymentCycle,
        companyName,
        contractorName,
        companyAddress,
        contractorAddress,
        companyNIP,
        contractorNIP,
        companyWebsite,
        companyPhone,
        contractorPhone,
        companyMail,
        contractorMail,
        companyBankName,
        companyBankAcount,
        description,
        netValue,
        grossValue,
        status,
        paymentMethod,
        termAt,
        createdAt
      }
    }`
  };
  const paymentData = yield call(
    [axios, axios.post],
     apiUrl + "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = paymentData.data.data.updatePayment;
  if (response.errors) {
    yield put({ type: PAYMENTS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors }
    });
  } else {
    yield put({
      type: UPDATE_PAYMENT_SUCCESS,
      payload: response
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: {
        success: [{ message: "Dane płatności zostały zaktualizowane" }]
      }
    });
  }
}

export function* updatePaymentWatcher() {
  yield takeEvery(UPDATING_PAYMENT, updatePaymentAsync);
}

function* removePaymentAsync(action) {
  const paymentId = action.data;
  const graph = {
    query: `mutation {
      removePayment(paymentId: "${paymentId}"){
        _id
      }
    }`
  };

  const paymentData = yield call(
    [axios, axios.post],
     apiUrl + "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = paymentData.data.data.removePayment;

  if (response.errors) {
    yield put({ type: PAYMENTS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_PAYMENT_SUCCESS,
      payload: { errors: response.errors }
    });
  } else {
    yield put({ type: REMOVE_PAYMENT_SUCCESS, payload: response });
    yield put({
      type: UPDATE_PAYMENT_SUCCESS,
      payload: { success: [{ message: "Płatność została usunięta" }] }
    });
  }
}

export function* removePaymentWatcher() {
  yield takeEvery(REMOVING_PAYMENT, removePaymentAsync);
}
