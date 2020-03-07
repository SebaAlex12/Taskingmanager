import React, { Component } from "react";

import { years, months } from "../../ini";

import { StyledPaymentGeneratorSelectForm } from "../styles/StyledPaymentGeneratorSelectForm";

class PaymentsGeneratorSelectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      month: ""
    };
  }
  onChangeSelect = event => {
    const { onChangeFormHandler } = this.props;
    onChangeFormHandler(event);
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  render() {
    const { year, month } = this.state;

    return (
      <StyledPaymentGeneratorSelectForm>
        <div className="payment-select-form-box">
          <form action="">
            <div className="form-group">
              <select
                className="form-control"
                onChange={this.onChangeSelect}
                name="month"
                required
              >
                <option value="">Wybierz miesiąc</option>
                {months
                  ? months.map(item => {
                      let option = "";
                      option = (
                        <option
                          key={item._id}
                          value={item.name}
                          selected={item.name === month ? "selected" : null}
                        >
                          {item.name}
                        </option>
                      );
                      return option;
                    })
                  : null}
              </select>
            </div>
            <div className="form-group">
              <select
                className="form-control"
                onChange={this.onChangeSelect}
                name="year"
                required
              >
                <option value="">Wybierz rok</option>
                {years
                  ? years.map(item => {
                      let option = "";
                      option = (
                        <option
                          key={item._id}
                          value={item.name}
                          selected={item.name === year ? "selected" : null}
                        >
                          {item.name}
                        </option>
                      );
                      return option;
                    })
                  : null}
              </select>
            </div>
            {/* <div className="form-group">
              <input
                onClick={showPaymentGeneratorModal}
                className="btn btn-primary float-right"
                type="submit"
                value="generuj"
              />
            </div> */}
          </form>
        </div>
      </StyledPaymentGeneratorSelectForm>
    );
  }
}
export default PaymentsGeneratorSelectForm;
