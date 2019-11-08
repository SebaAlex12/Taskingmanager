import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";

import { addTask } from "../actions";
import { priorities, statuses } from "../../ini";

class TasksAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: 5,
      projectName: "",
      responsiblePerson: "",
      title: "",
      description: "",
      priority: "",
      status: "",
      termAt: ""
    };
  }
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  onChangeSelect = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  addHandler = event => {
    const { addTask } = this.props;
    const {
      projectName,
      responsiblePerson,
      title,
      description,
      priority,
      status,
      termAt
    } = this.state;

    const data = {
      id: uuidv1(),
      userId: "1",
      createdBy: "franek",
      projectId: "5",
      projectName,
      responsiblePerson,
      title,
      description,
      priority,
      status,
      termAt
    };
    // console.log(data);
    event.preventDefault();

    addTask(data);
  };
  render() {
    const { projects, users } = this.props;

    return (
      <div className="task-add-form-box">
        <form action="">
          <div className="form-group">
            <input
              onChange={this.onChangeInput}
              type="text"
              name="title"
              className="form-control"
              placeholder="Tytuł"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={this.onChangeInput}
              type="text"
              name="description"
              className="form-control"
              rows="5"
              placeholder="Opis"
              required
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              onChange={this.onChangeSelect}
              name="priority"
              required
            >
              <option value="">Priorytet</option>
              {priorities
                ? priorities.map(priority => {
                    return (
                      <option key={priority._id} value={priority.name}>
                        {priority.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={this.onChangeInput}
              type="date"
              name="termAt"
              className="form-control"
              placeholder="Termin"
              required
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              onChange={this.onChangeSelect}
              name="responsiblePerson"
              required
            >
              <option value="">Przypisz do</option>
              {users
                ? users.map(user => {
                    return (
                      <option key={user._id} value={user.name}>
                        {user.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              onChange={this.onChangeSelect}
              name="projectName"
              required
            >
              <option value="">Projekt</option>
              {projects
                ? projects.map(project => {
                    return (
                      <option key={project._id} value={project.name}>
                        {project.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              onChange={this.onChangeSelect}
              name="status"
              required
            >
              <option value="">Stan</option>
              {statuses
                ? statuses.map(status => {
                    return (
                      <option key={status._id} value={status.name}>
                        {status.name}
                      </option>
                    );
                  })
                : null}
            </select>
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

const mapStateToProps = state => {
  return {
    users: state.users.users,
    projects: state.projects.projects
  };
};

export default connect(
  mapStateToProps,
  { addTask }
)(TasksAddForm);
