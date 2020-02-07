import { ADDING_MAIL, FETCHING_MAILS } from "./types";

export const addMail = data => ({
  type: ADDING_MAIL,
  data
});

export const fetchMails = () => ({
  type: FETCHING_MAILS
});
