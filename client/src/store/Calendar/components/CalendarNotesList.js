import React, { Component } from "react";
import moment from "moment/min/moment-with-locales";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeCalendar } from "../actions";

class CalendarNotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DailyEvents: [],
    };
  }
  componentDidMount() {
    const { noteDailyEvents } = this.props;
    this.setState({
      DailyEvents: noteDailyEvents,
    });
  }
  removeEvent = async (id) => {
    const { removeCalendar, closeModal } = this.props;
    const response = await removeCalendar(id);
    if (response) {
      closeModal();
    }
  };
  render() {
    const { DailyEvents } = this.state;
    let listContainer = [];
    if (DailyEvents.length > 0) {
      listContainer = DailyEvents.map((event) => {
        return (
          <tr key={event._id}>
            <td>{event.title}</td>
            <td>
              <textarea cols="60" rows="6" disabled>
                {event.description}
              </textarea>
            </td>
            <td>
              {moment(new Date(event.selectedDate))
                .locale("pl")
                .format("HH:mm:ss")}
            </td>
            <td>
              {moment(new Date(event.createdAt)).locale("pl").format("LLLL")}
            </td>
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
        <h2>
          Lista przypisanych notatek na dzień: <br />
          {DailyEvents.length > 0
            ? moment(new Date(DailyEvents[0].selectedDate))
                .locale("pl")
                .format("LLLL")
            : null}
        </h2>
        <table>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Opis</th>
              <th>Godzina</th>
              <th>Utworzone</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>{listContainer}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(null, { removeCalendar })(CalendarNotesList);
