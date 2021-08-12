import React, { Component } from "react";
import { connect } from "react-redux";

import { updateUser } from "../actions";
import { user_statuses } from "../../ini";

import { updateMessages } from "../../Messages/actions";

class UsersEditFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      status: "",
      selectedProjects: [],
    };
  }
  componentDidMount() {
    const { item } = this.props;
    this.setState({
      _id: item ? item._id : "",
      name: item ? item.name : "",
      email: item ? item.email : "",
      status: item ? item.status : "",
      selectedProjects: item ? item.projects.split(",") : [],
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
    let { selectedProjects } = this.state;

    selectedProjects.includes(event.currentTarget.value)
      ? (selectedProjects = selectedProjects.filter(
          (item) => item !== event.currentTarget.value
        ))
      : selectedProjects.push(event.currentTarget.value);

    this.setState({
      ...this.state,
      selectedProjects: selectedProjects,
    });
  };
  updateHandler = (event) => {
    const { updateUser, updateMessages } = this.props;
    const {
      _id,
      name,
      email,
      password,
      status,
      selectedProjects,
      selectedUsers,
    } = this.state;

    const data = {
      _id,
      name,
      email,
      password,
      status,
      projects: selectedProjects,
    };

    const response = updateUser(data);
    if (response) {
      updateMessages([
        { name: "Użytkownik" },
        { value: "dane zostały zmienione" },
      ]);
    }
    event.preventDefault();
  };
  render() {
    const {
      name,
      email,
      password,
      status,
      selectedProjects,
    } = this.state;
    const { loggedUser } = this.props;
    let { projects } = this.props;
    let projectContent = "";
    let userContent = "";

    if (projects && loggedUser) {
      if (loggedUser.status !== "Administrator") {
        projects = loggedUser.projects.split(",");
      } else {
        projects = projects.map((item) => item.name);
      }
    }
    if (projects) {
      let counter = 1;
      projectContent = projects.map((project) => {
        return (
          <div className="checkbox-item" key={counter++}>
            <input
              type="checkbox"
              name={project}
              value={project}
              onChange={this.onChangeProjectsMultiCheckbox}
              checked={selectedProjects.includes(project)}
            />
            <div>{project}</div>
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
              required
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
                onClick={this.updateHandler}
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

export default connect(mapStateToProps, { updateUser, updateMessages })(
  UsersEditFrom
);
