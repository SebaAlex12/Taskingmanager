import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment/min/moment-with-locales";

// import CheckFieldGroup from "../../../common/Forms/components/CheckFieldGroup";

import { addCalendar } from "../actions";
import { StyledCalendarAddForm } from "../styles/StyledCalendarAddForm";
import { calendarTypes } from "../../ini";

class CalendarAddForm extends Component {
  constructor(props) {
    super(props);
    const { selectedDate, eventId, eventType, projectName, title, description } = this.props;
    
    this.state = {
      eventType: eventType ? eventType : null,
      projectName: projectName ? projectName : null,
      title: title ? title : null,
      description: description ? description : null,
      selectedDate: selectedDate,
      eventId: eventId,
      calendarTypes: [],
      taskEventBlocked: false,
    };
  }
  componentDidMount() {
    const { dailyEvents, eventId } = this.props;

    // check if task event has been attached to selected day already
    if (dailyEvents.length > 0 && eventId) {
      const eventTask = dailyEvents.filter((item) => item.eventId == eventId);

      this.setState({
        taskEventBlocked: eventTask.length > 0 ? true : false,
      });
    }
    // if (calendarTypes) {
    //   let types = calendarTypes.map((type) => {
    //     type.name === "Notatka" ? (type.active = true) : (type.active = false);
    //     return type;
    //   });
    //   this.setState({
    //     eventType: "Notatka",
    //     calendarTypes: types,
    //   });
    // }
  }
  onChangeInput = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  onChangeSelect = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  addHandler = (event) => {
    const { addCalendar, loggedUser, closeAddFormModal } = this.props;
    const {
      eventType,
      title,
      description,
      selectedDate,
      eventId,
      taskEventBlocked,
    } = this.state;

    const data = {
      eventId: eventType == "Zadanie" && !taskEventBlocked ? eventId : null,
      userId: loggedUser._id,
      eventType: eventType ? eventType : "Notatka",
      title: title,
      description: description,
      selectedDate: selectedDate,
      status: "enabled",
    };

    addCalendar(data);
    closeAddFormModal();
    event.preventDefault();
  };
  onChangeTimeHandler = (event) => {
    const { selectedDate } = this.state;
    const [year, month, day] = moment(selectedDate)
      .format("YYYY-MM-DD")
      .split("-");

    const [hour, minute] = event.target.value.split(":");

    const newDate = moment(
      new Date(year, month - 1, day, hour, minute),
      "YYYY-MM-DD HH:mm:ss"
    ).format();

    this.setState({
      selectedDate: newDate,
    });
  };
  render() {
    const {
      projectName,
      title,
      description,
      selectedDate,
      taskEventBlocked,
    } = this.state;
    const alertMessage = taskEventBlocked
      ? "Zadanie zostało już przypisane do wybranego dnia"
      : null;

    return (
      <StyledCalendarAddForm>
        <div className="calendar-add-form-box">
          <div className="message">{alertMessage}</div>
          <h2>{moment(new Date(selectedDate)).locale("pl").format("LLLL")}</h2>
          <form action="">
            <div className="form-group time-box">
              <label htmlFor="time">Wybierz godzinę</label>
              <input
                type="time"
                name="time"
                onChange={this.onChangeTimeHandler}
              />
            </div>
            <React.Fragment>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    type="text"
                    name="title"
                    defaultValue={projectName && title && `[${projectName}] - ${title}`}
                    className="form-control"
                    placeholder="Tytuł"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    onChange={this.onChangeInput}
                    type="text"
                    defaultValue={description}
                    name="description"
                    className="form-control"
                    placeholder="Opis"
                    rows="25"
                    required
                  />
                </div>
            </React.Fragment>
            <div className="form-group">
                <input
                  onClick={this.addHandler}
                  className="btn btn-primary float-right"
                  type="submit"
                  value="dodaj"
                />
            </div>
          </form>
        </div>
      </StyledCalendarAddForm>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
  };
};
export default connect(mapStateToProps, { addCalendar })(CalendarAddForm);
