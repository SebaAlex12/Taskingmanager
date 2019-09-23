import axios from "axios";
import { FETCH_TASKS, ADD_TASK, REMOVE_TASK, UPDATE_TASK } from "./types";

export const fetchTasks = () => {
  return async dispatch => {
    await axios
      .get("https://my-json-server.typicode.com/SebaAlex12/Tasks/db")
      .then(res => {
        dispatch({
          type: FETCH_TASKS,
          payload: res.data.tasks
        });
      })
      .catch(err => console.log(err));
  };
};

export const addTask = data => {
  const presentDate = new Date();

  const taskData = {
    id: data.id,
    userId: 1,
    title: data.title,
    description: data.description,
    createdAt: presentDate.toDateString(),
    status: "active",
    finishedAt: null
  };

  return async dispatch => {
    dispatch({
      type: ADD_TASK,
      payload: taskData
    });
  };
};
export const updateTask = data => {
  const presentDate = new Date();

  const taskData = {
    id: data.id,
    userId: 1,
    title: data.title,
    description: data.description,
    createdAt: data.createdAt,
    status: data.status,
    finishedAt: presentDate.toDateString()
  };

  return async dispatch => {
    dispatch({
      type: UPDATE_TASK,
      payload: taskData
    });
  };
};
export const removeTask = taskId => {
  return async dispatch => {
    dispatch({
      type: REMOVE_TASK,
      payload: taskId
    });
  };
};
