import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeCalendar } from "../actions";

class CalendarTasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DailyEvents: [],
    };
  }
  componentDidMount() {
    const { taskDailyEvents } = this.props;
    this.setState({
      DailyEvents: taskDailyEvents,
    });
  }
  removeEvent = (id) => {
    const { removeCalendar } = this.props;
    removeCalendar(id);
  };
  render() {
    const { tasks } = this.props;
    const { DailyEvents } = this.state;

    console.log("events", DailyEvents);
    console.log("tasks", tasks);
    let listContainer = "";
    if (DailyEvents.length > 0) {
      listContainer = DailyEvents.map((event) => {
        // console.log("item", item);
        const task = tasks.filter((item) => item._id === event.eventId);
        // console.log("selected task", task);
        return (
          <tr key={event._id}>
            <td>{task[0].title}</td>
            <td>{task[0].projectName}</td>
            <td>{task[0].status}</td>
            <td>{task[0].priority}</td>
            <td>{task[0].termAt}</td>
            <td>
              <Button
                onClick={() => this.removeEvent(event._id)}
                title="Usuń wydarzenie"
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <h1>Lista przypisanych wydarzeń</h1>
        <table>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Projekt</th>
              <th>Stan</th>
              <th>Priorytet</th>
              <th>Termin</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>{listContainer}</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};
export default connect(mapStateToProps, { removeCalendar })(CalendarTasksList);
