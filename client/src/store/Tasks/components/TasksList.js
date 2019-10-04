import React, { Component } from "react";
import { connect } from "react-redux";

import { Title, Button } from "../../../themes/basic";
import { StyledTaskList } from "../styles/StyledTaskList";

import TasksItem from "./TasksItem";
import TaskAddForm from "./TasksAddForm";
import { fetchTasks, removeTask, updateTask } from "../actions";

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleTasksAddForm: false
    };
  }
  componentDidMount() {
    const { fetchTasks, fetchLoggedUser } = this.props;
    fetchTasks();
  }
  removeTaskHandler = id => {
    const { removeTask } = this.props;
    removeTask(id);
  };
  updateTaskHandler = data => {
    const { updateTask } = this.props;
    updateTask(data);
  };
  render() {
    const { tasks, loggedUser } = this.props;
    const { toggleTasksAddForm } = this.state;

    // you cannot add more than 10 tasks
    const formDisabled = tasks.length < 10 ? false : true;

    const tasksListContent = tasks
      ? tasks.map(task => (
          <TasksItem
            item={task}
            key={task.id}
            removeTaskHandler={() => this.removeTaskHandler(task.id)}
            updateStatusTaskHandler={() =>
              this.updateTaskHandler({
                ...task,
                status: task.status === "active" ? "done" : "active"
              })
            }
          />
        ))
      : "loading...";

    return (
      <StyledTaskList>
        <div className="col-lg-12">
          <div className="logged-user">
            Welcome: {loggedUser ? loggedUser.nickname : null}
          </div>
          <Title>List of tasks</Title>
          <div className="flow-box">
            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  toggleTasksAddForm: !toggleTasksAddForm
                })
              }
            >
              Show/Hide task form
            </Button>
            {toggleTasksAddForm && formDisabled === false ? (
              <TaskAddForm />
            ) : formDisabled === true ? (
              <div style={{ color: "red" }}>
                You can have max 10 tasks - form is disabled
              </div>
            ) : null}
          </div>
          {tasksListContent}
        </div>
      </StyledTaskList>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks,
    loggedUser: state.users.logged_user
  };
};

export default connect(
  mapStateToProps,
  { fetchTasks, removeTask, updateTask }
)(TasksList);
