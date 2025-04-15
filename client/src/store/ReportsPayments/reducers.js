import { FETCH_REPORTS_PAYMENTS_SUCCESS, ADD_REPORT_PAYMENTS_SUCCESS, REMOVE_REPORT_PAYMENTS_SUCCESS, UPDATE_REPORT_PAYMENTS_SUCCESS, REPORTS_PAYMENTS_SUCCESS, REPORTS_PAYMENTS_ERROR } from "./types";

const initialState = {
    reportsPayments:[],
    success:[],
    errors:[]
}

export const reportsPaymentsReducer = (state = initialState,action) => {
    switch(action.type){
        case FETCH_REPORTS_PAYMENTS_SUCCESS:
            return {
                ...state,
                reportsPayments: action.payload
            }
        break;
        case ADD_REPORT_PAYMENTS_SUCCESS:
            return {
                ...state,
                reportsPayments: [ ...state.reportsPayments, action.payload ]
            }
        case REMOVE_REPORT_PAYMENTS_SUCCESS:
            return {
                ...state,
                reportsPayments: state.reportsPayments.filter(item => item._id !== action.payload.id)
            }
        case UPDATE_REPORT_PAYMENTS_SUCCESS:
            return {
                ...state,
                reportsPayments: state.reportsPayments.map(item => item._id === action.payload._id ? action.payload : item)
            }
        case REPORTS_PAYMENTS_SUCCESS:
            return {
                    ...state,
                    success: [ action.payload ],
                    errors: []
            }
        case REPORTS_PAYMENTS_ERROR:
            return {
                ...state,
                errors:[ action.payload ],
                success:[]
            }
        default:
            return state;
    }
}