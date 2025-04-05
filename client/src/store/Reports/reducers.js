import { FETCH_REPORTS_SUCCESS, ADD_REPORT_SUCCESS, REMOVE_REPORT_SUCCESS, UPDATE_REPORT_SUCCESS, REPORTS_ERROR } from "./types";

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
        case REMOVE_REPORT_SUCCESS:
            return {
                ...state,
                reports: state.reports.filter(item => item._id != action.payload.id)
            }
        case UPDATE_REPORT_SUCCESS:
            return {
                ...state,
                reports: state.reports.map(item => item._id === action.payload._id ? action.payload : item)
            }
        case REPORTS_ERROR:
            return {
                ...state,
                errors:[ action.payload ]
            }
        default:
            return state;
    }
}