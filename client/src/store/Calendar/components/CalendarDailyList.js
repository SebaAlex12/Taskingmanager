import React, { Component } from "react";
import { connect } from "react-redux";

import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import CalendarTasksList from "./CalendarTasksList";

import { Button } from "../../../themes/basic";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CalendarDailyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalTaskDailyEvents: false,
    };
  }
  render() {
    const { dailyEvents } = this.props;
    const { showModalTaskDailyEvents } = this.state;

    const taskDailyEvents = dailyEvents.filter((item) =>
      item.eventType == "task" ? item : null
    );
    // console.log("from events", dailyEvents);
    // console.log("events", taskDailyEvents);
    const taskEventContent =
      taskDailyEvents.length > 0 ? (
        <Button
          onClick={() =>
            this.setState({
              showModalTaskDailyEvents: !showModalTaskDailyEvents,
            })
          }
          title="lista tasków"
        >
          <FontAwesomeIcon icon={faTasks} />
          <span>{taskDailyEvents.length}</span>
        </Button>
      ) : null;

    return (
      <div>
        {taskEventContent}
        {showModalTaskDailyEvents ? (
          <ModalDialog
            showModal={() =>
              this.setState({
                showModalTaskDailyEvents: !showModalTaskDailyEvents,
              })
            }
          >
            <CalendarTasksList tasksList={taskDailyEvents} />
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
