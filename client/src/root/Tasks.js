import React, { Component } from "react";
import { connect } from "react-redux";

import TasksListContainer from "../store/Tasks/components/TasksListContainer";
// import TasksList from "../store/Tasks/components/TasksList";
import UsersList from "../store/Users/components/UsersList";
import ProjectsList from "../store/Projects/components/ProjectsList";
import FiltersContainer from "../store/Filters/components/FiltersContainer";

import { fetchFilters } from "../store/Filters/actions";
import { fetchProjects } from "../store/Projects/actions";
import { fetchTasks } from "../store/Tasks/actions";

class Tasks extends Component {
  componentDidMount() {
    const {
      fetchFilters,
      fetchProjects,
      fetchTasks,
      loggedUser: { status, name }
    } = this.props;
    fetchFilters();
    fetchProjects();

    let filters = this.props.filters ? this.props.filters : null;

    if (filters) {
      const { projectName, responsiblePerson } = filters;
      if (status === "Klient") {
        fetchTasks({ createdBy: name });
      } else if (status === "Pracownik") {
        fetchTasks({ responsiblePerson: name });
      } else {
        fetchTasks({ projectName, responsiblePerson });
      }
      this.setState({
        filters: {
          projectName,
          responsiblePerson
        }
      });
    }

    // if (filters) console.log("filters", filters);
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      fetchTasks,
      filters: { projectName, responsiblePerson }
    } = this.props;

    if (
      projectName !== prevProps.filters.projectName ||
      responsiblePerson !== prevProps.filters.responsiblePerson
    ) {
      // console.log("prev res person", prevProps.filters.responsiblePerson);
      // console.log("res pers", responsiblePerson);
      fetchTasks({ projectName, responsiblePerson });
      this.setState({
        filters: {
          projectName,
          responsiblePerson
        }
      });
    }
    // console.log("this props update", this.props);
  }
  render() {
    const { loggedUser } = this.props;
    return (
      <div className="tasks-box">
        {loggedUser.status !== "Klient" ? <ProjectsList /> : null}
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
    loggedUser: state.users.logged_user,
    filters: state.filters.filters
  };
};

export default connect(mapStateToProps, {
  fetchFilters,
  fetchProjects,
  fetchTasks
})(Tasks);
