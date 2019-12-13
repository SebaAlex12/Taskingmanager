import io from "socket.io-client";

import {
  // FETCH_MESSANGERS_SUCCESS,
  UPDATE_MESSANGER_SUCCESS,
  MESSANGERS_ERROR
} from "./types";

const initialState = {
  messangers: [],
  errors: []
};

// let socket;

// function sendChatAction(value) {
//   socket.emit("chat:message", value);
// }

export const messangersReducer = (state = initialState, action) => {
  // if (!socket) {
  //   socket = io(":5000");
  //   socket.on("chat:message", function(msg) {
  //     console.log("socker reducer msg", msg);
  //     action.dispatch({ type: UPDATE_MESSANGER_SUCCESS, payload: msg });
  //   });
  // }
  switch (action.type) {
    // case FETCH_MESSANGERS_SUCCESS:
    //   return {
    //     ...state,
    //     messangers: action.payload
    //   };
    case UPDATE_MESSANGER_SUCCESS:
      // sendChatAction(JSON.stringify(action.payload));
      return {
        ...state,
        messangers: [...state.messangers, action.payload]
      };
    case MESSANGERS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
