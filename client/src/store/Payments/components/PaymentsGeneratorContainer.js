import React, { Component } from "react";

import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";

import PaymentsGeneratorSelectForm from "./PaymentsGeneratorSelectForm";
import PaymentsGeneratorList from "./PaymentsGeneratorList";

import { Button } from "../../../themes/basic";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PaymentsGeneratorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: "",
      year: "",
      showPaymentGeneratorModalTrigger: false
    };
  }
  showPaymentGeneratorModal = result => {
    this.setState({
      ...this.state,
      showPaymentGeneratorModalTrigger: result
    });
  };
  onChangeFormHandler = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  render() {
    const { year, month, showPaymentGeneratorModalTrigger } = this.state;
    let alerts = [];
    if (year.length < 1) alerts.push("musisz wybrać rok");
    if (month.length < 1) alerts.push("musisz wybrać miesiąc");

    return (
      <div className="payments-generator-container-box">
        <PaymentsGeneratorSelectForm
          onChangeFormHandler={this.onChangeFormHandler}
        />
        <Button onClick={() => this.showPaymentGeneratorModal(true)}>
          <FontAwesomeIcon icon={faCertificate} />
        </Button>
        {showPaymentGeneratorModalTrigger ? (
          <ModalDialog
            title="Generator faktur"
            showModal={() => this.showPaymentGeneratorModal(false)}
            width="1270px"
          >
            {alerts.length > 0 ? (
              alerts.map(alert => (
                <div className="alert alert-danger">{alert}</div>
              ))
            ) : (
              <PaymentsGeneratorList itemYear={year} itemMonth={month} />
            )}
          </ModalDialog>
        ) : null}
      </div>
    );
  }
}

export default PaymentsGeneratorContainer;
