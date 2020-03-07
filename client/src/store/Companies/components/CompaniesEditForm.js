import React, { Component } from "react";
import { connect } from "react-redux";

import { updateCompany } from "../actions";
import { updateMessages } from "../../Messages/actions";

class CompaniesEditFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
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
  componentDidMount() {
    const {
      item: {
        _id,
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
      }
    } = this.props;
    this.setState({
      _id,
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
    });
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
  updateHandler = event => {
    const { updateCompany, updateMessages } = this.props;
    const {
      _id,
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
      _id,
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
    const response = updateCompany(data);
    if (response) {
      updateMessages([{ name: "Firmy" }, { value: "opis został zmieniony" }]);
    }
    event.preventDefault();
  };
  toggleClassHandler = event => {
    event.preventDefault();
    event.target.classList.toggle("active");
  };
  render() {
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
    return (
      <div className="company-update-form-box">
        <form action="">
          <div className="form-group">
            <input
              onChange={this.onChangeInput}
              type="text"
              name="name"
              value={name}
              className="form-control"
              placeholder="Nazwa"
              title="Nazwa firmy"
              disabled
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Adres</label>
            <div className="form-content">
              {/* <i
                className="show-hide-button glyphicon glyphicon-eye-open"
                onClick={this.toggleClassHandler}
              ></i>
              <div className="glass">dane ukryte</div> */}
              <input
                onChange={this.onChangeInput}
                type="text"
                name="address"
                value={address}
                className="form-control"
                placeholder="Adres"
                title="Adres firmy"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">NIP</label>
            <div className="form-content">
              {/* <i
                className="show-hide-button glyphicon glyphicon-eye-open"
                onClick={this.toggleClassHandler}
              ></i>
              <div className="glass">dane ukryte</div> */}
              <input
                onChange={this.onChangeInput}
                type="text"
                name="NIP"
                value={NIP}
                className="form-control"
                placeholder="NIP"
                title="NIP firmy"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Adres strony internetowej</label>
            <div className="form-content">
              {/* <i
                className="show-hide-button glyphicon glyphicon-eye-open"
                onClick={this.toggleClassHandler}
              ></i>
              <div className="glass">dane ukryte</div> */}
              <input
                onChange={this.onChangeInput}
                type="text"
                name="website"
                value={website}
                className="form-control"
                placeholder="Strona internetow"
                title="Strona internetow"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Telefon</label>
            <div className="form-content">
              {/* <i
                className="show-hide-button glyphicon glyphicon-eye-open"
                onClick={this.toggleClassHandler}
              ></i>
              <div className="glass">dane ukryte</div> */}
              <input
                onChange={this.onChangeInput}
                type="text"
                name="phone"
                value={phone}
                className="form-control"
                placeholder="Telefon"
                title="Telefon"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Fax</label>
            <div className="form-content">
              {/* <i
                className="show-hide-button glyphicon glyphicon-eye-open"
                onClick={this.toggleClassHandler}
              ></i>
              <div className="glass">dane ukryte</div> */}
              <input
                onChange={this.onChangeInput}
                type="text"
                name="fax"
                value={fax}
                className="form-control"
                placeholder="Fax"
                title="Fax"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Adres email</label>
            <div className="form-content">
              {/* <i
                className="show-hide-button glyphicon glyphicon-eye-open"
                onClick={this.toggleClassHandler}
              ></i>
              <div className="glass">dane ukryte</div> */}
              <input
                onChange={this.onChangeInput}
                type="text"
                name="mail"
                value={mail}
                className="form-control"
                placeholder="Adres email"
                title="Adres email"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Nazwa banku</label>
            <div className="form-content">
              {/* <i
                className="show-hide-button glyphicon glyphicon-eye-open"
                onClick={this.toggleClassHandler}
              ></i>
              <div className="glass">dane ukryte</div> */}
              <input
                onChange={this.onChangeInput}
                type="text"
                name="bankName"
                value={bankName}
                className="form-control"
                placeholder="Nazwa banku"
                title="Nazwa banku"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Numer konta banowego</label>
            <div className="form-content">
              {/* <i
                className="show-hide-button glyphicon glyphicon-eye-open"
                onClick={this.toggleClassHandler}
              ></i>
              <div className="glass">dane ukryte</div> */}
              <input
                onChange={this.onChangeInput}
                type="text"
                name="bankAcount"
                value={bankAcount}
                className="form-control"
                placeholder="Numer konta"
                title="Numer konta"
              />
            </div>
          </div>
          <div className="form-group textarea">
            <label htmlFor="">Notatka</label>
            <div className="form-content">
              {/* <i
                className="show-hide-button glyphicon glyphicon-eye-open"
                onClick={this.toggleClassHandler}
              ></i>
              <div className="glass">dane ukryte</div> */}
              <textarea
                onChange={this.onChangeInput}
                type="text"
                name="description"
                value={description}
                className="form-control"
                rows="5"
                placeholder="Opis"
                title="Opis"
              />
            </div>
          </div>
          <div className="form-group button">
            <input
              onClick={this.updateHandler}
              className="btn btn-primary float-right"
              type="submit"
              value="zapisz"
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, { updateCompany, updateMessages })(
  CompaniesEditFrom
);
