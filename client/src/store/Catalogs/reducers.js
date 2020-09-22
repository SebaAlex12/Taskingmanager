import {
  FETCH_CATALOGS_SUCCESS,
  ADD_CATALOG_SUCCESS,
  REMOVE_CATALOG_SUCCESS,
  UPDATE_CATALOG_SUCCESS,
  CATALOGS_ERROR,
} from "./types";

const initialState = {
  catalogs: [],
  errors: [],
};

export const catalogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATALOGS_SUCCESS:
      return {
        ...state,
        catalogs: action.payload,
      };
    case ADD_CATALOG_SUCCESS:
      return {
        ...state,
        catalogs: [...state.catalogs, action.payload],
      };
    case REMOVE_CATALOG_SUCCESS:
      return {
        ...state,
        catalogs: state.catalogs.filter(
          (catalog) => catalog.id !== action.payload
        ),
      };
    case UPDATE_CATALOG_SUCCESS:
      return {
        ...state,
        catalogs: state.catalogs.map((catalog) => {
          return catalog._id === action.payload._id ? action.payload : catalog;
        }),
      };
    case CATALOGS_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
