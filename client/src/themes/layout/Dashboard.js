import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import io from "socket.io-client";

import { logoutUser } from "../../store/Users/actions";
import Tasks from "../../root/Tasks";
import MessangersContainer from "../../store/Messangers/components/MessangersContainer";
import MessagesAlertList from "../../store/Messages/components/MessagesAlertList";

import { updateMessanger } from "../../store/Messangers/actions";
import { updateAlertMessages } from "../../store/Messages/actions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { updateMessanger, updateAlertMessages } = this.props;
    // const port = process.env.PORT || 5000;
    // console.log("port", port);
    if (!this.socket) {
      this.socket = io();
      this.socket.on("chat:message", function(msg) {
        updateMessanger(msg);
        updateAlertMessages({ type: "messanger", data: msg });
      });
    }
  }
  logoutUserHandler = async () => {
    const { logoutUser } = this.props;
    const reload = () => {
      window.location.href = "/";
    };
    await logoutUser();
    await reload();
  };
  render() {
    const { loggedUser } = this.props;
    return (
      <div>
        {loggedUser.status !== "Klient" ? <MessagesAlertList /> : null}
        <div className="logged-user">
          Witaj:{" "}
          {loggedUser ? `${loggedUser.name} / ${loggedUser.status}` : null}
        </div>
        {loggedUser.status !== "Klient" ? (
        <Link className="btn btn-default" to="/messanger">
          Messanger
        </Link>
        ) : null}

        <Link className="btn btn-default" to="/tasks">
          Zadania
        </Link>
        <button className="btn btn-default" onClick={this.logoutUserHandler}>
          Logout
        </button>
        <div className="container">
          <Route exact path="/messanger" component={MessangersContainer} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/" component={Tasks} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, {
  logoutUser,
  updateMessanger,
  updateAlertMessages
})(Dashboard);
