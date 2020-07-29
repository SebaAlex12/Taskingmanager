import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
// import io from "socket.io-client";
import { socket } from "../../store/ini";

import { logoutUser } from "../../store/Users/actions";
import Tasks from "../../root/Tasks";
import Payments from "../../root/Payments";
import Messengers from "../../root/Messengers";
import Seo from "../../root/Seo";
import Calendar from "../../root/Calendar";
import Patterns from "../../root/Patterns";
import MessagesAlertList from "../../store/Messages/components/MessagesAlertList";
import MailsListContainer from "../../store/Mails/components/MailsListContainer";
import Interview from "../../store/Cameras/components/Interview";

// import Preloader from "../../common/Preloader";
import { updateMessenger } from "../../store/Messengers/actions";
import { updateAlertMessages } from "../../store/Messages/actions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { updateMessenger, updateAlertMessages, loggedUser } = this.props;

    // const port = process.env.PORT || 5000;
    // console.log("port", port);
    // if (!this.socket) {
    // this.socket = io();
    socket.on("chat", function (msg) {
      let users = msg.to.split(",");
      if (users.includes(loggedUser.name)) {
        updateMessenger(msg);
        if (msg.from !== loggedUser.name) {
          updateAlertMessages({ type: "messenger", data: msg });
        }
      }
    });
    // }
  }
  logoutUserHandler = async () => {
    const { logoutUser } = this.props;
    localStorage.removeItem("companyName");
    const reload = () => {
      window.location.href = "/";
    };
    await logoutUser();
    await reload();
  };
  render() {
    const { loggedUser } = this.props;

    return (
      <div className="dashboard-box">
        {/* <Preloader /> */}
        <MessagesAlertList />
        <div className="logged-user">
          Witaj:{" "}
          {loggedUser
            ? `${loggedUser.name} / ${loggedUser.status} : [ firma: ${loggedUser.company}]`
            : null}
        </div>
        <Link className="btn btn-default" to="/messenger">
          Komunikator
        </Link>
        <Link className="btn btn-default" to="/tasks">
          Zadania
        </Link>
        <Link className="btn btn-default" to="/patterns">
          Szablony
        </Link>
        <Link className="btn btn-default" to="/calendar">
          Kalendarz
        </Link>
        {loggedUser.status === "Administrator" ? (
          <React.Fragment>
            <Link className="btn btn-default" to="/seo">
              SEO
            </Link>
            <Link className="btn btn-default" to="/payments">
              Płatności
            </Link>
            <Link className="btn btn-default" to="/cameras">
              Kamery
            </Link>
          </React.Fragment>
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
          <Route exact path="/patterns" component={Patterns} />
          <Route exact path="/messenger" component={Messengers} />
          <Route exact path="/mails" component={MailsListContainer} />
          <Route exact path="/cameras" component={Interview} />
          <Route exact path="/seo" component={Seo} />
          <Route exact path="/calendar" component={Calendar} />
          {loggedUser.status === "Administrator" ? (
            <Route exact path="/payments" component={Payments} />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
  };
};

export default connect(mapStateToProps, {
  logoutUser,
  updateMessenger,
  updateAlertMessages,
})(Dashboard);
