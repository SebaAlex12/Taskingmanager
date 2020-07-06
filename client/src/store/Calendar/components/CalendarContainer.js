import React, { Component } from "react";
import { connect } from "react-redux";
// import moment from "moment";
import moment from "moment/min/moment-with-locales";

import { addCalendar } from "../actions";
import { StyledCalendarContainer } from "../styles/StyledCalendarContainer";
import CalendarDailyList from "./CalendarDailyList";
import { fetchCalendars } from "../actions";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../../themes/basic";

class CalendarContainer extends Component {
  constructor(props) {
    super(props);
    moment.locale("pl");
    this.state = {
      dateContext: moment(),
      today: moment(),
      showMonthPopup: false,
      showYearPopup: false,
      showYearNav: false,
      weekdays: moment.weekdays(),
      weekdaysShort: moment.weekdaysShort(),
      months: moment.months(),
    };
  }
  componentDidMount() {
    const {
      loggedUser: { _id },
      fetchCalendars,
    } = this.props;
    fetchCalendars(_id);
  }
  year = () => {
    const { dateContext } = this.state;
    return dateContext.format("Y");
  };
  month = () => {
    const { dateContext } = this.state;
    return dateContext.format("MMMM");
  };
  daysInMonth = () => {
    const { dateContext } = this.state;
    return dateContext.daysInMonth();
  };
  currentDate = () => {
    const { dateContext } = this.state;
    return dateContext.get("date");
  };
  currentDay = () => {
    const { dateContext } = this.state;
    return dateContext.format("D");
  };
  firstDayOfMonth = () => {
    const { dateContext } = this.state;
    return moment(dateContext).startOf("month").format("d");
  };
  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    this.setState({
      dateContext: dateContext,
    });
  };
  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    this.setState({
      dateContext: dateContext,
    });
  };
  setMonth = (month) => {
    const { months } = this.state;
    const monthNumber = months.indexOf(month);
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("month", monthNumber);
    this.setState({
      dateContext: dateContext,
    });
  };
  setYear = (year) => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("year", year);
    this.setState({
      dateContext: dateContext,
    });
  };
  onChangeMonthHandler = (e, data) => {
    this.setMonth(data);
  };
  onChangeYearHandler = (e) => {
    this.setYear(e.target.value);
  };
  onKeyUpYearHandler = (e) => {
    if (e.which === 13 || e.which === 27) {
      this.setYear(e.target.value);
      this.setState({
        showYearNav: false,
      });
    }
  };
  selectList = () => {
    const { months } = this.state;
    const monthElements = months.map((item) => {
      return (
        <li key={item}>
          <a href="#" onClick={(e) => this.onChangeMonthHandler(e, item)}>
            {item}
          </a>
        </li>
      );
    });
    return <ul className="months-box">{monthElements}</ul>;
  };
  showYearEditor = () => {
    const { showYearNav } = this.state;
    this.setState({
      showYearNav: !showYearNav,
    });
  };
  monthNav = () => {
    const selectListElements = this.selectList();
    const presentMonth = this.month();
    const { showYearPopup } = this.state;
    return (
      <td className="month-nav-box" colSpan="3">
        <div>
          <span className="month-editor">{presentMonth}</span>
          <Button
            variant="primary"
            onClick={() =>
              this.setState({
                showYearPopup: !showYearPopup,
              })
            }
          >
            <FontAwesomeIcon icon={faArrowAltCircleDown} />
          </Button>
        </div>
        {showYearPopup ? selectListElements : null}
      </td>
    );
  };
  yearNav = () => {
    const presentYear = this.year();
    const { showYearNav } = this.state;
    return showYearNav ? (
      <td colSpan="3">
        <input
          type="number"
          placeholder="year"
          defaultValue={presentYear}
          className="year-editor"
          onKeyUp={(e) => this.onKeyUpYearHandler(e)}
          onChange={(e) => this.onChangeYearHandler(e)}
        />
      </td>
    ) : (
      <td colSpan="3">
        <a
          href="#"
          onDoubleClick={(e) => {
            this.showYearEditor();
          }}
          className="year-editor"
        >
          {presentYear}
        </a>
      </td>
    );
  };
  arrowsNav = () => {
    return (
      <td>
        <Button variant="primary" onClick={() => this.prevMonth()}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        </Button>
        <Button variant="primary" onClick={() => this.nextMonth()}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </Button>
      </td>
    );
  };

  onDayClick = (day) => {
    const {
      eventId,
      userId,
      eventType,
      title,
      description,
      addCalendar,
    } = this.props;
    // console.log("props", this.props);
    // console.log("day:", day);
    // console.log("year:", this.year());
    // console.log("month:", this.month());
    // moment(this.year() + "-" + this.month() + "-" + day, "YYYY-MM-DD HH:mm:ss").format(),
    const data = {
      eventId: eventId,
      userId: userId,
      eventType: eventType,
      title: title,
      description: description,
      selectedDate: moment(
        this.year() + "-" + this.month() + "-" + day,
        "YYYY-MMMM-DD"
      ).format(),
      status: "enabled",
    };

    addCalendar(data);
  };
  filterDailyEvents = (day) => {
    const { calendars } = this.props;
    const createDate = moment(
      this.year() + "-" + this.month() + "-" + day,
      "YYYY-MMMM-DD"
    ).format();
    // console.log("day to check:", day);
    // console.log("calendars", calendars);
    const dailyEvents = calendars.filter((item) => {
      if (createDate == item.selectedDate) {
        return item;
      }
    });
    // console.log("daily events", dailyEvents);
    return dailyEvents;
  };

  render() {
    const { weekdaysShort } = this.state;
    const monthNavElements = this.monthNav();
    const yearNavElements = this.yearNav();
    const arrowsNavElements = this.arrowsNav();
    let blanks = [];
    let trElements = [];
    let daysInMonth = [];
    let rows = [];
    let cells = [];

    const trWeekdays = weekdaysShort.map((day) => {
      return (
        <td key={day} className="week-day">
          {day}
        </td>
      );
    });

    for (let i = 1; i <= this.firstDayOfMonth(); i++) {
      blanks.push(
        <td className="empty-slot" key={"empty-slot-" + i}>
          {""}
        </td>
      );
    }
    for (let day = 1; day <= this.daysInMonth(); day++) {
      let clazz = day == this.currentDay() ? "day current-day" : "day";
      let dailyEvents = this.filterDailyEvents(day);
      daysInMonth.push(
        <td key={day} className={clazz}>
          <span onClick={() => this.onDayClick(day)}>{day}</span>
          <CalendarDailyList dailyEvents={dailyEvents} />
        </td>
      );
    }

    const totalSlots = [...blanks, ...daysInMonth];
    totalSlots.forEach((row, i) => {
      if (i % 7 != 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });
    trElements = rows.map((day, i) => {
      return <tr key={i}>{day}</tr>;
    });

    return (
      <StyledCalendarContainer>
        <h2>Kalendarz</h2>
        <table>
          <thead className="calendar-header">
            <tr>
              {monthNavElements}
              {yearNavElements}
              {arrowsNavElements}
            </tr>
          </thead>
          <tbody className="calendar-body">
            <tr>{trWeekdays}</tr>
            {trElements}
          </tbody>
        </table>
      </StyledCalendarContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    calendars: state.calendars.calendars,
    loggedUser: state.users.logged_user,
  };
};

export default connect(mapStateToProps, { addCalendar, fetchCalendars })(
  CalendarContainer
);
