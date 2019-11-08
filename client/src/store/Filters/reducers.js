import {
  // FETCH_FILTERS_SUCCESS,
  UPDATE_FILTER_SUCCESS,
  FILTERS_ERROR
} from "./types";

import { priorities, statuses } from "../ini";

const initialState = {
  filters: {
    priorities,
    statuses,
    projectName: "",
    responsiblePerson: ""
  },
  errors: []
};

export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    // case FETCH_FILTERS_SUCCESS:
    //   return {
    //     ...state,
    //     filters: action.payload
    //   };
    case UPDATE_FILTER_SUCCESS:
      return {
        ...state,
        filters: action.payload
      };
    case FILTERS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
