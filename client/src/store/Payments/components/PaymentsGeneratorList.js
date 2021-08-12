import React, { Component } from "react";
import { connect } from "react-redux";

import { months } from "../../ini";

import { getNumbers } from "../common/functions";
import PaymentsGeneratorItem from "./PaymentsGeneratorItem";
import { addPayment, fetchNotUsedPatterns } from "../actions";

import { StyledPaymentGeneratorList } from "../styles/StyledPaymentGeneratorList";
import { Button } from "../../../themes/basic";

import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PaymentsGeneratorList extends Component {
  componentDidMount() {
    let { month, year, fetchNotUsedPatterns } = this.props;
    const payments = fetchNotUsedPatterns(month, year);
    if (payments.length > 0) {
      payments.forEach((item) => (item.selected = false));
      this.setState({
        payments,
      });
    }
  }
  generateHandler = () => {
    // generate list of invoices
    const { lastInsertInvoice, itemYear, itemMonth, addPayment } = this.props;
    let { payments } = this.state;

    const monthSelected = months.filter((m) => m.name === itemMonth);
    const month = monthSelected[0].value;

    let numbers = getNumbers(false, lastInsertInvoice.paymentNumber);
    let invoiceNumber = numbers.invoiceNumber;
    invoiceNumber = invoiceNumber + 1;

    // select only selected patterns and change theirs payment numbers and types
    payments = payments.filter((item) => {
      if (item.selected === true) {
        let numbers = getNumbers(item.paymentNumber, false);
        let patternNumber = numbers.patternNumber;
        let newPaymentNumber = [
          "I" + invoiceNumber++,
          "P" + patternNumber,
          "M" + month,
          "Y" + itemYear,
        ];
        delete item["_id"];
        item.paymentNumber = newPaymentNumber.join("/");
        item.paymentType = "Faktura";
        item.paymentMonth = itemMonth;
        item.paymentYear = itemYear;
        return item;
      }
    });
    payments.forEach((payment) => {
      addPayment(payment);
    });
  };
  itemSelectorHandler = (id, value) => {
    let { payments } = this.state;
    let element = payments.filter((item) => item._id === id);

    element[0].selected = value;

    this.setState({
      ...this.state,
      element,
    });
  };
  render() {
    let { payments } = this.props;
    let content;

    if (payments) {
      content = payments.map((item) => (
        <PaymentsGeneratorItem
          item={item}
          itemSelectorHandler={this.itemSelectorHandler}
        />
      ));
    } else {
      content = "Pusta lista";
    }

    return (
      <StyledPaymentGeneratorList>
        <div>
          {/* <h2>{`Generowanie faktur za miesiąć: ${itemMonth}, rok: ${itemYear}`}</h2>
          <h1>Lista wzorów</h1> */}
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
          <div className="generator-box" onClick={() => this.generateHandler()}>
            <Button>
              <FontAwesomeIcon icon={faCogs} />
              <span>Wygeneruj z zaznaczonych</span>
            </Button>
          </div>
        </div>
      </StyledPaymentGeneratorList>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // payments: state.payments.payments,
    lastInsertInvoice: state.payments.lastInsertInvoice,
  };
};
export default connect(mapStateToProps, { addPayment, fetchNotUsedPatterns })(
  PaymentsGeneratorList
);
