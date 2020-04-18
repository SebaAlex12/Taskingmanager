import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment/min/moment-with-locales";

import { SmallerButton } from "../../../themes/basic";
import {
  faAngleDown,
  faInfoCircle,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { sortArray } from "../../../common/tools";
import { StyledUserHistoryQuickView } from "../styles/StyledUserHistoryQuickView";
import { fetchUsersHistory } from "../actions";

class UsersHistoryQuickView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleUserHistory: false,
    };
  }
  refresh = () => {
    const { fetchUsersHistory } = this.props;
    fetchUsersHistory();
  };
  render() {
    const { usersHistory } = this.props;
    const { toggleUserHistory } = this.state;

    let sortedUsersHistory;
    let container = "";
    if (usersHistory.length > 0) {
      sortedUsersHistory = sortArray(usersHistory, "createdAt", 1);
      container = sortedUsersHistory.map((userHistory) => {
        const {
          _id,
          createdAt,
          userName,
          taskCreatedBy,
          taskProjectName,
          taskTitle,
          event,
        } = userHistory;
        return (
          <li title={`Tytuł zadania: ${taskTitle}`} key={_id}>
            <div className="date">
              {moment(new Date(createdAt)).locale("pl").format("LLLL")}
            </div>
            <div className="info">
              <FontAwesomeIcon icon={faInfoCircle} />
              {taskProjectName} / {taskCreatedBy}
            </div>
            <div>
              {userName} - {event}
            </div>
          </li>
        );
      });
    }
    return (
      <StyledUserHistoryQuickView>
        <SmallerButton
          className="btn-show-more"
          onClick={() =>
            this.setState({
              ...this.state,
              toggleUserHistory: !toggleUserHistory,
            })
          }
        >
          <FontAwesomeIcon title="pokaż wszystkich" icon={faAngleDown} />
        </SmallerButton>
        <SmallerButton className="btn-refresh">
          <FontAwesomeIcon
            title="odśwież"
            onClick={this.refresh}
            icon={faSyncAlt}
          />
        </SmallerButton>
        <ul
          className="users-history-list-box"
          style={{
            // cursor: "help",
            height: toggleUserHistory ? "500px" : "50px",
          }}
          // title="historia użytkowników"
        >
          {container}
        </ul>
      </StyledUserHistoryQuickView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersHistory: state.usersHistory.usersHistory,
  };
};

export default connect(mapStateToProps, { fetchUsersHistory })(
  UsersHistoryQuickView
);
