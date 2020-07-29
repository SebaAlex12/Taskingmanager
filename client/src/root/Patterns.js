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
    return <PatternsContainer />;
  }
}
export default connect(null, { fetchTasks })(Patterns);
