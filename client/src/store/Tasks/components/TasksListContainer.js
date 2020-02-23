import React, { Component } from "react";
import { connect } from "react-redux";

import { BiggerButton, Button } from "../../../themes/basic";
import { StyledTaskListContainer } from "../styles/StyledTaskListContainer";

import TasksItem from "./TasksItem";
import TaskAddForm from "./TasksAddForm";
import {
  fetchTasks,
  fetchTasksByLoggedUserProjects,
  removeTask,
  updateTask
} from "../actions";
import { updateFilter } from "../../Filters/actions";

import { faSyncAlt, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
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
      activeAllTasks: false
    };
  }
  componentDidMount() {
    const {
      tasks
      // filters: { statuses, priorities, projectName, responsiblePerson }
    } = this.props;

    // console.log("tasks filters", this.props.filters);

    this.setState({
      tasks,
      activeTaskId: false
    });
  }
  setActiveTaskHandler = id => {
    const { activeTaskId } = this.state;
    if (activeTaskId === id) {
      this.setState({
        activeTaskId: false
      });
    } else {
      this.setState({
        activeTaskId: id
      });
    }
  };
  switchAllTasks = () => {
    const { activeAllTasks } = this.state;
    const {
      loggedUser,
      fetchTasks,
      fetchTasksByLoggedUserProjects,
      updateFilter,
      filters
    } = this.props;

    if (!activeAllTasks) {
      if (loggedUser.status !== "Administrator") {
        fetchTasksByLoggedUserProjects({
          projectId: 1,
          projects: loggedUser.projects
        });
      } else {
        fetchTasks({ projectId: 1 });
      }
      updateFilter({
        ...filters,
        ownerToAcceptTasksOnly: false
      });
    } else {
      fetchTasks({ responsiblePerson: loggedUser.name });
      updateFilter({
        ...filters,
        ownerToAcceptTasksOnly: true
      });
    }
    this.setState({
      ...this.state,
      activeAllTasks: !activeAllTasks
    });
  };
  switchTasks = () => {
    const { fetchTasks, updateFilter, filters, loggedUser } = this.props;
    const { userTasks } = this.state;

    if (!userTasks) {
      fetchTasks({ createdBy: loggedUser.name });
      updateFilter({
        ...filters,
        ownerToAcceptTasksOnly: false
      });
    } else {
      fetchTasks({ responsiblePerson: loggedUser.name });
      updateFilter({
        ...filters,
        ownerToAcceptTasksOnly: true
      });
    }

    this.setState({
      userTasks: !userTasks,
      activeTaskId: false
    });
  };
  sortArray(array, property, direction) {
    direction = direction || 1;
    array.sort(function compare(a, b) {
      let comparison = 0;
      if (a[property] > b[property]) {
        comparison = 1 * direction;
      } else if (a[property] < b[property]) {
        comparison = -1 * direction;
      }
      return comparison;
    });
    return array;
  }
  sortItems = (items, column, direction) => {
    if (direction === "asc") {
      this.sortArray(items, column);
    }
    if (direction === "desc") {
      this.sortArray(items, column, -1);
    }
    // console.log(items);
    this.setState({
      tasks: items,
      orderColumn: column,
      orderDirection: direction
    });
    // console.log(this.state);
    return items;
  };
  filterItems = (items, filters) => {
    const {
      orderColumn,
      orderDirection
      // filters: { projectName, responsiblePerson }
    } = this.state;
    const { loggedUser } = this.props;
    // console.log("items", items);
    // console.log("filters", filters);

    const priorities = filters.priorities
      .map(priority => {
        if (priority.active) {
          return priority.name;
        } else {
          return null;
        }
      })
      .filter(elements => elements !== undefined);

    const statuses = filters.statuses
      .map(status => {
        if (status.active) {
          return status.name;
        } else {
          return null;
        }
      })
      .filter(elements => elements !== undefined);

    // console.log("priorities", priorities);
    // console.log("statuses", statuses);
    // console.log("project name", projectName);
    // console.log("responsible person", responsiblePerson);

    items = items.filter(item => {
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
        // console.log(priorities.includes(item.priority));
        // console.log(statuses.includes(item.status));
      } else {
        return null;
      }
    });

    // if(filters.ownerToAcceptTasksOnly){
    //   items =
    // }

    if (orderDirection === "asc") {
      items = this.sortArray(items, orderColumn);
    }
    if (orderDirection === "desc") {
      items = this.sortArray(items, orderColumn, -1);
    }
    // console.log("items after filter", items);

    return items;
  };
  refreshPage = () => {
    const {
      fetchTasks,
      loggedUser: { name }
    } = this.props;
    const response = fetchTasks({ responsiblePerson: name });
    this.setState({
      ...this.state,
      tasks: response
    });
  };

  render() {
    const {
      toggleTasksAddForm,
      activeTaskId,
      activeAllTasks,
      ownerToAcceptTasksOnly
    } = this.state;
    const { filters, loggedUser } = this.props;
    let tasks = this.state.tasks > 0 ? this.state.tasks : this.props.tasks;
    let tasksListContent;

    // console.log("statttttteeeee", this.state);
    // filter tasks
    if (tasks && tasks.length > 0) {
      tasks =
        filters.priorities.length > 0 &&
        filters.statuses.length > 0 &&
        tasks.length > 0
          ? this.filterItems(tasks, filters)
          : tasks;
    }

    // console.log("tasks", tasks);

    if (tasks.length > 0) {
      tasksListContent = tasks
        ? tasks.map(task => (
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
                onClick={() =>
                  this.setState({
                    toggleTasksAddForm: !toggleTasksAddForm
                  })
                }
              >
                Dodaj zadanie
              </BiggerButton>
              {toggleTasksAddForm ? <TaskAddForm /> : null}
            </div>
            <div className="task-items-box">
              <div className="title">
                {tasks.length > 0 ? `Liczba zadań: ${tasks.length}` : null}
              </div>
              <div className="refresh-box" onClick={() => this.refreshPage()}>
                <Button>
                  <FontAwesomeIcon icon={faSyncAlt} />
                  <span>Odśwież</span>
                </Button>
              </div>
              {loggedUser.status === "Administrator" ||
              loggedUser.status === "Menedżer" ? (
                <div className={clazz_all_tasks} onClick={this.switchAllTasks}>
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

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks,
    filters: state.filters.filters,
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, {
  updateFilter,
  fetchTasks,
  fetchTasksByLoggedUserProjects,
  removeTask,
  updateTask
})(TasksListContainer);
