import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import TasksListContainer from "../store/Tasks/components/TasksListContainer";
// import TasksList from "../store/Tasks/components/TasksList";
import UsersList from "../store/Users/components/UsersList";
import ProjectsList from "../store/Projects/components/ProjectsList";
import FiltersContainer from "../store/Filters/components/FiltersContainer";

import { fetchFilters } from "../store/Filters/actions";
import { updateSettings } from "../store/Settings/actions";
import { fetchContractors } from "../store/Contractors/actions";
import { fetchCompanies } from "../store/Companies/actions";
import {
  fetchProjects,
  fetchProjectsByLoggedUserProjects
} from "../store/Projects/actions";
import {
  fetchTasks,
  fetchTasksByLoggedUserProjects,
  sendMailingTask
} from "../store/Tasks/actions";

class Tasks extends Component {
  componentDidMount() {
    const {
      fetchFilters,
      fetchCompanies,
      fetchContractors,
      fetchProjects,
      fetchProjectsByLoggedUserProjects,
      fetchTasks,
      loggedUser: { status, name, projects, company }
    } = this.props;

    fetchFilters();

    if (status === "SuperAdministrator") {
      fetchProjects();
      fetchContractors();
      fetchCompanies();
    } else if (status === "Administrator" || status === "Menedżer") {
      fetchProjects({ company: company });
    } else {
      fetchProjectsByLoggedUserProjects(projects);
    }

    let filters = this.props.filters ? this.props.filters : null;

    if (filters) {
      const { projectName, responsiblePerson } = filters;
      if (status === "Klient") {
        fetchTasks({ responsiblePerson: name });
      } else if (status === "Pracownik") {
        fetchTasks({ responsiblePerson: name });
      } else {
        // fetchTasks({ projectName, responsiblePerson });
        fetchTasks({ responsiblePerson: name });
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
  componentDidUpdate(prevProps) {
    const {
      loggedUser: { status, projects },
      fetchTasks,
      fetchTasksByLoggedUserProjects,
      filters: { projectName, responsiblePerson },
      settings: { _id, mailingDate },
      sendMailingTask,
      updateSettings
    } = this.props;

    if (mailingDate !== prevProps.mailingDate) {
      const difference = moment(new Date()).diff(mailingDate, "minutes");
      const presentDay = moment(new Date(), "YYYY-MM-DD HH:mm:ss").format();
      // check mailing list after 10 hours
      if (difference > 600) {
        sendMailingTask();
        updateSettings({ _id, mailingDate: presentDay });
        // console.log("sending mailing");
        // console.log("difference", difference);
      }
    }

    if (
      projectName !== prevProps.filters.projectName ||
      responsiblePerson !== prevProps.filters.responsiblePerson
    ) {
      // console.log("prev res person", prevProps.filters.responsiblePerson);
      // console.log("res pers", responsiblePerson);

      if (status === "Administrator") {
        fetchTasks({ projectName, responsiblePerson });
      } else {
        // fetchTasks({ projectName, responsiblePerson });
        // console.log("logged user", loggedUser);
        fetchTasksByLoggedUserProjects({
          projectName,
          responsiblePerson,
          projects
        });
      }
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
    const insertedCompanyName = localStorage.getItem("companyName");
    // console.log("local storage", insertedCompanyName);
    return (
      <div className="tasks-box">
        <div style={{ color: "red", fontWeight: "bold", fontSize: "14px" }}>
          {insertedCompanyName
            ? `Właśnie dodałeś firme o nazwie: "${insertedCompanyName}" dodaj użytkownika o statusie administrator i się na niego zaloguj !!!`
            : null}
        </div>
        {loggedUser.status === "SuperAdministrator" ? (
          <React.Fragment>
            {/* <ContractorsList />
            <CompaniesList /> */}
          </React.Fragment>
        ) : null}
        {loggedUser.status !== "Klient" && !insertedCompanyName ? (
          <ProjectsList />
        ) : null}
        {loggedUser.status === "SuperAdministrator" ||
        loggedUser.status === "Administrator" ||
        loggedUser.status === "Menedżer" ? (
          <UsersList />
        ) : null}
        {/* <TasksList /> */}
        <FiltersContainer />
        {!insertedCompanyName ? <TasksListContainer /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user,
    filters: state.filters.filters,
    settings: state.settings.settings
  };
};

export default connect(mapStateToProps, {
  fetchFilters,
  fetchContractors,
  fetchCompanies,
  fetchProjects,
  fetchProjectsByLoggedUserProjects,
  fetchTasks,
  fetchTasksByLoggedUserProjects,
  sendMailingTask,
  updateSettings
})(Tasks);
