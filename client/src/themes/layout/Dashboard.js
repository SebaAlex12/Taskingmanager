import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";

import { logoutUser } from "../../store/Users/actions";
import Tasks from "../../root/Tasks";

class Dashboard extends Component {
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
        <div className="logged-user">
          Welcome: {loggedUser ? loggedUser.name : null}
        </div>
        <Link className="btn btn-default" to="/tasks">
          Zadania
        </Link>
        <button className="btn btn-default" onClick={this.logoutUserHandler}>
          Logout
        </button>
        <div className="container">
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

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
