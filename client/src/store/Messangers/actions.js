import { FETCHING_MESSANGERS, UPDATING_MESSANGER } from "./types";

export const fetchMessangers = () => ({
  type: FETCHING_MESSANGERS
});
export const updateMessanger = data => ({
  type: UPDATING_MESSANGER,
  data
});
