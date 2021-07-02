import React, { Component } from "react";
import { connect } from "react-redux";

import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import CalendarProjectsList from "./CalendarProjectsList";
import CalendarTasksList from "./CalendarTasksList";
import CalendarNotesList from "./CalendarNotesList";

import { Button } from "../../../themes/basic";
import {
  faTasks,
  faStickyNote,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CalendarDailyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalProjectDailyEvents: false,
      showModalTaskDailyEvents: false,
      showModalNoteDailyEvents: false,
    };
  }
  closeModalProjectDailyEvents = () => {
    this.setState({
      showModalProjectDailyEvents: false,
    });
  };
  closeModalTaskDailyEvents = () => {
    this.setState({
      showModalTaskDailyEvents: false,
    });
  };
  closeModalNoteDailyEvents = () => {
    this.setState({
      showModalNoteDailyEvents: false,
    });
  };
  render() {
    const { dailyEvents } = this.props;
    const {
      showModalProjectDailyEvents,
      showModalTaskDailyEvents,
      showModalNoteDailyEvents,
    } = this.state;

    const projectDailyEvents = dailyEvents.filter((item) =>
      item.eventType == "Projekt" ? item : null
    );
    const taskDailyEvents = dailyEvents.filter((item) =>
      item.eventType == "Zadanie" ? item : null
    );
    const noteDailyEvents = dailyEvents.filter((item) =>
      item.eventType == "Notatka" ? item : null
    );

    const projectEventContent =
      projectDailyEvents.length > 0 ? (
        <Button
          onClick={() =>
            this.setState({
              showModalProjectDailyEvents: !showModalProjectDailyEvents,
            })
          }
          title="lista etapów"
        >
          <FontAwesomeIcon icon={faBalanceScale} />
          <span>{projectDailyEvents.length}</span>
        </Button>
      ) : null;

    const taskEventContent =
      taskDailyEvents.length > 0 ? (
        <Button
          onClick={() =>
            this.setState({
              showModalTaskDailyEvents: !showModalTaskDailyEvents,
            })
          }
          title="lista przypisanych zadań"
        >
          <FontAwesomeIcon icon={faTasks} />
          <span>{taskDailyEvents.length}</span>
        </Button>
      ) : null;

    const noteEventContent =
      noteDailyEvents.length > 0 ? (
        <Button
          onClick={() =>
            this.setState({
              showModalNoteDailyEvents: !showModalNoteDailyEvents,
            })
          }
          title="lista przypisanych notatek"
        >
          <FontAwesomeIcon icon={faStickyNote} />
          <span>{noteDailyEvents.length}</span>
        </Button>
      ) : null;

    return (
      <div>
        {projectEventContent}
        {showModalProjectDailyEvents ? (
          <ModalDialog
            showModal={() =>
              this.setState({
                showModalProjectDailyEvents: !showModalProjectDailyEvents,
              })
            }
            width="1200px"
          >
            <CalendarProjectsList
              projectDailyEvents={projectDailyEvents}
              closeModal={this.closeModalProjectDailyEvents}
            />
          </ModalDialog>
        ) : null}
        {taskEventContent}
        {showModalTaskDailyEvents ? (
          <ModalDialog
            showModal={() =>
              this.setState({
                showModalTaskDailyEvents: !showModalTaskDailyEvents,
              })
            }
            width="1200px"
          >
            <CalendarTasksList
              taskDailyEvents={taskDailyEvents}
              closeModal={this.closeModalTaskDailyEvents}
            />
          </ModalDialog>
        ) : null}
        {noteEventContent}
        {showModalNoteDailyEvents ? (
          <ModalDialog
            showModal={() =>
              this.setState({
                showModalNoteDailyEvents: !showModalNoteDailyEvents,
              })
            }
            width="1200px"
          >
            <CalendarNotesList
              noteDailyEvents={noteDailyEvents}
              closeModal={this.closeModalNoteDailyEvents}
            />
          </ModalDialog>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(CalendarDailyList);
