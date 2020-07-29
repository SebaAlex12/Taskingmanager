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
      company: "",
      selectedProjects: [],
      selectedUsers: [],
    };
  }
  componentDidMount() {
    const { item } = this.props;
    console.log(item);
    this.setState({
      _id: item ? item._id : "",
      name: item ? item.name : "",
      email: item ? item.email : "",
      status: item ? item.status : "",
      company: item ? item.company : "",
      selectedProjects: item ? item.projects.split(",") : [],
      selectedUsers: item ? item.users.split(",") : [],
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
  onChangeUsersMultiCheckbox = (event) => {
    let { selectedUsers } = this.state;

    selectedUsers.includes(event.currentTarget.value)
      ? (selectedUsers = selectedUsers.filter(
          (item) => item !== event.currentTarget.value
        ))
      : selectedUsers.push(event.currentTarget.value);

    this.setState({
      ...this.state,
      selectedUsers: selectedUsers,
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
      company,
    } = this.state;

    const data = {
      _id,
      name,
      email,
      password,
      status,
      company,
      projects: selectedProjects,
      users: selectedUsers,
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
      company,
      selectedProjects,
      selectedUsers,
    } = this.state;
    const { users, companies, loggedUser } = this.props;
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

    // if (this.state.projects) {
    //   users = this.props.users.filter(user => {
    //     if (user.projects !== null) {
    //       let userProjects = user.projects.split(",");
    //       let isProject = false;
    //       userProjects.forEach(project => {
    //         if (this.state.projects.includes(project)) {
    //           isProject = true;
    //         }
    //       });

    //       if (isProject) {
    //         return user;
    //       } else {
    //         return null;
    //       }
    //     } else {
    //       return null;
    //     }
    //   });
    // }
    // console.log("selected projects", selectedProjects);
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

    // if (users) {
    //   let counter = 1;
    //   userContent = users.map(user => {
    //     return (
    //       <div className="checkbox-item" key={counter++}>
    //         <input
    //           type="checkbox"
    //           name={user.name}
    //           value={user.name}
    //           onChange={this.onChangeUsersMultiCheckbox}
    //           checked={selectedUsers.includes(user.name)}
    //         />
    //         <div>{user.name}</div>
    //       </div>
    //     );
    //   });
    // }

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
          {/* <div className="form-group form-row">
            <select
              className="form-control"
              onChange={this.onChangeSelect}
              name="company"
              title="Przypisz do firmy"
              required
            >
              <option value="">Przypisz do firmy</option>
              {companies.map(cmpy => (
                <option
                  key={cmpy._id}
                  value={cmpy.name}
                  selected={cmpy.name === company ? "selected" : null}
                >
                  {cmpy.name}
                </option>
              ))}
            </select>
          </div> */}
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
            <label>[Przypisz projekty]</label>
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
