import React, { Component } from "react";
import { connect } from "react-redux";

import { addTask } from "../actions";
import { priorities, statuses } from "../../ini";
// import { updateMessages } from "../../Messages/actions";

class TasksAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: 5,
      projectName: "",
      responsiblePerson: "",
      title: "",
      description: "",
      responsiblePersonLastComment: false,
      priority: "Normalny",
      status: "Do wykonania",
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
    const { addTask, loggedUser } = this.props;
    const {
      projectName,
      responsiblePerson,
      title,
      description,
      responsiblePersonLastComment,
      priority,
      status,
      termAt
    } = this.state;

    const data = {
      userId: loggedUser._id,
      createdBy: loggedUser.name,
      projectId: "1",
      projectName,
      responsiblePerson,
      title,
      description,
      responsiblePersonLastComment,
      priority,
      status,
      termAt
    };
    // console.log(data);
    event.preventDefault();

    const response = addTask(data);
    // if (response) {
    //   updateMessages([{ name: "Zadania" }, { value: "zadanie dodane" }]);
    // }
  };
  render() {
    const { projects, users } = this.props;
    const { priority, status, messages } = this.state;

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
              value={priority}
              required
            >
              <option value="">Priorytet</option>
              {priorities
                ? priorities.map(prt => {
                    return (
                      <option
                        key={prt._id}
                        value={prt.name}
                        selected={prt.name === status ? "selected" : null}
                      >
                        {prt.name}
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
              value={status}
              required
            >
              <option value="">Stan</option>
              {statuses
                ? statuses.map(sts => {
                    return (
                      <option
                        key={sts._id}
                        selected={sts.name === status ? "selected" : null}
                      >
                        {sts.name}
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
              value="dodaj"
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
    projects: state.projects.projects,
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, { addTask })(TasksAddForm);
