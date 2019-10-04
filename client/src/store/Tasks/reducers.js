import {
  FETCH_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  REMOVE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  TASKS_ERROR
} from "./types";

const initialState = {
  tasks: [],
  errors: []
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case REMOVE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          return task.id === action.payload.id ? action.payload : task;
        })
      };
    case TASKS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
