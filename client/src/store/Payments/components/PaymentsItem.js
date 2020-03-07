import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import {
  payment_invoice_statuses,
  payment_pattern_statuses,
  payment_cycles
} from "../../ini";
import { updatePayment, removePayment } from "../actions";

import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import PaymentsToPdfInvoice from "./PaymentsToPdfInvoice";

import { Button, WarningButton } from "../../../themes/basic";
import { faFilePdf, faTimes, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PaymentsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPaymentToPdfModalTrigger: false
    };
  }
  componentDidMount() {
    const {
      item: {
        _id,
        paymentType,
        paymentMonth,
        paymentCycle,
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
      }
    } = this.props;
    this.setState({
      _id,
      paymentType,
      paymentMonth,
      paymentCycle,
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
    });
  }
  showPaymentToPdfModal = result => {
    this.setState({
      ...this.state,
      showPaymentToPdfModalTrigger: result
    });
  };
  onChangeSelectHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    const { updatePayment, updateMessages } = this.props;
    const { _id } = this.state;
    const data = {
      _id,
      [event.target.name]: event.target.value
    };
    const response = updatePayment(data);
  };
  removePaymentHandler = (event, _id) => {
    // const { removePayment } = this.props;
    // const result = window.confirm("Czy napewno chcesz usunąć płatność ?");
    // if (result === true) {
    //   const response = removePayment(_id);
    //   if (response) {
    //     updateMessages([
    //       { name: "Płatność" },
    //       { value: event.target.name + " płatność została usunięta" }
    //     ]);
    //   }
    // }
  };
  render() {
    const {
      item: {
        _id,
        paymentType,
        paymentMonth,
        paymentCycle,
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
    // console.log("state pay item", this.state);
    const { showPaymentToPdfModalTrigger } = this.state;
    const statuses =
      paymentType === "Faktura"
        ? payment_invoice_statuses
        : payment_pattern_statuses;

    return (
      <React.Fragment>
        <tr>
          <td>
            <Button title={description}>
              <FontAwesomeIcon icon={faInfo} />
            </Button>
            {paymentNumber}
          </td>
          <td>{contractorName}</td>
          <td>{paymentType}</td>
          <td>
            <select
              className="form-control"
              onChange={this.onChangeSelectHandler}
              value={status}
              name="status"
              required
            >
              {statuses
                ? statuses.map(item => {
                    return (
                      <option
                        key={item._id}
                        value={item.name}
                        selected={item.name === status ? "selected" : null}
                      >
                        {item.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </td>
          <td>
            {paymentType === "Wzór" ? (
              <select
                className="form-control"
                onChange={this.onChangeSelectHandler}
                value={paymentCycle}
                name="paymentCycle"
                required
              >
                {payment_cycles
                  ? payment_cycles.map(item => {
                      return (
                        <option
                          key={item._id}
                          value={item.name}
                          defaultValue={
                            item.name === paymentCycle ? "selected" : null
                          }
                        >
                          {item.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            ) : (
              "nie dotyczy"
            )}
          </td>
          <td>{paymentMonth}</td>
          <td>{paymentType === "Faktura" ? termAt : "nie dotyczy"}</td>
          <td>{moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
          <td>{netValue}</td>
          <td>{grossValue}</td>
          <td className="details">
            {paymentType === "Faktura" ? (
              <Button onClick={() => this.showPaymentToPdfModal(true)}>
                <FontAwesomeIcon icon={faFilePdf} />
              </Button>
            ) : null}
            {showPaymentToPdfModalTrigger ? (
              <ModalDialog
                title="Wygenerowany pdf"
                showModal={() => this.showPaymentToPdfModal(false)}
                width="960px"
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
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, { updatePayment, removePayment })(
  PaymentsItem
);
