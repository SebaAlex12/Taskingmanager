import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import io from "socket.io-client";

import { logoutUser } from "../../store/Users/actions";
import Tasks from "../../root/Tasks";
import Payments from "../../root/Payments";
import Messengers from "../../root/Messengers";
import MessagesAlertList from "../../store/Messages/components/MessagesAlertList";
import MailsListContainer from "../../store/Mails/components/MailsListContainer";

// import Preloader from "../../common/Preloader";
import { updateMessenger } from "../../store/Messengers/actions";
import { updateAlertMessages } from "../../store/Messages/actions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { updateMessenger, updateAlertMessages, loggedUser } = this.props;

    // const port = process.env.PORT || 5000;
    // console.log("port", port);
    if (!this.socket) {
      this.socket = io();
      this.socket.on("chat:message", function(msg) {
        let users = msg.to.split(",");
        if (users.includes(loggedUser.name)) {
          updateMessenger(msg);
          if (msg.from !== loggedUser.name) {
            updateAlertMessages({ type: "messenger", data: msg });
          }
        }
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
        {/* <Preloader /> */}
        <MessagesAlertList />
        <div className="logged-user">
          Witaj:{" "}
          {loggedUser ? `${loggedUser.name} / ${loggedUser.status}` : null}
        </div>
        <Link className="btn btn-default" to="/messenger">
          Komunikator
        </Link>
        <Link className="btn btn-default" to="/tasks">
          Zadania
        </Link>
        {loggedUser.status === "Administrator" ? (
          <Link className="btn btn-default" to="/payments">
            Płatności
          </Link>
        ) : null}
        {/* <Link className="btn btn-default" to="/mails">
          Poczta
        </Link> */}
        <button className="btn btn-default" onClick={this.logoutUserHandler}>
          Logout
        </button>
        <div className="container">
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/" component={Tasks} />
          <Route exact path="/messenger" component={Messengers} />
          <Route exact path="/mails" component={MailsListContainer} />
          {loggedUser.status === "Administrator" ? (
            <Route exact path="/payments" component={Payments} />
          ) : null}
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
  updateMessenger,
  updateAlertMessages
})(Dashboard);
