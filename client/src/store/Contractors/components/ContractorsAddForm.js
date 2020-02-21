import React, { Component } from "react";
import { connect } from "react-redux";

import { addContractor } from "../actions";
import { StyledContractorForm } from "../styles/StyledContractorForm";

class ContractorsAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      NIP: "",
      KRS: "",
      website: "",
      phone: "",
      fax: "",
      mail: "",
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
    const { addContractor } = this.props;
    const {
      name,
      address,
      NIP,
      KRS,
      website,
      phone,
      fax,
      mail,
      description
    } = this.state;

    const data = {
      name,
      address,
      NIP,
      KRS,
      website,
      phone,
      fax,
      mail,
      description
    };

    event.preventDefault();

    addContractor(data);
  };
  render() {
    return (
      <StyledContractorForm>
        <div className="contractor-add-form-box">
          <form action="">
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="name"
                className="form-control"
                placeholder="Nazwa"
                title="Nazwa Kontrahenta"
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
                title="Adres Kontrahenta"
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
                title="NIP Kontrahenta"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="KRS"
                className="form-control"
                placeholder="KRS"
                title="KRS Kontrahenta"
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
                title="Website Kontrahenta"
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
                title="Telefon Kontrahenta"
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
                title="Fax Kontrahenta"
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
                title="Email Kontrahenta"
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
      </StyledContractorForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, { addContractor })(ContractorsAddForm);
