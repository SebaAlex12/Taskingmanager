import React, { Component } from "react";
import { connect } from "react-redux";

import { removePayment } from "../actions";
import { updateMessages } from "../../Messages/actions";

import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import PaymentsToPdfInvoice from "./PaymentsToPdfInvoice";

import { Button, WarningButton } from "../../../themes/basic";
import { faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PaymentsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPaymentToPdfModalTrigger: false
    };
  }
  showPaymentToPdfModal = result => {
    this.setState({
      ...this.state,
      showPaymentToPdfModalTrigger: result
    });
  };

  removePaymentHandler = (event, _id) => {
    const { removePayment } = this.props;

    const result = window.confirm("Czy napewno chcesz usunąć płatność ?");
    if (result === true) {
      const response = removePayment(_id);
      if (response) {
        updateMessages([
          { name: "Zadanie" },
          { value: event.target.name + " został usunięty" }
        ]);
      }
    }
  };
  render() {
    const {
      item: {
        _id,
        paymentNumber,
        companyName,
        contractorName,
        companyAddress,
        contractorAddress,
        companyNIP,
        contractorNIP,
        companyWebsite,
        companyPhone,
        contractorPhone,
        companyMail,
        contractorMail,
        companyBankName,
        companyBankAcount,
        description,
        netValue,
        grossValue,
        status,
        paymentMethod,
        createdBy,
        termAt,
        createdAt
      },
      item,
      loggedUser
    } = this.props;
    const { showPaymentToPdfModalTrigger } = this.state;

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nr płatności</th>
              <th scope="col">Nazwa kontrahenta</th>
              <th scope="col">Status</th>
              <th scope="col">Metoda</th>
              <th scope="col">Termin</th>
              <th scope="col">Utworzono</th>
              <th scope="col">Wartość netto</th>
              <th scope="col">Wartość brutto</th>
              <th scope="col">Akcje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{paymentNumber}</td>
              <td>{contractorName}</td>
              <td>{status}</td>
              <td>{paymentMethod}</td>
              <td>{termAt}</td>
              <td>{createdAt}</td>
              <td>{netValue}</td>
              <td>{grossValue}</td>
              <td className="details">
                <Button onClick={() => this.showPaymentToPdfModal(true)}>
                  <FontAwesomeIcon icon={faFilePdf} />
                </Button>
                {showPaymentToPdfModalTrigger ? (
                  <ModalDialog
                    title="Wygenerowany pdf"
                    showModal={() => this.showPaymentToPdfModal(false)}
                  >
                    <PaymentsToPdfInvoice item={item} />
                  </ModalDialog>
                ) : null}
                {loggedUser.name === createdBy ? (
                  <WarningButton
                    warning
                    onClick={() => this.removePaymentHandler(_id)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </WarningButton>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, { removePayment })(PaymentsItem);
