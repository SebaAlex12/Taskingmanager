import axios from "axios";
import { FETCH_TASKS, ADD_TASK, REMOVE_TASK } from "./types";

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

// export const addTask = (data) => {
//   const presentDate = new Date();

//   return async (dispatch) => {
//     await axios
//       .post("/graphql", JSON.stringify(graph), {
//         headers: { "Content-Type": "application/json" }
//       })
//       .then(res => {
//         dispatch({
//           type: ADD_TASK,
//           payload: res.data.data.addTask
//         });
//       })
//       .catch(err => console.log(err));
//   };
// };
// export const removeTask = (taskId) => {
//   console.log("id", taskId);
//   return async (dispatch) => {

//     await axios
//       .post("/graphql", JSON.stringify(graph), {
//         headers: { "Content-Type": "application/json" }
//       })
//       .then(res => {
//         dispatch({
//           type: REMOVE_TASK,
//           payload: res.data.data.removeTask
//         });
//       })
//       .catch(err => console.log(err));
//   };
// };
