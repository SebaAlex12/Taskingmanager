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
import Patterns from "../../root/Patterns";
import MailsListContainer from "../../store/Mails/components/MailsListContainer";
import CalendarContainer from "../../store/Calendar/components/CalendarContainer";
import Interview from "../../store/Cameras/components/Interview";
import MessagesAlertList from "../../store/Messages/components/MessagesAlertList";
import Catalogs from "../../root/Catalogs";
import ImportBasic from "../../store/Import/components/ImportBasic";

// import Preloader from "../../common/Preloader";
import { updateMessenger } from "../../store/Messengers/actions";
import { updateAlertMessages } from "../../store/Messages/actions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { updateMessenger, updateAlertMessages, loggedUser } = this.props;
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
        <Link className="btn btn-default" to="/calendar">
          Kalendarz
        </Link>
        {loggedUser.status === "Administrator" ? (
          <React.Fragment>
            {
            <Link className="btn btn-default" to="/imports">
              Importy
            </Link>
            /*<Link className="btn btn-default" to="/patterns">
              Szablony
            </Link>
            <Link className="btn btn-default" to="/seo">
              SEO
            </Link>
            <Link className="btn btn-default" to="/payments">
              Płatności
            </Link>
            <Link className="btn btn-default" to="/catalogs">
              Katalogi
            </Link>
            <Link className="btn btn-default" to="/cameras">
              Kamery
            </Link> */}
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
          <Route exact path="/messenger" component={Messengers} />
          <Route exact path="/mails" component={MailsListContainer} />
          <Route exact path="/imports" component={ImportBasic} />
          <Route exact path="/calendar" component={CalendarContainer} />
          {loggedUser.status === "Administrator" ? (
            <React.Fragment>
                <Route exact path="/patterns" component={Patterns} />
                <Route exact path="/payments" component={Payments} />
                <Route exact path="/seo" component={Seo} />
                <Route exact path="/cameras" component={Interview} />
                <Route exact path="/catalogs" component={Catalogs} />
            </React.Fragment>
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
