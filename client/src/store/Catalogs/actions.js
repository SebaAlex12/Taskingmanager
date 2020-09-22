import {
  FETCHING_CATALOGS,
  ADDING_CATALOG,
  REMOVING_CATALOG,
  UPDATING_CATALOG,
} from "./types";

export const fetchCatalogs = () => ({
  type: FETCHING_CATALOGS,
});
export const addCatalog = (data) => ({
  type: ADDING_CATALOG,
  data,
});
export const updateCatalog = (data) => ({
  type: UPDATING_CATALOG,
  data,
});
export const removeCatalog = (catalogId) => ({
  type: REMOVING_CATALOG,
  catalogId,
});
