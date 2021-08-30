import {
  LOGGING_USER,
  FETCH_LOGGED_USER_SUCCESS,
  FETCH_USERS_SUCCESS,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  USER_ERROR,
  LOGGED_OUT_SUCCESS
} from "./types";

const initialState = {
  users: [],
  logged_user: null,
  loading: false,
  errors: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_USER:
      return{
        ...state,
        loading: true
      };
    case FETCH_LOGGED_USER_SUCCESS:
      return {
        ...state,
        logged_user: action.payload,
        loading: false
      };
    case FETCH_USERS_SUCCESS:
      return {
        users: action.payload,
        logged_user: state.logged_user,
        loading:false
      };
    case REGISTER_USER_SUCCESS:
      return {
        users: [...state.users, action.payload],
        logged_user: state.logged_user,
        loading: false
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user => {
          return user._id === action.payload._id ? action.payload : user;
        }),
        loading: false
      };
    case LOGGED_OUT_SUCCESS:
      return {
        ...state,
        logged_user: action.payload,
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
