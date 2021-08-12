import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { updateTask } from "../actions";
import { addMail } from "../../Mails/actions";

import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DisabledButton } from "../../../themes/basic";

class TasksMailReminder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mailRemainderDataToggle: null
    };
  }

  mailReminderHandler = mailRemainderDataToggle => {
    const {
      taskId,
      from,
      to,
      projectName,
      taskTitle,
      createdBy,
      description,
      priority,
      termAt,
      updateTask,
      addMail
    } = this.props;

    const addTaskToMailingListText =
      "Czy napewno chcesz dodać zadanie do listy mailingowej ? - dodanie do listy spowoduje automatyczne wysłanie przypomnienia do wykonawcy. Przypomnienie o wykonaniu zadania trafia na maila raz na dzień.";
    const removeTaskFromMailingListText =
      "Czy napewno chcesz usunąć zadanie z listy mailingowej ? - usunięcie z listy spowoduje że wykonawca nie będzie automatycznie otrzymywał przypomnienia o wykonaniu zadania na maila.";

    const result = window.confirm(
      mailRemainderDataToggle === true
        ? addTaskToMailingListText
        : removeTaskFromMailingListText
    );
    if (result === true) {
      if (mailRemainderDataToggle === true) {
        const html =
          "<label style='display:block; font-weight:bold; font-size:14px;padding:10px 0px;'>Przypomnienie o zadaniu:</label><table style='font-size:12px;border:1px solid grey'><tr><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>Nazwa</th><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>Projekt</th><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>Priorytet</th><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>Zlecający</th><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>termin</th><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>Opis</th></tr><tr><td style='padding:10px 20px;border:1px solid grey;'>" +
          taskTitle +
          "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
          projectName +
          "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
          priority +
          "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
          createdBy +
          "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
          termAt +
          "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
          description +
          "</td></tr></table>";

        const mailData = {
          from,
          to,
          projectName,
          title: "Zadanie do wykonania: " + taskTitle,
          description: html,
          createdBy
        };
        updateTask({
          _id: taskId,
          mailRemainderData: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
        });
        addMail(mailData);
      } else {
        updateTask({ _id: taskId, mailRemainderData: null });
      }
      this.setState({
        ...this.state,
        mailRemainderDataToggle
      });
    }
  };
  render() {
    let { mailRemainderDataToggle } = this.state;
    const { mailRemainderData } = this.props;

    if (mailRemainderDataToggle === null) {
      mailRemainderDataToggle = mailRemainderData ? true : false;
    }

    return (
      <DisabledButton
        className="reminder-button"
        active={mailRemainderDataToggle ? "active" : ""}
        onClick={() => this.mailReminderHandler(!mailRemainderDataToggle)}
        title="Dodaj / usuń zadanie do / z listy mailowych przypomnień"
      >
        <FontAwesomeIcon icon={faBell} />
      </DisabledButton>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { updateTask, addMail })(
  TasksMailReminder
);
