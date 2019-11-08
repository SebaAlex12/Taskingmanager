import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions";

class RegistryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      status: ""
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
  registerHandler = event => {
    event.preventDefault();
    const { registerUser } = this.props;
    registerUser(this.state);
  };
  render() {
    const statuses = [
      {
        _id: 1,
        name: "Administrator"
      },
      {
        _id: 2,
        name: "Pracownik"
      }
    ];
    return (
      <div className="registry-form-box mt-3 mb-3">
        <form action="post">
          <div className="form-group form-row">
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="text"
              name="name"
              placeholder="Nazwa"
              required
            />
          </div>
          <div className="form-group form-row">
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="text"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group form-row">
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="password"
              name="password"
              placeholder="Hasło"
              required
            />
          </div>
          <div className="form-group form-row">
            <select
              className="form-control"
              onChange={this.onChangeSelect}
              name="status"
              required
            >
              <option value="">Status</option>
              {statuses
                ? statuses.map(status => {
                    return (
                      <option key={status._id} value={status.name}>
                        {status.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="form-group">
            <input
              onClick={this.registerHandler}
              className="btn btn-primary float-right"
              type="submit"
              value="dodaj"
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { registerUser }
)(RegistryForm);
