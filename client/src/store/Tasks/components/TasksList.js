import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";
import { StyledTaskList } from "../styles/StyledTaskList";

import { fetchTasks, removeTask, updateTask } from "../actions";

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleTasksList: false
    };
  }
  componentDidMount() {
    const { fetchTasks } = this.props;
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
    const { tasks } = this.props;
    const { toggleTasksList } = this.state;
    const tasksContent = tasks.map(task => {
      return <div className="btn btn-default">{task.name}</div>;
    });
    return (
      <StyledTaskList>
        <div className="tasks-box">
          <div className="task-list-flow-box">
            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  toggleTasksList: !toggleTasksList
                })
              }
            >
              Lista tasków
            </Button>
            {toggleTasksList ? (
              <div className="tasks-list">{tasksContent}</div>
            ) : null}
          </div>
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
