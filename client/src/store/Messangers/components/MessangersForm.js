import React, { Component } from "react";
import { connect } from "react-redux";

import io from "socket.io-client";

import { updateMessanger } from "../actions";
import { StyledMessangers } from "../styles/StyledMessangers";

class MessangersForm extends Component {
  constructor(props) {
    super(props);
    const { updateMessanger } = this.props;
    this.state = {
      message: ""
    };
    const port = "" || 5000;
    // console.log("port", port);
    if (!this.socket) {
      this.socket = io(":" + port);
      this.socket.on("chat:message", function(msg) {
        updateMessanger(msg);
      });
    }
  }

  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  addHandler = event => {
    event.preventDefault();
    const { message } = this.state;
    const { loggedUser } = this.props;
    const data = {
      from: loggedUser.name,
      msg: message,
      topic: "default"
    };
    this.socket.emit("chat:message", data);
  };

  render() {
    return (
      <StyledMessangers>
        <div className="messanger-form-box">
          <form action="">
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="message"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                onClick={this.addHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledMessangers>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user,
    messangers: state.messangers.messangers
  };
};

export default connect(mapStateToProps, { updateMessanger })(MessangersForm);
