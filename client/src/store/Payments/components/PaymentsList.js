import React, { Component } from "react";
import { connect } from "react-redux";

import PaymentsItem from "./PaymentsItem";

class PaymentsList extends Component {
  render() {
    const { payments } = this.props;

    const listContainer =
      payments && payments.length > 0
        ? payments.map((payment) => (
            <PaymentsItem key={payment._id} item={payment} />
          ))
        : null;

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nr płatności</th>
              <th scope="col">Nazwa kontrahenta</th>
              <th scope="col">Typ</th>
              <th scope="col">Status</th>
              <th scope="col">Cykl</th>
              <th scope="col">Miesiąc</th>
              <th scope="col">Termin</th>
              <th scope="col">Utworzono</th>
              <th scope="col">Wartość netto</th>
              <th scope="col">Wartość brutto</th>
              <th scope="col">Akcje</th>
            </tr>
          </thead>
          <tbody>{listContainer}</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    payments: state.payments.payments,
  };
};
export default connect(mapStateToProps)(PaymentsList);
