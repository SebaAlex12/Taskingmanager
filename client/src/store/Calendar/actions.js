import {
  FETCHING_CALENDARS,
  ADDING_CALENDAR,
  UPDATING_CALENDAR,
} from "./types";

export const fetchCalendars = (loggedUserId) => ({
  type: FETCHING_CALENDARS,
  loggedUserId,
});
export const addCalendar = (data) => ({
  type: ADDING_CALENDAR,
  data,
});
export const updateCalendar = (data) => ({
  type: UPDATING_CALENDAR,
  data,
});
