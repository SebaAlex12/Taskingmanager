import React, { Component } from "react";
import { connect } from "react-redux";

import { logoutUser } from "../../store/Users/actions";
import TasksList from "../../store/Tasks/components/TasksList";

interface Iprops {
  logoutUser(): void;
}

interface Istate {}

class Dashboard extends Component<Iprops, Istate> {
  logoutUserHandler = async () => {
    const { logoutUser } = this.props;
    const reload = () => {
      window.location.href = "/";
    };
    await logoutUser();
    await reload();
  };
  render() {
    return (
      <div>
        <button onClick={this.logoutUserHandler}>Logout</button>
        <TasksList />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
