import {
  FETCHING_CONTRACTORS,
  ADDING_CONTRACTOR,
  REMOVING_CONTRACTOR,
  UPDATING_CONTRACTOR,
  FETCHING_CONTRACTORS_BY_LOGGED_USER_CONTRACTORS
} from "./types";

export const fetchContractors = () => ({
  type: FETCHING_CONTRACTORS
});
export const fetchContractorsByLoggedUserContractors = data => ({
  type: FETCHING_CONTRACTORS_BY_LOGGED_USER_CONTRACTORS,
  data
});
export const addContractor = data => ({
  type: ADDING_CONTRACTOR,
  data
});
export const updateContractor = data => ({
  type: UPDATING_CONTRACTOR,
  data
});
export const removeContractor = contractorId => ({
  type: REMOVING_CONTRACTOR,
  contractorId
});
