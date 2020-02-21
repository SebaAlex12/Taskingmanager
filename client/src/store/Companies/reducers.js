import {
  FETCH_COMPANIES_SUCCESS,
  ADD_COMPANY_SUCCESS,
  REMOVE_COMPANY_SUCCESS,
  UPDATE_COMPANY_SUCCESS,
  COMPANIES_ERROR
} from "./types";

const initialState = {
  companies: [],
  errors: []
};

export const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: action.payload
      };
    case ADD_COMPANY_SUCCESS:
      return {
        ...state,
        companies: [...state.companies, action.payload]
      };
    case REMOVE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.filter(
          company => company.id !== action.payload
        )
      };
    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.map(company => {
          return company._id === action.payload._id ? action.payload : company;
        })
      };
    case COMPANIES_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
