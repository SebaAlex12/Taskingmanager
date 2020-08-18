import React, { Component } from "react";
import { connect } from "react-redux";

import PatternsContainer from "../store/Patterns/components/PatternsContainer";
import { fetchTasks } from "../store/Tasks/actions";

class Patterns extends Component {
  componentDidMount() {
    const { fetchTasks } = this.props;
    fetchTasks({ status: "Do wykonania" });
  }
  render() {
    const { tasks } = this.props;
    const patternContent =
      tasks.length > 0 ? <PatternsContainer /> : "Tasks list loading...";
    return patternContent;
  }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};
export default connect(mapStateToProps, { fetchTasks })(Patterns);
