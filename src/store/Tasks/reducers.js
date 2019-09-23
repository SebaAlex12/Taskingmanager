import { FETCH_TASKS, ADD_TASK, REMOVE_TASK } from "./types";

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
        tasks: state.tasks.filter(task => task._id !== action.payload._id)
      };
    default:
      return state;
  }
};
