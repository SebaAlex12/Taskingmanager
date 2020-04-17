import moment from "moment";

import store from "../../store";
import { updateUser } from "../actions";

export const setUserActive = () => {
  const state = store.getState();
  const loggedUser = state.users.logged_user;

  store.dispatch(
    updateUser({
      ...loggedUser,
      lastActive: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
    })
  );
};
