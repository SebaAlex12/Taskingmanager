import React, { Component } from "react";
import { connect } from "react-redux";
import nextId from "react-id-generator";
import uuidv1 from "uuid";

import { addTask } from "../actions";

class TasksAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  addHandler = event => {
    const { addTask, user } = this.props;
    const { title, description } = this.state;

    const data = {
      id: uuidv1(),
      userId: 1,
      title,
      description
    };
    event.preventDefault();
    addTask(data);
  };
  render() {
    return (
      <div className="clearfix">
        <form action="">
          <div className="form-group form-row">
            <label htmlFor="title">Title:</label>
            <input
              onChange={this.onChangeInput}
              type="text"
              name="title"
              className="form-control"
            />
          </div>
          <div className="form-group form-row">
            <label htmlFor="description">Description:</label>
            <input
              onChange={this.onChangeInput}
              type="text"
              name="description"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              onClick={this.addHandler}
              className="btn btn-primary float-right"
              type="submit"
              value="add"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addTask }
)(TasksAddForm);
