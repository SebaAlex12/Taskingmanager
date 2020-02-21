import React, { Component } from "react";
import { connect } from "react-redux";

import PaymentsItem from "./PaymentsItem";

class PaymentsList extends Component {
  render() {
    const { payments } = this.props;

    console.log(this.props);

    const paymentsContainer =
      payments && payments.length > 0
        ? payments.map(payment => (
            <PaymentsItem key={payment._id} item={payment} />
          ))
        : "Brak płatności...";

    return <div>{paymentsContainer}</div>;
  }
}
const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user,
    payments: state.payments.payments
  };
};
export default connect(mapStateToProps)(PaymentsList);
