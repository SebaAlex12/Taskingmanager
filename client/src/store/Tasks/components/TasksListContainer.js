import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";
import { StyledTaskListContainer } from "../styles/StyledTaskListContainer";

import TasksItem from "./TasksItem";
import TaskAddForm from "./TasksAddForm";
import { fetchTasks, removeTask, updateTask } from "../actions";

class TasksListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filters: {
        statuses: [],
        priorities: [],
        projectName: "",
        responsiblePerson: ""
      },
      toggleTasksAddForm: false,
      orderColumn: "status",
      orderDirection: "asc",
      userTasks: false,
      activeTaskId: false
    };
  }
  componentDidMount() {
    const {
      fetchTasks,
      loggedUser: { status, name },
      filters: { statuses, priorities, projectName, responsiblePerson }
    } = this.props;

    if (status === "Administrator") {
      fetchTasks({ statuses });
    } else {
      fetchTasks({ responsiblePerson: name });
    }

    this.setState({
      filters: {
        statuses,
        priorities,
        projectName,
        responsiblePerson
      },
      activeTaskId: false
    });
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log("this props", this.props);
    // const { tasks } = this.props;
    // if (
    //   this.props.filters.responsiblePerson !==
    //   prevProps.filters.responsiblePerson
    // ) {
    // console.log("tasks", prevState);
    // this.setState({
    //   ...this.state,
    //   tasks,
    //   filters: {
    //     responsiblePerson: this.state.filters.responsiblePerson
    //   }
    // });
    // }
  }
  setActiveTaskHandler = id => {
    this.setState({
      activeTaskId: id
    });
  };
  switchTasks = () => {
    const {
      fetchTasks,
      loggedUser: { status, name },
      filters: { statuses }
    } = this.props;
    const { userTasks } = this.state;

    if (!userTasks) {
      fetchTasks({ createdBy: name });
    } else {
      if (status === "Administrator") {
        fetchTasks({ statuses });
      } else {
        fetchTasks({ responsiblePerson: name });
      }
    }

    this.setState({
      userTasks: !userTasks,
      activeTaskId: false
    });
  };
  // removeTaskHandler = id => {
  //   const { removeTask } = this.props;
  //   removeTask(id);
  // };
  updateTaskHandler = data => {
    const { updateTask } = this.props;
    updateTask(data);
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
    // console.log("items", items);
    // console.log("filters", filters);

    const priorities = filters.priorities
      .map(priority => {
        if (priority.active) {
          return priority.name;
        }
      })
      .filter(elements => elements !== undefined);

    const statuses = filters.statuses
      .map(status => {
        if (status.active) {
          return status.name;
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
        // console.log(priorities.includes(item.priority));
        // console.log(statuses.includes(item.status));
        return item;
      }
    });

    if (orderDirection === "asc") {
      items = this.sortArray(items, orderColumn);
    }
    if (orderDirection === "desc") {
      items = this.sortArray(items, orderColumn, -1);
    }
    // console.log("items after filter", items);

    return items;
  };

  render() {
    const { toggleTasksAddForm, filters, activeTaskId } = this.state;
    let tasks = this.state.tasks > 0 ? this.state.tasks : this.props.tasks;
    let tasksListContent;

    // console.log("statttttteeeee", this.state);
    // filter tasks
    if (tasks.length > 0) {
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
              active={task._id == activeTaskId ? true : false}
              // removeTaskHandler={() => this.removeTaskHandler(task.id)}
              setActiveTaskHandler={() => this.setActiveTaskHandler(task._id)}
              updateStatusTaskHandler={() =>
                this.updateTaskHandler({
                  ...task,
                  status: task.status === "active" ? "done" : "active"
                })
              }
            />
          ))
        : "loading...";
    }

    return (
      <StyledTaskListContainer>
        <div className="col-lg-12">
          <div className="flow-box">
            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  toggleTasksAddForm: !toggleTasksAddForm
                })
              }
            >
              Dodaj zadanie
            </Button>
            {toggleTasksAddForm ? <TaskAddForm /> : null}
          </div>
          <div className="task-items-box">
            <div className="title">
              {tasks.length > 0 ? `Liczba tasków: ${tasks.length}` : null}
            </div>
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
                      onClick={() => this.sortItems(tasks, "status", "desc")}
                      className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                    ></i>
                  </th>
                  <th scope="col">
                    Priorytet
                    <i
                      onClick={() => this.sortItems(tasks, "priority", "asc")}
                      className="glyphicon glyphicon-sort-by-alphabet"
                    ></i>
                    <i
                      onClick={() => this.sortItems(tasks, "priority", "desc")}
                      className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                    ></i>
                  </th>
                  <th scope="col">
                    Zlecający
                    <i
                      onClick={() => this.sortItems(tasks, "createdBy", "asc")}
                      className="glyphicon glyphicon-sort-by-alphabet"
                    ></i>
                    <i
                      onClick={() => this.sortItems(tasks, "createdBy", "desc")}
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
                      onClick={() => this.sortItems(tasks, "createdAt", "asc")}
                      className="glyphicon glyphicon-sort-by-alphabet"
                    ></i>
                    <i
                      onClick={() => this.sortItems(tasks, "createdAt", "desc")}
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

export default connect(mapStateToProps, { fetchTasks, removeTask, updateTask })(
  TasksListContainer
);
