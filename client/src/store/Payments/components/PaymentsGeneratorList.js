import React, { Component } from "react";
import { connect } from "react-redux";

import PaymentsGeneratorItem from "./PaymentsGeneratorItem";

class PaymentsGeneratorList extends Component {
  render() {
    const { itemYear, itemMonth, payments } = this.props;
    let alert = "";

    if (itemYear.length < 1) alert = alert + "musisz wybrać rok";
    if (itemMonth.length < 1) alert = alert + "musisz wybrać miesiąc";

    const content =
      alert.length > 0
        ? alert
        : payments.map(item => <PaymentsGeneratorItem item={item} />);

    return (
      <div>
        {alert.length > 0 ? (
          alert
        ) : (
          <React.Fragment>
            <h1>Lista wzorów</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nr wzoru</th>
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
              <tbody>{content}</tbody>
            </table>
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    payments: state.payments.payments
  };
};
export default connect(mapStateToProps)(PaymentsGeneratorList);
