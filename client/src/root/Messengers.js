import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchUsers } from "../store/Users/actions";
import MessengersContainer from "../store/Messengers/components/MessengersContainer";

class Messengers extends Component {
  render() {
    return (
      <React.Fragment>
        <MessengersContainer />
      </React.Fragment>
    );
  }
}

export default connect(null, { fetchUsers })(Messengers);
