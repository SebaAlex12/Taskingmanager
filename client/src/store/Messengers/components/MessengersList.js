import React, { Component } from "react";
import { connect } from "react-redux";

import MessengersItem from "./MessengersItem";
// import { Button } from "../../../themes/basic";
import MessengersAddForm from "./MessengersAddForm";
import { StyledMessengerList } from "../styles/StyledMessengerList";

class MessengersList extends Component {
  render() {
    const { messengers, filteredUsers } = this.props;
    let n = 0;

    function mapReverse(array, fn) {
      return array.reduceRight(function(result, el) {
        result.push(fn(el));
        return result;
      }, []);
    }

    const messengersReverse = mapReverse(messengers, function(i) {
      return i;
    });

    const messengersContent = messengersReverse.map(messenger => {
      // return <div>{messanger.msg}</div>;
      return <MessengersItem item={messenger} key={n++} />;
    });
    return (
      <StyledMessengerList>
        <div className="mesgs">
          <div className="type_msg">
            <div className="input_msg_write">
              <MessengersAddForm filteredUsers={filteredUsers} />
            </div>
          </div>
          <div className="msg_history">
            <div className="messengers-list-box">{messengersContent}</div>
          </div>
        </div>
      </StyledMessengerList>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    messengers: state.messengers.messengers
  };
};

export default connect(mapStateToProps, {})(MessengersList);
