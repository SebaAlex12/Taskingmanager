import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import {
  years,
  months,
  payment_types,
  payment_methods,
  payment_cycles
} from "../../ini";
import { patternInvoiceNumberGenerator } from "../common/functions";
import {
  addPayment,
  fetchLastInsertInvoice,
  fetchLastInsertPattern
} from "../actions";
import { StyledPaymentForm } from "../styles/StyledPaymentForm";

class PaymentsAddForm extends Component {
  constructor(props) {
    super(props);

    const { contractor, companies, loggedUser } = this.props;

    let company = companies.filter(
      company => company.name === loggedUser.company
    );
    company = company[0];

    this.state = {
      paymentNumber: "",
      paymentMonth: "Styczeń",
      paymentYear: "2020",
      paymentCycle: "Miesięczna",
      paymentType: "Wzór",
      companyName: company.name ? company.name : "",
      contractorName: contractor.name ? contractor.name : "",
      companyAddress: company.address ? company.address : "",
      contractorAddress: contractor.address ? contractor.address : "",
      companyNIP: company.NIP ? company.NIP : "",
      contractorNIP: contractor.NIP ? contractor.NIP : "",
      companyWebsite: company.website ? company.website : "",
      companyPhone: company.phone ? company.phone : "",
      contractorPhone: contractor.phone ? contractor.phone : "",
      companyMail: company.mail ? company.mail : "",
      contractorMail: contractor.mail ? contractor.mail : "",
      companyBankName: company.bankName ? company.bankName : "",
      companyBankAcount: company.bankAcount ? company.bankAcount : "",
      description: "",
      netValue: "",
      grossValue: "",
      status: "utworzona",
      paymentMethod: "Przelew",
      termAt: "",
      createdBy: loggedUser.name
    };
  }
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  onChangeSelect = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
      paymentNumber: document.getElementById("paymentNumber").value
    });
  };
  addHandler = event => {
    const { addPayment } = this.props;
    const {
      paymentNumber,
      paymentMonth,
      paymentYear,
      paymentType,
      paymentCycle,
      paymentPattern,
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
      termAt
    } = this.state;

    const data = {
      paymentNumber,
      paymentMonth,
      paymentYear,
      paymentType,
      paymentCycle,
      paymentPattern,
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
      termAt,
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
    };
    const { fetchLastInsertInvoice, fetchLastInsertPattern } = this.props;
    event.preventDefault();
    console.log("add form data", data);
    const result = addPayment(data);
    if (result) {
      fetchLastInsertInvoice();
      fetchLastInsertPattern();
    }
  };
  render() {
    const {
      paymentNumber,
      paymentMonth,
      paymentYear,
      paymentType,
      paymentCycle,
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
      paymentMethod,
      termAt
    } = this.state;
    const { lastInsertInvoice, lastInsertPattern } = this.props;

    let number = "";
    const monthSelected = months.filter(m => m.name === paymentMonth);
    // console.log("months", months);
    // console.log("month selected", monthSelected[0].value);
    if (paymentType === "Wzór" && lastInsertPattern === null) {
      number = "P1/M" + monthSelected[0].value + "/Y" + paymentYear;
    } else if (paymentType === "Faktura" && lastInsertInvoice === null) {
      number = "I1/M" + monthSelected[0].value + "/Y" + paymentYear;
    } else {
      number = patternInvoiceNumberGenerator(
        lastInsertPattern.paymentNumber,
        lastInsertInvoice.paymentNumber,
        paymentType === "Wzór" ? true : false,
        paymentType === "Faktura" ? true : false,
        paymentYear,
        paymentMonth
      );
    }

    return (
      <StyledPaymentForm>
        <div className="payment-add-form-box">
          <form action="">
            <div className="group">
              <label htmlFor="">Numer płatności</label>
              <div className="payment-content">
                <div className="form-group">
                  <input
                    id="paymentNumber"
                    onChange={this.onChangeInput}
                    value={number ? number : paymentNumber}
                    type="text"
                    name="paymentNumber"
                    className="form-control"
                    placeholder="Numer płatności"
                    title="Numer płatności Kontrahenta"
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={this.onChangeSelect}
                    name="paymentMonth"
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
                              selected={
                                item.name === paymentMonth ? "selected" : null
                              }
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
                    name="paymentYear"
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
                              defaultValue={
                                item.name === paymentYear ? "selected" : null
                              }
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
                    name="paymentType"
                    required
                  >
                    <option value="">Wybierz rodzaj</option>
                    {payment_types
                      ? payment_types.map(item => {
                          let option = "";
                          option = (
                            <option
                              key={item._id}
                              value={item.name}
                              defaultValue={
                                item.name === paymentType ? "selected" : null
                              }
                            >
                              {item.name}
                            </option>
                          );
                          return option;
                        })
                      : null}
                  </select>
                </div>
              </div>
            </div>
            <div className="group">
              <label htmlFor="">Dane firmy</label>
              <div className="payment-content">
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={companyName}
                    type="text"
                    name="companyName"
                    className="form-control"
                    placeholder="Nazwa firmy"
                    title="Nazwa Kontrahenta"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={companyAddress}
                    type="text"
                    name="companyAddress"
                    className="form-control"
                    placeholder="Adres firmy"
                    title="Adres firmy"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={companyNIP}
                    type="text"
                    name="companyNIP"
                    className="form-control"
                    placeholder="NIP"
                    title="NIP"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={companyWebsite}
                    type="text"
                    name="companyWebsite"
                    className="form-control"
                    placeholder="Strona www"
                    title="Strona www"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={companyPhone}
                    type="text"
                    name="companyPhone"
                    className="form-control"
                    placeholder="Numer telefonu"
                    title="Numer telefonu"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={companyMail}
                    type="text"
                    name="companyMail"
                    className="form-control"
                    placeholder="Adres email"
                    title="Adres email"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={companyBankName}
                    type="text"
                    name="companyBankName"
                    className="form-control"
                    placeholder="Nazwa banku"
                    title="Nazwa banku"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={companyBankAcount}
                    type="text"
                    name="companyBankAcount"
                    className="form-control"
                    placeholder="Numer konta bankowego"
                    title="Numer konta bankowego"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="group">
              <label htmlFor="">Dane kontrahenta</label>
              <div className="payment-content">
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={contractorName}
                    type="text"
                    name="contractorName"
                    className="form-control"
                    placeholder="Nazwa kontrahenta"
                    title="Nazwa Kontrahenta"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={contractorAddress}
                    type="text"
                    name="contractorAddress"
                    className="form-control"
                    placeholder="Adres kontrahenta"
                    title="Adres Kontrahenta"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={contractorNIP}
                    type="text"
                    name="contractorNIP"
                    className="form-control"
                    placeholder="NIP kontrahenta"
                    title="NIP Kontrahenta"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={contractorPhone}
                    type="text"
                    name="contractorPhone"
                    className="form-control"
                    placeholder="Numer telefonu kontrahenta"
                    title="Numer telefonu Kontrahenta"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={contractorMail}
                    type="text"
                    name="contractorMail"
                    className="form-control"
                    placeholder="Adres email kontrahenta"
                    title="Adres email Kontrahenta"
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={this.onChangeSelect}
                    name="paymentMethod"
                    required
                  >
                    <option value="">Wybierz metodę</option>
                    {payment_methods
                      ? payment_methods.map(item => {
                          let option = "";
                          option = (
                            <option
                              key={item._id}
                              value={item.name}
                              defaultValue={
                                item.name === paymentMethod ? "selected" : null
                              }
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
                    name="paymentCycle"
                    required
                  >
                    <option value="">Wybierz cykl</option>
                    {payment_cycles
                      ? payment_cycles.map(item => {
                          let option = "";
                          option = (
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
                          return option;
                        })
                      : null}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={termAt}
                    type="date"
                    name="termAt"
                    className="form-control"
                    placeholder="Termin płatności"
                    title="Termin płatności"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="group">
              <div className="payment-content">
                <div className="form-group description">
                  <textarea
                    onChange={this.onChangeInput}
                    type="text"
                    value={description}
                    name="description"
                    className="form-control"
                    rows="5"
                    placeholder="Opis"
                    title="Opis"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Kwota netto</label>
                  <input
                    onChange={this.onChangeInput}
                    value={netValue}
                    type="text"
                    name="netValue"
                    className="form-control"
                    placeholder="Kwota netto"
                    title="Kwota netto"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Kwota brutto</label>
                  <input
                    onChange={this.onChangeInput}
                    value={grossValue}
                    type="text"
                    name="grossValue"
                    className="form-control"
                    placeholder="Kwota brutto"
                    title="Kwota brutto"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group add">
              <input
                onClick={this.addHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledPaymentForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user,
    companies: state.companies.companies,
    lastInsertInvoice: state.payments.lastInsertInvoice,
    lastInsertPattern: state.payments.lastInsertPattern
  };
};

export default connect(mapStateToProps, {
  addPayment,
  fetchLastInsertInvoice,
  fetchLastInsertPattern
})(PaymentsAddForm);
