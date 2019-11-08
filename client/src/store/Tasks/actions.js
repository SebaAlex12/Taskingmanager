import {
  FETCHING_TASKS,
  ADDING_TASK,
  REMOVING_TASK,
  UPDATING_TASK
} from "./types";

export const fetchTasks = data => ({
  type: FETCHING_TASKS,
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
export const removeTask = taskId => ({
  type: REMOVING_TASK,
  taskId
});

// export const fetchTasks = () => {
//   return async dispatch => {
//     await axios
//       .get("https://my-json-server.typicode.com/SebaAlex12/Tasks/db")
//       .then(res => {
//         dispatch({
//           type: FETCH_TASKS,
//           payload: res.data.tasks
//         });
//       })
//       .catch(err => console.log(err));
//   };
// };

// export const addTask = data => {
//   const presentDate = new Date();

//   const taskData = {
//     id: data.id,
//     userId: 1,
//     title: data.title,
//     description: data.description,
//     createdAt: presentDate.toDateString(),
//     status: "active",
//     finishedAt: null
//   };

//   return async dispatch => {
//     dispatch({
//       type: ADD_TASK,
//       payload: taskData
//     });
//   };
// };
// export const updateTask = data => {
//   const presentDate = new Date();

//   const taskData = {
//     id: data.id,
//     userId: 1,
//     title: data.title,
//     description: data.description,
//     createdAt: data.createdAt,
//     status: data.status,
//     finishedAt: presentDate.toDateString()
//   };

//   return async dispatch => {
//     dispatch({
//       type: UPDATE_TASK,
//       payload: taskData
//     });
//   };
// };
// export const removeTask = taskId => {
//   return async dispatch => {
//     dispatch({
//       type: REMOVE_TASK,
//       payload: taskId
//     });
//   };
// };
