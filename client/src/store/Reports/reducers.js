import { FETCH_REPORTS_SUCCESS, ADD_REPORT_SUCCESS } from "./types";

const initialState = {
    reports:[],
    errors:[]
}

export const reportsReducer = (state = initialState,action) => {
    switch(action.type){
        case FETCH_REPORTS_SUCCESS:
            return {
                ...state,
                reports: action.payload
            }
        break;
        case ADD_REPORT_SUCCESS:
            return {
                ...state,
                reports: [ ...state.reports, action.payload ]
            }
        default:
            return state;
    }
}