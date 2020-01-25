import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      logged: false
    };
  }
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  async checkUser(data) {
    const { loginUser } = this.props;
    const response = await loginUser(data);
    this.setState({
      ...this.state,
      logged: true
    });
    // console.log("fffff");
    return response;
  }
  loginHandler = event => {
    event.preventDefault();
    const { loginUser } = this.props;
    const { email, password } = this.state;

    // const response = await loginUser({ email: email, password: password });
    let response = false;
    response = this.checkUser({ email: email, password: password });
    // console.log(response);
    // if (response == true) {
    //   this.reload();
    // }
    // const reload = await reload();

    this.setState({
      message: "Logowanie do systemu..."
    });

    if (response) {
      console.log("response", response);
      setTimeout(function() {
        window.location.href = "/";
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

export default connect(mapStateToProps, { loginUser })(LoginForm);
