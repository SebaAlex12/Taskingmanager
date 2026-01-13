import React, { Component } from "react";
import { connect } from "react-redux";

import { updateUser } from "../actions";
import { user_statuses } from "../../ini";

class UsersEditFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      status: "",
      selectedProjectsIds: [],
    };
  }
  componentDidMount() {
    const { item } = this.props;
    this.setState({
      _id: item ? item._id : "",
      name: item ? item.name : "",
      email: item ? item.email : "",
      status: item ? item.status : "",
      selectedProjectsIds: item ? item.projects.split(",") : [],
    });
  }
  
  onChangeInput = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  onChangeSelect = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  onChangeProjectsMultiCheckbox = (event) => {
    let { selectedProjectsIds } = this.state;

    selectedProjectsIds.includes(event.currentTarget.value)
      ? (selectedProjectsIds = selectedProjectsIds.filter(
          (item) => item !== event.currentTarget.value
        ))
      : selectedProjectsIds.push(event.currentTarget.value);

    this.setState({
      ...this.state,
      selectedProjectsIds: selectedProjectsIds,
    });
  };
  updateHandler = (event) => {
    const { updateUser, loggedUser } = this.props;
    event.preventDefault();
    const {
      _id,
      name,
      email,
      password,
      status,
      selectedProjectsIds,
      selectedUsers,
    } = this.state;

    const data = {
      _id,
      name,
      email,
      password,
      status,
      company: loggedUser.company,
      projects: selectedProjectsIds,
    };

    const response = updateUser(data);
    
  };
  render() {
    const {
      name,
      email,
      password,
      status,
      selectedProjectsIds,
    } = this.state;
    const { loggedUser } = this.props;
    const { projects } = this.props;
    let projectContent = "";
    let userContent = "";
    let projectsIds = [];

    if (projects && loggedUser) {
      if (loggedUser.status !== "Administrator") {
        projectsIds = loggedUser.projects.split(",");
      } else {
        projectsIds = projects.map((item) => item._id);
      }
    }
    if (projectsIds) {
      let counter = 1;
      projectContent = projects.map((project) => {
        return (
          <div className="checkbox-item" key={counter++}>
            <input
              type="checkbox"
              name={project.name}
              value={project._id}
              onChange={this.onChangeProjectsMultiCheckbox}
              checked={selectedProjectsIds.includes(project._id)}
            />
            <div>{project.name}</div>
          </div>
        );
      });
    }

    return (
      <div
        className="user-update-form-box mt-3 mb-3"
        style={{ backgroundColor: "#fff", padding: "5px" }}
      >
        <form action="post">
          <div className="form-group form-row">
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="text"
              name="name"
              value={name}
              placeholder="Nazwa"
              disabled
              required
            />
          </div>
          <div className="form-group form-row">
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group form-row">
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="password"
              name="password"
              value={password}
              placeholder="Hasło"
              // required
            />
          </div>
          <div className="form-group form-row">
            <select
              className="form-control"
              onChange={this.onChangeSelect}
              name="status"
              required
            >
              <option value="">Status</option>
              {user_statuses
                ? user_statuses.map((stats) => {
                    if (loggedUser.status === "Administrator") {
                      return (
                        <option
                          key={stats._id}
                          value={stats.name}
                          selected={stats.name === status ? "selected" : null}
                        >
                          {stats.name}
                        </option>
                      );
                    } else {
                      if (stats.name !== "Administrator") {
                        return (
                          <option
                            key={stats._id}
                            value={stats.name}
                            selected={stats.name === status ? "selected" : null}
                          >
                            {stats.name}
                          </option>
                        );
                      }
                    }
                  })
                : null}
            </select>
          </div>
          <div className="form-group form-row multi-checkboxes">
            <label>[Przypisane projekty]</label>
            {projectContent}
          </div>
          {/* <div className="form-group form-row multi-checkboxes">
            <label>[Przypisz użytkowników]</label>
            {userContent}
          </div> */}
          {loggedUser.status === "Administrator" ? (
            <div className="form-group">
              <input
                onClick={(event) => this.updateHandler(event)}
                className="btn btn-primary float-right"
                type="submit"
                value="zapisz"
              />
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    projects: state.projects.projects,
    users: state.users.users,
    companies: state.companies.companies,
  };
};

export default connect(mapStateToProps, { updateUser })(
  UsersEditFrom
);
