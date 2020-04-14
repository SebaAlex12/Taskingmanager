import React, { Component } from "react";
import { connect } from "react-redux";

import { StyledUserHistoryQuickView } from "../styles/StyledUserHistoryQuickView";

class UsersHistoryQuickView extends Component {
  render() {
    const { usersHistory } = this.props;
    if (usersHistory.lenght > 0) {
      console.log("users history", usersHistory);
    }
    return (
      <StyledUserHistoryQuickView>
        <h1>Users history</h1>
      </StyledUserHistoryQuickView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersHistory: state.usersHistory.usersHistory,
  };
};

export default connect(mapStateToProps)(UsersHistoryQuickView);
