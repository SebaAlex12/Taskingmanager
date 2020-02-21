import {
  FETCHING_COMPANIES,
  ADDING_COMPANY,
  REMOVING_COMPANY,
  UPDATING_COMPANY,
  FETCHING_COMPANIES_BY_LOGGED_USER_COMPANIES
} from "./types";

export const fetchCompanies = () => ({
  type: FETCHING_COMPANIES
});
export const fetchCompaniesByLoggedUserCompanies = data => ({
  type: FETCHING_COMPANIES_BY_LOGGED_USER_COMPANIES,
  data
});
export const addCompany = data => ({
  type: ADDING_COMPANY,
  data
});
export const updateCompany = data => ({
  type: UPDATING_COMPANY,
  data
});
export const removeCompany = companyId => ({
  type: REMOVING_COMPANY,
  companyId
});
