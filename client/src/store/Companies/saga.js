import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_COMPANIES,
  FETCHING_COMPANIES_BY_LOGGED_USER_COMPANIES,
  FETCH_COMPANIES_SUCCESS,
  ADDING_COMPANY,
  ADD_COMPANY_SUCCESS,
  REMOVING_COMPANY,
  REMOVE_COMPANY_SUCCESS,
  UPDATING_COMPANY,
  UPDATE_COMPANY_SUCCESS,
  COMPANIES_ERROR
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchCompaniesAsync() {
  try {
    const graph = {
      query: `
        query {
          fetchCompanies{
            _id
            name,
            address,
            NIP,
            website,
            phone,
            fax,
            mail,
            bankName,
            bankAcount,
            description
          }
        }
    `
    };

    const res = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_COMPANIES_SUCCESS,
      payload: res.data.data.fetchCompanies
    });
  } catch (error) {
    yield put({ type: COMPANIES_ERROR, payload: error });
  }
}

export function* fetchCompaniesWatcher() {
  yield takeEvery(FETCHING_COMPANIES, fetchCompaniesAsync);
}

function* fetchCompaniesByLoggedUserCompaniesAsync(action) {
  const data = action.data;
  try {
    const graph = {
      query: `
        query {
          fetchCompaniesByLoggedUserCompanies(companys:"${data}"){
            _id
            name,
            address,
            NIP,
            website,
            phone,
            fax,
            mail,
            bankName,
            bankAcount,
            description
          }
        }
    `
    };

    const res = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );
    yield put({
      type: FETCH_COMPANIES_SUCCESS,
      payload: res.data.data.fetchCompaniesByLoggedUserCompanies
    });
  } catch (error) {
    yield put({ type: COMPANIES_ERROR, payload: error });
  }
}

export function* fetchCompaniesByLoggedUserCompaniesWatcher() {
  yield takeEvery(
    FETCHING_COMPANIES_BY_LOGGED_USER_COMPANIES,
    fetchCompaniesByLoggedUserCompaniesAsync
  );
}

function* addCompanyAsync(action) {
  try {
    const data = action.data;
    const companyInput = {
      name: data.name,
      address: data.address,
      NIP: data.NIP,
      website: data.website,
      phone: data.phone,
      fax: data.fax,
      mail: data.mail,
      bankName: data.bankName,
      bankAcount: data.bankAcount,
      description: data.description
    };

    const graph = {
      query: `mutation {
      addCompany(companyInput: {
      name: "${companyInput.name}",
      address: "${companyInput.address}",
      NIP: "${companyInput.NIP}",
      website: "${companyInput.website}",
      phone: "${companyInput.phone}",
      fax: "${companyInput.fax}",
      mail: "${companyInput.mail}",
      bankName: "${companyInput.bankName}",
      bankAcount: "${companyInput.bankAcount}",
      description: "${companyInput.description}"}){
        _id
        name,
        address,
        NIP,
        website,
        phone,
        fax,
        mail,
        bankName,
        bankAcount,
        description,
        errors{
          path
          message
        }
      },
    }`
    };

    const companyData = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );

    const response = companyData.data.data.addCompany;

    if (response.errors) {
      yield put({ type: COMPANIES_ERROR, payload: response.errors });
      yield put({
        type: UPDATE_MESSAGES_SUCCESS,
        payload: { errors: response.errors }
      });
    } else {
      localStorage.setItem("companyName", response.name);
      yield put({
        type: ADD_COMPANY_SUCCESS,
        payload: response
      });
      yield put({
        type: UPDATE_MESSAGES_SUCCESS,
        payload: { success: [{ message: "Firma została dodana" }] }
      });
    }
  } catch (error) {
    yield put({ type: COMPANIES_ERROR, payload: error });
  }
}

export function* addCompanyWatcher() {
  yield takeEvery(ADDING_COMPANY, addCompanyAsync);
}

function* updateCompanyAsync(action) {
  // try {
  const data = action.data;

  const companyInput = {
    _id: data._id,
    name: data.name ? data.name : "",
    address: data.address ? data.address : "",
    NIP: data.NIP ? data.NIP : "",
    website: data.website ? data.website : "",
    phone: data.phone ? data.phone : "",
    fax: data.fax ? data.fax : "",
    mail: data.mail ? data.mail : "",
    bankName: data.bankName ? data.bankName : "",
    bankAcount: data.bankAcount ? data.bankAcount : "",
    description: data.description ? data.description : ""
  };

  const graph = {
    query: `mutation {
      updateCompany(companyInput: {
        _id: "${companyInput._id}",
        name: "${companyInput.name}",
        address: "${companyInput.address}",
        NIP: "${companyInput.NIP}",
        website: "${companyInput.website}",
        phone: "${companyInput.phone}",
        fax: "${companyInput.fax}",
        mail: "${companyInput.mail}",
        bankName: "${companyInput.bankName}",
        bankAcount: "${companyInput.bankAcount}",
        description: "${companyInput.description}",}){
        _id
        name,
        address,
        NIP,
        website,
        phone,
        fax,
        mail,
        bankName,
        bankAcount,
        description
      }
    }`
  };
  const companyData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = companyData.data.data.updateCompany;
  if (response.errors) {
    yield put({ type: COMPANIES_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors }
    });
  } else {
    yield put({
      type: UPDATE_COMPANY_SUCCESS,
      payload: response
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Dane firmy zostały zaktualizowane" }] }
    });
  }
}

export function* updateCompanyWatcher() {
  yield takeEvery(UPDATING_COMPANY, updateCompanyAsync);
}

function* removeCompanyAsync(action) {
  try {
    yield put({ type: REMOVE_COMPANY_SUCCESS, payload: action.companyId });
  } catch (error) {
    yield put({ type: COMPANIES_ERROR, payload: error });
  }
}

export function* removeCompanyWatcher() {
  yield takeEvery(REMOVING_COMPANY, removeCompanyAsync);
}
