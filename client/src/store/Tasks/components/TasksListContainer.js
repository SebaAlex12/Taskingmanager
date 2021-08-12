import React, { Component } from "react";
import { connect } from "react-redux";

import { sortArray } from "../../../common/tools";

import { BiggerButton, Button } from "../../../themes/basic";
import { StyledTaskListContainer } from "../styles/StyledTaskListContainer";

import { setUserActive } from "../../Users/common/UserTools";

import TasksItem from "./TasksItem";
import TaskAddForm from "./TasksAddForm";
import {
  fetchTasks,
  fetchTasksByLoggedUserProjects,
  removeTask,
  updateTask,
} from "../actions";
import { updateFilter } from "../../Filters/actions";

import {
  faSyncAlt,
  faLayerGroup,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TasksListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      toggleTasksAddForm: false,
      orderColumn: "priority",
      orderDirection: "desc",
      userTasks: false,
      activeTaskId: false,
      activeAllTasks: false,
    };
  }
  componentDidMount() {
    const {
      tasks,
      // filters: { statuses, priorities, projectName, responsiblePerson }
    } = this.props;
    setUserActive();
    this.setState({
      tasks,
      activeTaskId: false,
    });
  }
  setActiveTaskHandler = (id) => {
    const { activeTaskId } = this.state;
    if (activeTaskId === id) {
      this.setState({
        activeTaskId: false,
      });
    } else {
      this.setState({
        activeTaskId: id,
      });
    }
  };
  switchAllTasks = (showAllTasks) => {
    const { activeAllTasks } = this.state;
    const {
      loggedUser,
      fetchTasks,
      fetchTasksByLoggedUserProjects,
      updateFilter,
      filters,
    } = this.props;

    if (showAllTasks) {
      if (loggedUser.status !== "Administrator") {
        fetchTasksByLoggedUserProjects({
          projectId: 1,
          projects: loggedUser.projects,
        });
      } else {
        fetchTasks();
      }
      updateFilter({
        ...filters,
        ownerToAcceptTasksOnly: false,
      });
    } else {
      fetchTasks({ responsiblePerson: loggedUser.name });
      updateFilter({
        ...filters,
        ownerToAcceptTasksOnly: true,
      });
    }
    this.setState({
      ...this.state,
      activeAllTasks: showAllTasks,
    });
  };
  switchTasks = () => {
    const { fetchTasks, updateFilter, filters, loggedUser } = this.props;
    const { userTasks } = this.state;

    if (!userTasks) {
      fetchTasks({ createdBy: loggedUser.name });
      updateFilter({
        ...filters,
        ownerToAcceptTasksOnly: false,
      });
    } else {
      fetchTasks({ responsiblePerson: loggedUser.name });
      updateFilter({
        ...filters,
        ownerToAcceptTasksOnly: true,
      });
    }

    this.setState({
      userTasks: !userTasks,
      activeTaskId: false,
    });
  };
  sortItems = (items, column, direction) => {
    if (direction === "asc") {
      sortArray(items, column);
    }
    if (direction === "desc") {
      sortArray(items, column, -1);
    }

    this.setState({
      tasks: items,
      orderColumn: column,
      orderDirection: direction,
    });

    return items;
  };
  filterItems = (items, filters) => {
    const {
      orderColumn,
      orderDirection,
      // filters: { projectName, responsiblePerson }
    } = this.state;
    const { loggedUser } = this.props;

    const priorities = filters.priorities
      .map((priority) => {
        if (priority.active) {
          return priority.name;
        } else {
          return null;
        }
      })
      .filter((elements) => elements !== undefined);

    const statuses = filters.statuses
      .map((status) => {
        if (status.active) {
          return status.name;
        } else {
          return null;
        }
      })
      .filter((elements) => elements !== undefined);

    items = items.filter((item) => {
      if (
        priorities.includes(item.priority) &&
        statuses.includes(item.status)
      ) {
        if (filters.ownerToAcceptTasksOnly && item.status === "Do akceptacji") {
          if (item.createdBy === loggedUser.name) {
            return item;
          }
        } else {
          return item;
        }
      } else {
        return null;
      }
    });

    if (orderDirection === "asc") {
      items = sortArray(items, orderColumn);
    }
    if (orderDirection === "desc") {
      items = sortArray(items, orderColumn, -1);
    }

    return items;
  };
  refreshPage = () => {
    const {
      fetchTasks,
      loggedUser: { name },
    } = this.props;
    const response = fetchTasks({ responsiblePerson: name });
    this.setState({
      ...this.state,
      tasks: response,
    });
  };

  render() {
    const {
      toggleTasksAddForm,
      activeTaskId,
      activeAllTasks,
      ownerToAcceptTasksOnly,
    } = this.state;
    const { filters, loggedUser } = this.props;
    let tasks = this.state.tasks > 0 ? this.state.tasks : this.props.tasks;
    let tasksListContent;

    if (tasks && tasks.length > 0) {
      tasks =
        filters.priorities.length > 0 &&
        filters.statuses.length > 0 &&
        tasks.length > 0
          ? this.filterItems(tasks, filters)
          : tasks;
    }

    if (tasks.length > 0) {
      tasksListContent = tasks
        ? tasks.map((task) => (
            <TasksItem
              item={task}
              key={task._id}
              active={task._id === activeTaskId ? true : false}
              setActiveTaskHandler={() => this.setActiveTaskHandler(task._id)}
            />
          ))
        : "loading...";
    }

    const clazz = toggleTasksAddForm ? "flow-box active" : "flow-box";
    const clazz_all_tasks = activeAllTasks
      ? "task-all-switcher active"
      : "task-all-switcher";

    return (
      <StyledTaskListContainer>
        <div className="col-lg-12">
          <div className="tasks-box">
            <div className={clazz}>
              <BiggerButton
                variant="primary"
                title="Rozwiń formularz"
                onClick={() =>
                  this.setState({
                    toggleTasksAddForm: !toggleTasksAddForm,
                  })
                }
              >
                <FontAwesomeIcon icon={faArrowAltCircleDown} />
                <span>Dodaj zadanie</span>
              </BiggerButton>
              {toggleTasksAddForm ? <TaskAddForm /> : null}
            </div>
            <div className="task-items-box">
              <div className="title">
                {tasks.length > 0 ? `Liczba zadań: ${tasks.length}` : null}
              </div>
              {/* <div className="refresh-box" onClick={() => this.refreshPage()}>
                <Button>
                  <FontAwesomeIcon icon={faSyncAlt} />
                  <span>Odśwież</span>
                </Button>
              </div> */}
              {loggedUser.status === "Administrator" ||
              loggedUser.status === "Menedżer" ? (
                <div className={clazz_all_tasks} onClick={() => this.switchAllTasks(!activeAllTasks)}>
                  <Button>
                    <FontAwesomeIcon icon={faLayerGroup} />
                    <span>Pokaż wszystkie zadania</span>
                  </Button>
                </div>
              ) : null}
              <form className="task-switcher">
                <label htmlFor="">Zadania utworzone przeze mnie:</label>
                <label className="switch">
                  <input
                    className="switch-input"
                    type="checkbox"
                    onClick={this.switchTasks}
                  />
                  <span
                    className="switch-label"
                    data-on="Ukryj"
                    data-off="Pokaż"
                  ></span>
                  <span className="switch-handle"></span>
                </label>
              </form>
              <div className="overflow-div">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">
                        Nazwa
                        <i
                          onClick={() => this.sortItems(tasks, "title", "asc")}
                          className="glyphicon glyphicon-sort-by-alphabet"
                        ></i>
                        <i
                          onClick={() => this.sortItems(tasks, "title", "desc")}
                          className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                        ></i>
                      </th>
                      <th scope="col">
                        Projekt
                        <i
                          onClick={() =>
                            this.sortItems(tasks, "projectName", "asc")
                          }
                          className="glyphicon glyphicon-sort-by-alphabet"
                        ></i>
                        <i
                          onClick={() =>
                            this.sortItems(tasks, "projectName", "desc")
                          }
                          className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                        ></i>
                      </th>
                      <th scope="col">
                        Stan
                        <i
                          onClick={() => this.sortItems(tasks, "status", "asc")}
                          className="glyphicon glyphicon-sort-by-alphabet"
                        ></i>
                        <i
                          onClick={() =>
                            this.sortItems(tasks, "status", "desc")
                          }
                          className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                        ></i>
                      </th>
                      <th scope="col">
                        Priorytet
                        <i
                          onClick={() =>
                            this.sortItems(tasks, "priority", "asc")
                          }
                          className="glyphicon glyphicon-sort-by-alphabet"
                        ></i>
                        <i
                          onClick={() =>
                            this.sortItems(tasks, "priority", "desc")
                          }
                          className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                        ></i>
                      </th>
                      <th scope="col">
                        Zlecający
                        <i
                          onClick={() =>
                            this.sortItems(tasks, "createdBy", "asc")
                          }
                          className="glyphicon glyphicon-sort-by-alphabet"
                        ></i>
                        <i
                          onClick={() =>
                            this.sortItems(tasks, "createdBy", "desc")
                          }
                          className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                        ></i>
                      </th>
                      <th scope="col">
                        Wykonawca
                        <i
                          onClick={() =>
                            this.sortItems(tasks, "responsiblePerson", "asc")
                          }
                          className="glyphicon glyphicon-sort-by-alphabet"
                        ></i>
                        <i
                          onClick={() =>
                            this.sortItems(tasks, "responsiblePerson", "desc")
                          }
                          className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                        ></i>
                      </th>
                      <th scope="col">
                        Termin
                        <i
                          onClick={() => this.sortItems(tasks, "term", "asc")}
                          className="glyphicon glyphicon-sort-by-alphabet"
                        ></i>
                        <i
                          onClick={() => this.sortItems(tasks, "term", "desc")}
                          className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                        ></i>
                      </th>
                      <th scope="col">
                        Utworzono
                        <i
                          onClick={() =>
                            this.sortItems(tasks, "createdAt", "asc")
                          }
                          className="glyphicon glyphicon-sort-by-alphabet"
                        ></i>
                        <i
                          onClick={() =>
                            this.sortItems(tasks, "createdAt", "desc")
                          }
                          className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                        ></i>
                      </th>
                      <th scope="col">Opis</th>
                    </tr>
                  </thead>
                  <tbody>{tasksListContent}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </StyledTaskListContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
    filters: state.filters.filters,
    loggedUser: state.users.logged_user,
  };
};

export default connect(mapStateToProps, {
  updateFilter,
  fetchTasks,
  fetchTasksByLoggedUserProjects,
  removeTask,
  updateTask,
})(TasksListContainer);
