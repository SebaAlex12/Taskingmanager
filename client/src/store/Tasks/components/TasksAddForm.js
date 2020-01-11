import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { addTask } from "../actions";
import { updateMessages } from "../../Messages/actions";
import { priorities, statuses } from "../../ini";

import { StyledTaskForm } from "../styles/StyledTaskForm";

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
  addHandler = async event => {
    const { addTask, loggedUser, updateMessages } = this.props;
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

    event.preventDefault();
    const response = await addTask(data);

    const alertData = {
      from: loggedUser.name,
      to: responsiblePerson,
      msg: title,
      priority: priority,
      topic: "masz nowe zadanie: " + title,
      type: "task_add",
      createAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format()
    };

    if (response) {
      updateMessages({ alert: alertData });
    }
  };
  render() {
    const { projects, users, loggedUser } = this.props;
    const { priority, status } = this.state;

    // console.log(projects);

    const loggedUserProjects = loggedUser.projects
      ? loggedUser.projects.split(",")
      : [];
    const loggedUserUsers = loggedUser.users ? loggedUser.users.split(",") : [];

    // console.log("compon state", this.state);

    return (
      <StyledTaskForm>
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
                <option value="">Wybierz priorytet</option>
                {priorities
                  ? priorities.map(prt => {
                      return (
                        <option
                          key={prt._id}
                          value={prt.name}
                          defaultValue={prt.name === status ? "selected" : null}
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
                      let option = "";
                      if (
                        loggedUser.status !== "Klient" ||
                        loggedUserUsers.includes(user.name)
                      ) {
                        option = (
                          <option key={user._id} value={user.name}>
                            {user.name}
                          </option>
                        );
                        return option;
                      }
                      return;
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
                <option value="">Wybierz projekt</option>
                {projects
                  ? projects.map(project => {
                      let option = "";
                      if (
                        loggedUser.status !== "Klient" ||
                        loggedUserProjects.includes(project.name)
                      ) {
                        option = (
                          <option key={project._id} value={project.name}>
                            {project.name}
                          </option>
                        );
                        return option;
                      }
                      return;
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
                <option value="">Wybierz stan</option>
                {statuses
                  ? statuses.map(sts => {
                      return (
                        <option
                          key={sts._id}
                          defaultValue={sts.name === status ? "selected" : null}
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
      </StyledTaskForm>
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

export default connect(mapStateToProps, { addTask, updateMessages })(
  TasksAddForm
);
