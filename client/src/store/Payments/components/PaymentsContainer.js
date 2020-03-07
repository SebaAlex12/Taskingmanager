import React, { Component } from "react";
import { connect } from "react-redux";

import PaymentsList from "./PaymentsList";
import PaymentsGeneratorContainer from "./PaymentsGeneratorContainer";
import { fetchPayments } from "../actions";

import { StyledPaymentContainer } from "../styles/StyledPaymentContainer";

class PaymentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patterns: false
    };
  }
  switchPayments = () => {
    const { patterns } = this.state;
    const { fetchPayments } = this.props;

    !patterns
      ? fetchPayments({ paymentType: "Wzór" })
      : fetchPayments({ paymentType: "Faktura" });

    this.setState({
      patterns: !patterns
    });
  };
  render() {
    const { patterns } = this.state;
    return (
      <StyledPaymentContainer>
        <div className="panel-box">
          {patterns ? <h1>Lista Wzorów Faktur</h1> : <h1>Lista Faktur </h1>}
          {patterns ? <PaymentsGeneratorContainer /> : null}
          <form className="task-switcher">
            <label htmlFor="">Wzory faktur:</label>
            <label className="switch">
              <input
                className="switch-input"
                type="checkbox"
                onClick={this.switchPayments}
              />
              <span
                className="switch-label"
                data-on="Ukryj"
                data-off="Pokaż"
              ></span>
              <span className="switch-handle"></span>
            </label>
          </form>
        </div>
        <PaymentsList />
      </StyledPaymentContainer>
    );
  }
}

export default connect(null, { fetchPayments })(PaymentsContainer);
