import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import io from "socket.io-client";

import { StyledMessangersForm } from "../styles/StyledMessangersForm";

class MessangersAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    if (!this.socket) {
      this.socket = io();
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
      topic: "default",
      createAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
    };
    this.socket.emit("chat:message", data);
    this.setState({
      message: ""
    });
  };

  render() {
    const { message } = this.state;
    return (
      <StyledMessangersForm>
        <div className="messanger-form-box">
          <form action="">
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="message"
                value={message}
                className="form-control write_msg"
                placeholder="Wpisz wiadomość"
              />
            </div>
            <div className="form-group">
              <button
                onClick={this.addHandler}
                className="btn btn-primary float-right glyphicon glyphicon-send"
                type="submit"
                value="dodaj"
              ></button>
            </div>
          </form>
        </div>
      </StyledMessangersForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user,
    messangers: state.messangers.messangers
  };
};

export default connect(mapStateToProps, {})(MessangersAddForm);
