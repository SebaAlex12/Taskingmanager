import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCHING_CATALOGS,
  FETCH_CATALOGS_SUCCESS,
  ADDING_CATALOG,
  ADD_CATALOG_SUCCESS,
  REMOVING_CATALOG,
  REMOVE_CATALOG_SUCCESS,
  UPDATING_CATALOG,
  UPDATE_CATALOG_SUCCESS,
  CATALOGS_ERROR,
} from "./types";

import { UPDATE_MESSAGES_SUCCESS } from "../Messages/types";

function* fetchCatalogsAsync() {
  try {
    const graph = {
      query: `
        query {
          fetchCatalogs{
            _id
            url
            title
            description
            login
            password
            multicode
            price
            websites
            rank
            status
            createdAt
          }
        }
    `,
    };

    const res = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );

    yield put({
      type: FETCH_CATALOGS_SUCCESS,
      payload: res.data.data.fetchCatalogs,
    });
  } catch (error) {
    yield put({ type: CATALOGS_ERROR, payload: error });
  }
}

export function* fetchCatalogsWatcher() {
  yield takeEvery(FETCHING_CATALOGS, fetchCatalogsAsync);
}
function* addCatalogAsync(action) {
  try {
    const data = action.data;
    const catalogInput = {
      url: data.url,
      title: data.title,
      description: data.description,
      login: data.login,
      password: data.password,
      multicode: data.multicode,
      price: data.price,
      websites: JSON.stringify(data.websites),
      rank: data.rank,
      status: data.status,
      createdAt: data.createdAt,
    };

    const graph = {
      query: `mutation {
      addCatalog(catalogInput: {
      url: "${catalogInput.url}",
      title: "${catalogInput.title}",
      description: "${catalogInput.description}",
      login: "${catalogInput.login}",
      password: "${catalogInput.password}",
      multicode: "${catalogInput.multicode}",
      price: "${catalogInput.price}",
      websites: """${catalogInput.websites}""",
      rank: "${catalogInput.rank}",
      status: "${catalogInput.status}",
      createdAt: "${catalogInput.createdAt}",
    }){
        _id
        url,
        title,
        description,
        login,
        password,
        multicode,
        price,
        websites,
        rank,
        status,
        createdAt,
        errors{
          path
          message
        }
      },
    }`,
    };
    console.log("graph", graph);
    const catalogData = yield call(
      [axios, axios.post],
      "/graphql",
      JSON.stringify(graph),
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("saga res", catalogData);
    const response = catalogData.data.data.addCatalog;

    if (response.errors) {
      yield put({ type: CATALOGS_ERROR, payload: response.errors });
      yield put({
        type: UPDATE_MESSAGES_SUCCESS,
        payload: { errors: response.errors },
      });
    } else {
      yield put({
        type: ADD_CATALOG_SUCCESS,
        payload: response,
      });
      yield put({
        type: UPDATE_MESSAGES_SUCCESS,
        payload: { success: [{ message: "Katalog został dodany" }] },
      });
    }
  } catch (error) {
    yield put({ type: CATALOGS_ERROR, payload: error });
  }
}

export function* addCatalogWatcher() {
  yield takeEvery(ADDING_CATALOG, addCatalogAsync);
}

function* updateCatalogAsync(action) {
  // try {
  const data = action.data;

  const catalogInput = {
    _id: data._id,
    url: data.url ? data.url : "",
    title: data.title ? data.title : "",
    description: data.description ? data.description : "",
    login: data.login ? data.login : "",
    password: data.password ? data.password : "",
    multicode: data.multicode ? data.multicode : "",
    price: data.price ? data.price : "",
    websites: data.websites ? JSON.stringify(data.websites) : "",
    rank: data.rank ? data.rank : "",
    status: data.status ? data.status : "",
    createdAt: data.createdAt ? data.createdAt : "",
  };

  const graph = {
    query: `mutation {
      updateCatalog(catalogInput: {
        _id: "${catalogInput._id}",
        url: "${catalogInput.url}",
        title: "${catalogInput.title}",
        description: "${catalogInput.description}",
        login: "${catalogInput.login}",
        password: "${catalogInput.password}",
        multicode: "${catalogInput.multicode}",
        price: "${catalogInput.price}",
        websites: """${catalogInput.websites}""",
        rank: "${catalogInput.rank}",
        status: "${catalogInput.status}",
        createdAt: "${catalogInput.createdAt}",}){
            _id
            url,
            title,
            description,
            login,
            password,
            multicode,
            price,
            websites,
            rank,
            status,
            createdAt,
      }
    }`,
  };
  // console.log(graph);
  const catalogData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );

  const response = catalogData.data.data.updateCatalog;
  if (response.errors) {
    yield put({ type: CATALOGS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({
      type: UPDATE_CATALOG_SUCCESS,
      payload: response,
    });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: {
        success: [{ message: "Dane katalogu zostały zaktualizowane" }],
      },
    });
  }
}

export function* updateCatalogWatcher() {
  yield takeEvery(UPDATING_CATALOG, updateCatalogAsync);
}

function* removeCatalogAsync(action) {
  const { catalogId } = action;
  console.log("saga data", action);
  const graph = {
    query: `mutation {
      removeCatalog(catalogId: "${catalogId}"){
        _id
        errors{
          path
          message
        }
      }
    }`,
  };

  const catalogData = yield call(
    [axios, axios.post],
    "/graphql",
    JSON.stringify(graph),
    { headers: { "Content-Type": "application/json" } }
  );
  const response = catalogData.data.data.removeCatalog;

  if (response.errors) {
    yield put({ type: CATALOGS_ERROR, payload: response.errors });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { errors: response.errors },
    });
  } else {
    yield put({ type: REMOVE_CATALOG_SUCCESS, payload: response });
    yield put({
      type: UPDATE_MESSAGES_SUCCESS,
      payload: { success: [{ message: "Katalog został usunięty" }] },
    });
  }
}

export function* removeCatalogWatcher() {
  yield takeEvery(REMOVING_CATALOG, removeCatalogAsync);
  // yield takeEvery(REMOVING_COMMENTS_RELATIVE_CATALOG)
}
