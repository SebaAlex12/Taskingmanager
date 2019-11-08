import { FETCHING_FILTERS, UPDATING_FILTER } from "./types";

export const fetchFilters = () => ({
  type: FETCHING_FILTERS
});
export const updateFilter = data => ({
  type: UPDATING_FILTER,
  data
});
