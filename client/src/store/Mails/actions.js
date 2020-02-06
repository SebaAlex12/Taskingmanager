import { SENDING_MAIL, FETCHING_MAILS } from "./types";

export const sendMail = data => ({
  type: SENDING_MAIL,
  data
});

export const fetchMails = () => ({
  type: FETCHING_MAILS
})