import {
  FETCH_PROJECTS_SUCCESS,
  ADD_PROJECT_SUCCESS,
  REMOVE_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  PROJECTS_ERROR
} from "./types";

const initialState = {
  projects: [],
  errors: []
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case REMOVE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(
          project => project.id !== action.payload
        )
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map(project => {
          return project.id === action.payload.id ? action.payload : project;
        })
      };
    case PROJECTS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
