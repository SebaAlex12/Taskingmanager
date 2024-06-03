import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_CONTRACTORS,
  FETCHING_CONTRACTORS_BY_LOGGED_USER_CONTRACTORS,
  FETCH_CONTRACTORS_SUCCESS,
  ADDING_CONTRACTOR,
  ADD_CONTRACTOR_SUCCESS,
  REMOVING_CONTRACTOR,
  REMOVE_CONTRACTOR_SUCCESS,
  UPDATING_CONTRACTOR,
  UPDATE_CONTRACTOR_SUCCESS,
  CONTRACTORS_ERROR
} from "./types";

// import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";
import { apiUrl } from '../../store/ini';

function* fetchContractorsAsync() {
  try {
    const graph = {
      query: `
        query {
          fetchContractors{
            _id
            name,
            address,
            NIP,
            KRS
            website,
            phone,
            fax,
            mail,
            description
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
      type: FETCH_CONTRACTORS_SUCCESS,
      payload: res.data.data.fetchContractors
    });
  } catch (error) {
    yield put({ type: CONTRACTORS_ERROR, payload: error });
  }
}

export function* fetchContractorsWatcher() {
  yield takeEvery(FETCHING_CONTRACTORS, fetchContractorsAsync);
}

function* fetchContractorsByLoggedUserContractorsAsync(action) {
  const data = action.data;
  try {
    const graph = {
      query: `
        query {
          fetchContractorsByLoggedUserContractors(contractors:"${data}"){
            _id
            name,
            address,
            NIP,
            KRS,
            website,
            phone,
            fax,
            mail,
            description
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
      type: FETCH_CONTRACTORS_SUCCESS,
      payload: res.data.data.fetchContractorsByLoggedUserContractors
    });
  } catch (error) {
    yield put({ type: CONTRACTORS_ERROR, payload: error });
  }
}

export function* fetchContractorsByLoggedUserContractorsWatcher() {
  yield takeEvery(
    FETCHING_CONTRACTORS_BY_LOGGED_USER_CONTRACTORS,
    fetchContractorsByLoggedUserContractorsAsync
  );
}

function* addContractorAsync(action) {
  // try {
  const data = action.data;
  const contractorInput = {
    name: data.name,
    address: data.address,
    NIP: data.NIP,
    KRS: data.KRS,
    website: data.website,
    phone: data.phone,
    fax: data.fax,
    mail: data.mail,
    description: data.description
  };

  const graph = {
    query: `mutation {
      addContractor(contractorInput: {
      name: "${contractorInput.name}",
      address: "${contractorInput.address}",
      NIP: "${contractorInput.NIP}",
      KRS: "${contractorInput.KRS}",
      website: "${contractorInput.website}",
      phone: "${contractorInput.phone}",
      fax: "${contractorInput.fax}",
      mail: "${contractorInput.mail}",
      description: "${contractorInput.description}"}){
        _id
        name,
        address,
        NIP,
        KRS,
        website,
        phone,
        fax,
        mail,
        description
      }
    }`
  };

  const contractorData = yield call(
    [axios, axios.post],
     apiUrl + "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = contractorData.data.data.addContractor;
  if (response.errors) {
    yield put({ type: CONTRACTORS_ERROR, payload: response.errors });
    // yield put({
    //   type: UPDATE_MESSAGES_SUCCESS,
    //   payload: { errors: response.errors }
    // });
  } else {
    yield put({
      type: ADD_CONTRACTOR_SUCCESS,
      payload: response
    });
    // yield put({
    //   type: UPDATE_MESSAGES_SUCCESS,
    //   payload: { success: [{ message: "Kontrahent został dodany" }] }
    // });
  }
}

export function* addContractorWatcher() {
  yield takeEvery(ADDING_CONTRACTOR, addContractorAsync);
}

function* updateContractorAsync(action) {
  // try {
  const data = action.data;

  const contractorInput = {
    _id: data._id,
    name: data.name ? data.name : "",
    address: data.address ? data.address : "",
    NIP: data.NIP ? data.NIP : "",
    KRS: data.KRS ? data.KRS : "",
    website: data.website ? data.website : "",
    phone: data.phone ? data.phone : "",
    fax: data.fax ? data.fax : "",
    mail: data.mail ? data.mail : "",
    description: data.description ? data.description : ""
  };

  const graph = {
    query: `mutation {
      updateContractor(contractorInput: {
        _id: "${contractorInput._id}",
        name: "${contractorInput.name}",
        address: "${contractorInput.address}",
        NIP: "${contractorInput.NIP}",
        KRS: "${contractorInput.KRS}",
        website: "${contractorInput.website}",
        phone: "${contractorInput.phone}",
        fax: "${contractorInput.fax}",
        mail: "${contractorInput.mail}",
        description: "${contractorInput.description}",}){
        _id
        name,
        address,
        NIP,
        KRS,
        website,
        phone,
        fax,
        mail,
        description
      }
    }`
  };
  const contractorData = yield call(
    [axios, axios.post],
     apiUrl + "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = contractorData.data.data.updateContractor;
  if (response.errors) {
    yield put({ type: CONTRACTORS_ERROR, payload: response.errors });
    // yield put({
    //   type: UPDATE_MESSAGES_SUCCESS,
    //   payload: { errors: response.errors }
    // });
  } else {
    yield put({
      type: UPDATE_CONTRACTOR_SUCCESS,
      payload: response
    });
    // yield put({
    //   type: UPDATE_MESSAGES_SUCCESS,
    //   payload: {
    //     success: [{ message: "Dane kotahenta zostały zaktualizowane" }]
    //   }
    // });
  }
}

export function* updateContractorWatcher() {
  yield takeEvery(UPDATING_CONTRACTOR, updateContractorAsync);
}

function* removeContractorAsync(action) {
  try {
    yield put({
      type: REMOVE_CONTRACTOR_SUCCESS,
      payload: action.contractorId
    });
  } catch (error) {
    yield put({ type: CONTRACTORS_ERROR, payload: error });
  }
}

export function* removeContractorWatcher() {
  yield takeEvery(REMOVING_CONTRACTOR, removeContractorAsync);
}
