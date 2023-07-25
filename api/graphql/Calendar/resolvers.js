const Calendar = require("../../models/Calendar");
const tools = require("../../utils/tools");

module.exports = {
  fetchCalendars: async function ({ loggedUserId }) {
    let params = {};
    params.userId = loggedUserId;
    let calendars = await Calendar.find(params, null, {
      sort: { selectedDate: 1 },
    });
    return calendars;
  },
  addCalendar: async function ({ calendarInput }, req) {
    // const result = await Calendar.findOne({ _id: calendarInput._id });
    // if (result) {
    //   throw {
    //     errors: [
    //       { path: "_id", message: "Istnieje już kontrahent o podanej nazwie" }
    //     ]
    //   };
    // }
    const calendar = new Calendar({
      eventId: calendarInput.eventId,
      userId: calendarInput.userId,
      eventType: calendarInput.eventType,
      title: calendarInput.title,
      description: calendarInput.description,
      selectedDate: calendarInput.selectedDate,
      status: calendarInput.status,
      createdAt: calendarInput.createdAt,
    });

    try {
      const storedCalendar = await calendar.save();
      return { ...storedCalendar._doc, _id: storedCalendar._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updateCalendar: async function ({ calendarInput }, req) {
    const _id = calendarInput._id;
    const calendar = await Calendar.findOne({ _id });
    const data = {
      _id: calendarInput._id,
      eventId: calendarInput.eventId ? calendarInput.eventId : calendar.eventId,
      userId: calendarInput.userId ? calendarInput.userId : calendar.userId,
      eventType: calendarInput.eventType
        ? calendarInput.eventType
        : calendar.eventType,
      title: calendarInput.title ? calendarInput.title : calendar.title,
      description: calendarInput.description
        ? calendarInput.description
        : calendar.description,
      selectedDate: calendarInput.selectedDate
        ? calendarInput.selectedDate
        : calendar.selectedDate,
      status: calendarInput.status ? calendarInput.status : calendar.status,
      createdAt: calendarInput.createdAt
        ? calendarInput.createdAt
        : calendar.createdAt,
    };
    try {
      calendar.overwrite(data);
      const storedCalendar = await calendar.save();
      return {
        ...storedCalendar._doc,
        _id: storedCalendar._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removeCalendar: async function ({ eventId }) {
    try {
      await Calendar.deleteOne({ _id: eventId });
      return { _id: eventId };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
};
