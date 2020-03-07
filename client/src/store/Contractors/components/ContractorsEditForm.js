import React, { Component } from "react";
import { connect } from "react-redux";

import { updateContractor } from "../actions";
import { updateMessages } from "../../Messages/actions";

class ContractorsEditFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
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
  componentDidMount() {
    const {
      item: {
        _id,
        name,
        address,
        NIP,
        KRS,
        website,
        phone,
        fax,
        mail,
        description
      }
    } = this.props;
    this.setState({
      _id,
      name,
      address,
      NIP,
      KRS,
      website,
      phone,
      fax,
      mail,
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
    const { updateContractor, updateMessages } = this.props;
    const {
      _id,
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
      _id,
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
    const response = updateContractor(data);
    if (response) {
      updateMessages([
        { name: "Konrahent" },
        { value: "opis został zmieniony" }
      ]);
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
      KRS,
      website,
      phone,
      fax,
      mail,
      description
    } = this.state;
    return (
      <div className="contractor-update-form-box">
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
            <label htmlFor="">KRS</label>
            <div className="form-content">
              {/* <i
                className="show-hide-button glyphicon glyphicon-eye-open"
                onClick={this.toggleClassHandler}
              ></i>
              <div className="glass">dane ukryte</div> */}
              <input
                onChange={this.onChangeInput}
                type="text"
                name="KRS"
                value={KRS}
                className="form-control"
                placeholder="KRS"
                title="KRS firmy"
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

export default connect(mapStateToProps, { updateContractor, updateMessages })(
  ContractorsEditFrom
);
