import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: ""
    };
  }
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  loginHandler = async event => {
    event.preventDefault();
    const { loginUser } = this.props;
    const { email, password } = this.state;
    const reload = () => {
      window.location.href = "/";
    };

    const response = await loginUser({ email: email, password: password });

    this.setState({
      message: "Logowanie do systemu..."
    });

    if (response) {
      setTimeout(function() {
        reload();
      }, 4000);
    }
  };
  render() {
    const { message } = this.state;
    return (
      <div
        className="login-form-box mb-3 mt-3"
        style={{
          marginTop: "150px",
          width: "300px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <div className="message">
          <div id="message">{message}</div>
        </div>
        <form action="post">
          <div className="form-group form-row">
            <label htmlFor="">Email:</label>
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="text"
              name="email"
            />
          </div>
          <div className="form-group form-row">
            <label htmlFor="">Hasło:</label>
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="password"
              name="password"
            />
          </div>
          <div className="form-group">
            <input
              onClick={this.loginHandler}
              className="btn btn-primary float-right"
              type="submit"
              value="zaloguj"
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
  { loginUser }
)(LoginForm);
