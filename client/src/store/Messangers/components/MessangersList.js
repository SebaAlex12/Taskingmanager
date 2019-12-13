import React, { Component } from "react";
import { connect } from "react-redux";

import MessangersItem from "./MessangersItem";
// import { Button } from "../../../themes/basic";
import MessangersAddForm from "./MessangersAddForm";
import { StyledMessangerList } from "../styles/StyledMessangerList";

class MessangersList extends Component {
  render() {
    const { messangers } = this.props;
    let n;
    const messangersContent = messangers.map(messanger => {
      // return <div>{messanger.msg}</div>;
      return <MessangersItem item={messanger} key={n++} />;
    });
    return (
      <StyledMessangerList>
        <div className="mesgs">
          <div className="msg_history">
            <div className="messangers-list-box">{messangersContent}</div>
          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              <MessangersAddForm />
            </div>
          </div>
        </div>
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
