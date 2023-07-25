import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { fetchTasks } from './../store/Tasks/actions';
import { fetchProjects } from './../store/Projects/actions';

import RightButtonsBox from "./RightButtonsBox";
import TasksListContainer from "../store/Tasks/components/TasksListContainer";
import ProjectsList from './../store/Projects/components/ProjectsList';
import UsersList from './../store/Users/components/UsersList';

// import TasksList from "../store/Tasks/components/TasksList";
// import UsersList from "../store/Users/components/UsersList";
// import ProjectsList from "../store/Projects/components/ProjectsList";
// import FiltersContainer from "../store/Filters/components/FiltersContainer";
// import { fetchFilters } from "../store/Filters/actions";
// import { updateSettings } from "../store/Settings/actions";
// import { fetchContractors } from "../store/Contractors/actions";
// import { fetchCompanies } from "../store/Companies/actions";
// import { fetchUsersHistory } from "../store/UsersHistory/actions";
// import { fetchCalendars } from "../store/Calendar/actions";
// import { fetchPatterns } from "../store/Patterns/actions";
// import { faComment } from "@fortawesome/free-solid-svg-icons";
// import MessangersWidget from "../store/Messengers/components/MessangersWidget";
// import {
//   fetchProjects,
//   fetchProjectsByLoggedUserProjects,
// } from "../store/Projects/actions";
// import Widget from "../common/Widget";

const Tasks = () => {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchTasks());
      dispatch(fetchProjects({company:'Blumoseo'}));
  },[dispatch]);

  return(
    <React.Fragment>
      <ProjectsList />
      <UsersList />
      <TasksListContainer />
      <RightButtonsBox />
    </React.Fragment>
  )
}

export default Tasks;

// class Tasks extends Component {
//   componentDidMount() {
//     const {
//       fetchFilters,
//       fetchCompanies,
//       fetchContractors,
//       fetchProjects,
//       fetchUsersHistory,
//       fetchProjectsByLoggedUserProjects,
//       fetchTasks,
//       fetchCalendars,
//       fetchPatterns,
//       loggedUser: { status, name, projects, company, _id },
//     } = this.props;

//     fetchFilters();
//     fetchUsersHistory();
//     fetchCalendars(_id);
//     fetchPatterns();

//     if (status === "SuperAdministrator") {
//       fetchProjects();
//       fetchContractors();
//       fetchCompanies();
//     } else if (status === "Administrator") {
//       fetchProjects({});
//     } else if (status === "Menedżer") {
//       fetchProjectsByLoggedUserProjects(projects);
//     } else {
//       fetchProjectsByLoggedUserProjects(projects);
//     }

//     let filters = this.props.filters ? this.props.filters : null;

//     if (filters) {
//       const { projectName, responsiblePerson } = filters;
//       if (status === "Klient") {
//         fetchTasks({ responsiblePerson: name });
//       } else if (status === "Pracownik") {
//         fetchTasks({ responsiblePerson: name });
//       } else {
//         fetchTasks({ responsiblePerson: name });
//       }
//       this.setState({
//         filters: {
//           projectName,
//           responsiblePerson,
//         },
//       });
//     }
//   }
//   componentDidUpdate(prevProps) {
//     const {
//       loggedUser: { status, projects },
//       fetchTasks,
//       fetchTasksByLoggedUserProjects,
//       filters: { projectName, responsiblePerson },
//       settings: { _id, mailingDate },
//       sendMailingTask,
//       updateSettings,
//     } = this.props;

//     if (mailingDate !== prevProps.mailingDate) {
//       const difference = moment(new Date()).diff(mailingDate, "minutes");
//       const presentDay = moment(new Date(), "YYYY-MM-DD HH:mm:ss").format();
//       if (difference > 600) {
//         sendMailingTask();
//         updateSettings({ _id, mailingDate: presentDay });
//       }
//     }

//     if (
//       projectName !== prevProps.filters.projectName ||
//       responsiblePerson !== prevProps.filters.responsiblePerson
//     ) {

//       if (status === "Administrator") {
//         fetchTasks({ projectName, responsiblePerson });
//       } else {
//         fetchTasksByLoggedUserProjects({
//           projectName,
//           responsiblePerson,
//           projects,
//         });
//       }
//       this.setState({
//         filters: {
//           projectName,
//           responsiblePerson,
//         },
//       });
//     }
//   }
//   render() {
//     const { loggedUser } = this.props;
//     const insertedCompanyName = localStorage.getItem("companyName");
//     return (
//       <div className="tasks-box">
//         <Widget rightPosition="10px" bottomPosition="30px" faIcon={faComment}>
//           <MessangersWidget />
//         </Widget>
//         <div style={{ color: "red", fontWeight: "bold", fontSize: "14px" }}>
//           {insertedCompanyName
//             ? `Właśnie dodałeś firme o nazwie: "${insertedCompanyName}" dodaj użytkownika o statusie administrator i się na niego zaloguj !!!`
//             : null}
//         </div>
//         {loggedUser.status === "SuperAdministrator" ? (
//           <React.Fragment>
//             <ContractorsList />
//             <CompaniesList />
//           </React.Fragment>
//         ) : null}
//         {loggedUser.status !== "Klient" && !insertedCompanyName ? (
//           <ProjectsList />
//         ) : null}
//         {loggedUser.status === "SuperAdministrator" ||
//         loggedUser.status === "Administrator" ||
//         loggedUser.status === "Menedżer" ? (
//           <UsersList />
//         ) : null}
//         <FiltersContainer />
//         {!insertedCompanyName ? <TasksListContainer /> : null}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     loggedUser: state.users.logged_user,
//     filters: state.filters.filters,
//     settings: state.settings.settings,
//   };
// };

// export default connect(mapStateToProps, {
//   fetchFilters,
//   fetchContractors,
//   fetchCompanies,
//   fetchProjects,
//   fetchProjectsByLoggedUserProjects,
//   fetchTasks,
//   fetchTasksByLoggedUserProjects,
//   fetchUsersHistory,
//   fetchCalendars,
//   fetchPatterns,
//   sendMailingTask,
//   updateSettings,
// })(Tasks);
