import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTasks } from "../actions";
import TasksItem from "./TasksItem";

class TasksList extends Component {
  componentDidMount() {
    const { fetchTasks } = this.props;
    fetchTasks();
  }
  render() {
    const { tasks } = this.props;

    const tasksListContent = tasks
      ? tasks.map(task => <TasksItem item={task} key={task.id} />)
      : "loading...";

    return (
      <div>
        <h1>Tasks list</h1>
        {tasksListContent}
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
  { fetchTasks }
)(TasksList);
