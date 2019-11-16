import React, { Component } from "react";
import { connect } from "react-redux";

import { registerUser } from "../actions";
import { user_statuses } from "../../ini";

import { updateMessages } from "../../Messages/actions";

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
    const response = registerUser(this.state);
    if (response) {
      updateMessages([{ name: "Użytkownik" }, { value: "użytkownik dodany" }]);
    }
  };
  render() {
    return (
      <div
        className="registry-form-box mt-3 mb-3"
        style={{ backgroundColor: "#fff", padding: "5px" }}
      >
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
              {user_statuses
                ? user_statuses.map(status => {
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

export default connect(mapStateToProps, { registerUser, updateMessages })(
  RegistryForm
);
