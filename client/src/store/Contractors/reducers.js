import {
  FETCH_CONTRACTORS_SUCCESS,
  ADD_CONTRACTOR_SUCCESS,
  REMOVE_CONTRACTOR_SUCCESS,
  UPDATE_CONTRACTOR_SUCCESS,
  CONTRACTORS_ERROR
} from "./types";

const initialState = {
  contractors: [],
  errors: []
};

export const contractorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACTORS_SUCCESS:
      return {
        ...state,
        contractors: action.payload
      };
    case ADD_CONTRACTOR_SUCCESS:
      return {
        ...state,
        contractors: [...state.contractors, action.payload]
      };
    case REMOVE_CONTRACTOR_SUCCESS:
      return {
        ...state,
        contractors: state.contractors.filter(
          contractor => contractor.id !== action.payload
        )
      };
    case UPDATE_CONTRACTOR_SUCCESS:
      return {
        ...state,
        contractors: state.contractors.map(contractor => {
          return contractor._id === action.payload._id
            ? action.payload
            : contractor;
        })
      };
    case CONTRACTORS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
