import React, { Component } from "react";
import { connect } from "react-redux";
// import io from "socket.io-client";

// import { Button } from "../../../themes/basic";
import { StyledMessangerList } from "../styles/StyledMessangerList";

class MessangersList extends Component {
  render() {
    const { messangers } = this.props;
    let n;
    const messangersContent = messangers.map(messanger => {
      return <div>{messanger.msg}</div>;
      //   return <MessangersItem item={messanger} key={n++} />;
    });
    return (
      <StyledMessangerList>
        <div className="messangers-box">{messangersContent}</div>
      </StyledMessangerList>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    messangers: state.messangers.messangers
  };
};

export default connect(mapStateToProps, {})(MessangersList);
