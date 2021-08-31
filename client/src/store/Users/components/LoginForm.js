import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions";

import { compareErrors } from "../../../common/tools";
import MessagesAlertInfo from "../../Messages/components/MessagesAlertInfo";
import LoaderInfo from "../../../common/LoaderInfo";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errors: []
    };
  }
  componentDidUpdate(prevProps,prevState){
    const { loading, errors } = this.props;
    console.log("update");
    // check if loading has been changed
    if(prevProps.loading !== loading){
      console.log("loading");
      // if loading has been changed to false and nothing chanched in errors report redirect and check jwt
      if(loading === false && compareErrors(prevState.errors, errors) === true){
          window.location.href = "/";
      }
      this.setState({
          loading: loading
      })
    }
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
    const { loginUser } = this.props;
    loginUser({ email: this.email.value, password: this.password.value });
  };
  render() {
    const { loading, errors } = this.state;
    console.log("render");
    return (
    <React.Fragment>
      { loading && <LoaderInfo>Trwa ładowanie strony...</LoaderInfo> }
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
              ref={(input) => this.email = input}
              className="form-control"
              type="text"
            />
          </div>
          <div className="form-group form-row">
            <label htmlFor="">Hasło:</label>
            <input
              ref={(input) => this.password = input}
              className="form-control"
              type="password"
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
