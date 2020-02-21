import React, { Component } from "react";
import { connect } from "react-redux";

import PaymentsList from "./PaymentsList";

class PaymentsContainer extends Component {
  render() {
    return (
      <div>
        <PaymentsList />
      </div>
    );
  }
}

export default connect()(PaymentsContainer);
