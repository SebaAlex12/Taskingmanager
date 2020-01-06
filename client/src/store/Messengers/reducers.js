import io from "socket.io-client";

import {
  // FETCH_MESSENGERS_SUCCESS,
  UPDATE_MESSENGER_SUCCESS,
  MESSENGERS_ERROR
} from "./types";

const initialState = {
  messengers: [],
  errors: []
};

// let socket;

// function sendChatAction(value) {
//   socket.emit("chat:message", value);
// }

export const messengersReducer = (state = initialState, action) => {
  // if (!socket) {
  //   socket = io(":5000");
  //   socket.on("chat:message", function(msg) {
  //     console.log("socker reducer msg", msg);
  //     action.dispatch({ type: UPDATE_MESSENGER_SUCCESS, payload: msg });
  //   });
  // }
  switch (action.type) {
    // case FETCH_MESSENGERS_SUCCESS:
    //   return {
    //     ...state,
    //     messangers: action.payload
    //   };
    case UPDATE_MESSENGER_SUCCESS:
      // sendChatAction(JSON.stringify(action.payload));
      return {
        ...state,
        messengers: [...state.messengers, action.payload]
      };
    case MESSENGERS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
