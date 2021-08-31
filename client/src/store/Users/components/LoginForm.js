import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions";

import { compareErrors } from "../../../common/tools";
import MessagesAlertInfo from "../../Messages/components/MessagesAlertInfo";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: []
    };
  }
  onChangeInput = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  componentDidUpdate(prevProps,prevState){
    const { loading, errors } = this.props;
// console.log("update");
    // check if loading has been changed
    if(prevProps.loading !== loading){
      // if loading has been changed to false and nothing chanched in errors report redirect and check jwt
      if(loading === false && compareErrors(prevState.errors, errors) === true){
          window.location.href = "/";
      }
      this.setState({
          loading: loading
      })
    }
    // console.log("errors",errors);
    // console.log("compare arr",compareErrors(prevState.errors, errors));
    // errors has been changed get errors message
    if(compareErrors(prevState.errors, errors) === false){
      // console.log("setstate");
          this.setState({
              errors: errors
        });
    }
  }
  loginHandler = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { loginUser } = this.props;
    loginUser({ email: email, password: password });
  };
  render() {
    const { errors } = this.state;

    return (
    <React.Fragment>
      { errors.length > 0 && <MessagesAlertInfo errors={errors} /> }
      <div
        className="login-form-box mb-3 mt-3"
        style={{
          marginTop: "150px",
          width: "300px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.users.loading,
    errors: state.users.errors,
    users: state.users
  };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
