import { FETCH_TASKS, ADD_TASK, REMOVE_TASK, UPDATE_TASK } from "./types";

const initialState = {
  tasks: []
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          return task.id === action.payload.id ? action.payload : task;
        })
      };
    default:
      return state;
  }
};
