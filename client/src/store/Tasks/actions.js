import {
  FETCHING_TASKS,
  FETCHING_TASKS_BY_LOGGED_USER_PROJECTS,
  ADDING_TASK,
  REMOVING_TASK,
  UPDATING_TASK,
  SENDING_MAILING_TASK
} from "./types";

export const fetchTasks = data => ({
  type: FETCHING_TASKS,
  data
});
export const fetchTasksByLoggedUserProjects = data => ({
  type: FETCHING_TASKS_BY_LOGGED_USER_PROJECTS,
  data
});
export const addTask = data => ({
  type: ADDING_TASK,
  data
});
export const updateTask = data => ({
  type: UPDATING_TASK,
  data
});
export const removeTask = data => ({
  type: REMOVING_TASK,
  data
});
export const sendMailingTask = () => ({
  type: SENDING_MAILING_TASK
});