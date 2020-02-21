import React, { Component } from "react";
import { connect } from "react-redux";

import { addCompany } from "../actions";
import { StyledCompanyForm } from "../styles/StyledCompanyForm";

class CompaniesAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      NIP: "",
      website: "",
      phone: "",
      fax: "",
      mail: "",
      bankName: "",
      bankAcount: "",
      description: ""
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
    const { addCompany } = this.props;
    const {
      name,
      address,
      NIP,
      website,
      phone,
      fax,
      mail,
      bankName,
      bankAcount,
      description
    } = this.state;

    const data = {
      name,
      address,
      NIP,
      website,
      phone,
      fax,
      mail,
      bankName,
      bankAcount,
      description
    };

    event.preventDefault();

    addCompany(data);
  };
  render() {
    return (
      <StyledCompanyForm>
        <div className="company-add-form-box">
          <form action="">
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="name"
                className="form-control"
                placeholder="Nazwa"
                title="Nazwa Firmy"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="address"
                className="form-control"
                placeholder="Adres"
                title="Adres Firmy"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="NIP"
                className="form-control"
                placeholder="NIP"
                title="NIP Firmy"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="website"
                className="form-control"
                placeholder="Website"
                title="Website Firmy"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="phone"
                className="form-control"
                placeholder="Telefon"
                title="Telefon Firmy"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="fax"
                className="form-control"
                placeholder="Fax"
                title="Fax Firmy"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="mail"
                className="form-control"
                placeholder="Email"
                title="Email Firmy"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="bankName"
                className="form-control"
                placeholder="Nazwa banku"
                title="Nazwa banku Firmy"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="bankAcount"
                className="form-control"
                placeholder="Numer konta bankowego"
                title="Numer konta bankowego Firmy"
                required
              />
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
      </StyledCompanyForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, { addCompany })(CompaniesAddForm);
