import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import isEmpty from "../../../common/is-empty";
import { addPayment } from "../actions";
import { StyledPaymentForm } from "../styles/StyledPaymentForm";

class PaymentsAddForm extends Component {
  constructor(props) {
    super(props);

    const { contractor, companies, loggedUser } = this.props;

    let company = companies.filter(
      company => company.name === loggedUser.company
    );
    company = company[0];

    // console.log("contractor", contractor);
    // console.log("company", company[0]);

    // _id: "5e4ea751b954ee1bfc306e2f"
    // name: "konrahent nazwa"
    // address: "konrahent adres"
    // NIP: "konrahent nip"
    // KRS: "konrahent krs"
    // website: "konrahent website"
    // phone: "telefon konrahent"
    // fax: "konrahent fax"
    // mail: "konrahent email"
    // description: "konrahent opis"

    //     _id: "5e4f6ffd87ee9612c86985c8"
    // name: "Blumoseo"
    // address: "dluga, 2"
    // NIP: "fghr"
    // website: "fgheh"
    // phone: "444444"
    // fax: "hreh"
    // mail: "zbyszek@wp.pl"
    // bankName: "rthre"
    // bankAcount: "hrt"
    // description: "herhr"

    this.state = {
      paymentNumber: "12345",
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
      netValue: 123,
      grossValue: 345,
      status: "utworzona",
      paymentMethod: "przelew",
      termAt: null,
      createdBy: loggedUser.name,
      createdAt: "234"
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
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  addHandler = event => {
    const { addPayment } = this.props;
    const {
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
      termAt
    } = this.state;

    const data = {
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
      termAt,
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
    };

    event.preventDefault();
    console.log("component", data);
    addPayment(data);
  };
  render() {
    const {
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
      paymentMethod,
      termAt,
      createdAt
    } = this.state;

    console.log("state payment", this.state);

    return (
      <StyledPaymentForm>
        <div className="payment-add-form-box">
          <form action="">
            <div className="group">
              <label htmlFor="">Numer płatności</label>
              <div className="payment-content">
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={paymentNumber}
                    type="text"
                    name="paymentNumber"
                    className="form-control"
                    placeholder="Numer płatności"
                    title="Numer płatności Kontrahenta"
                    required
                  />
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
              </div>
            </div>

            <div className="form-group description">
              <textarea
                onChange={this.onChangeInput}
                type="text"
                name="description"
                className="form-control"
                rows="5"
                placeholder="Opis"
                title="Opis"
                required
              />
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
    companies: state.companies.companies
  };
};

export default connect(mapStateToProps, { addPayment })(PaymentsAddForm);
