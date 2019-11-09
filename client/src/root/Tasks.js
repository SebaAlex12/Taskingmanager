import React, { Component } from "react";
import { connect } from "react-redux";

import TasksListContainer from "../store/Tasks/components/TasksListContainer";
// import TasksList from "../store/Tasks/components/TasksList";
import UsersList from "../store/Users/components/UsersList";
import ProjectsList from "../store/Projects/components/ProjectsList";
import FiltersContainer from "../store/Filters/components/FiltersContainer";

class Tasks extends Component {
  render() {
    const { loggedUser } = this.props;
    return (
      <div className="tasks-box">
        <ProjectsList />
        {loggedUser.status === "Administrator" ? <UsersList /> : null}
        {/* <TasksList /> */}
        <FiltersContainer />
        <TasksListContainer />
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
  {}
)(Tasks);
