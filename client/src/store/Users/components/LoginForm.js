import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      // message: "",
      logged: false,
      loading: false,
      errors: null
    };
  }
  onChangeInput = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  componentDidUpdate(prevProps){
    const { loading, errors } = this.props;
    // check if loading has been changed
    if(prevProps.loading !== loading){
      // if loading has been changed to false redirect and check jwt
      if(loading === false){
         // setTimeout(function () {
            window.location.href = "/";
        //  }, 4000);
      }
      // if errors has been changed get errors message
      if(errors !== null){
        this.setState({
          errors: errors,
          loading: loading
        });
      }else{
        this.setState({
          loading:loading
        })
      }
    }
  }
  loginHandler = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { loginUser } = this.props;
    loginUser({ email: email, password: password });
  };
  render() {
    const { message } = this.state;
    console.log("state",this.state);
    return (
      <div
        className="login-form-box mb-3 mt-3"
        style={{
          marginTop: "150px",
          width: "300px",
          marginLeft: "auto",
          marginRight: "auto",
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

const mapStateToProps = (state) => {
  return {
    loading: state.users.loading,
    errors: state.users.errors
  };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
