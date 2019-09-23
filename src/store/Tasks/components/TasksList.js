import React, { Component } from "react";
import { connect } from "react-redux";

import TasksItem from "./TasksItem";
import TaskAddForm from "./TasksAddForm";
import { fetchTasks, removeTask, updateTask } from "../actions";

class TasksList extends Component {
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

    const tasksListContent = tasks
      ? tasks.map(task => (
          <TasksItem
            item={task}
            key={task.id}
            removeTaskHandler={() => this.removeTaskHandler(task.id)}
            updateStatusTaskHandler={() =>
              this.updateTaskHandler({ ...task, status: "done" })
            }
          />
        ))
      : "loading...";

    return (
      <div className="row">
        <div className="col-lg-12">
          <h1>Tasks list</h1>
          <TaskAddForm />
          {tasksListContent}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks
  };
};

export default connect(
  mapStateToProps,
  { fetchTasks, removeTask, updateTask }
)(TasksList);
