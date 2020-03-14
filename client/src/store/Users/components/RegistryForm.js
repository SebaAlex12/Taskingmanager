import React, { Component } from "react";
import { connect } from "react-redux";

import { registerUser } from "../actions";
import { user_statuses } from "../../ini";

import { updateMessages } from "../../Messages/actions";
import { StyledUserForm } from "../styles/StyledUserForm";

class RegistryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      status: "",
      selectedProjects: [],
      selectedUsers: []
    };
  }
  componentDidMount() {
    const { loggedUser } = this.props;
    this.setState({
      company: loggedUser.company
    });
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
  registerHandler = event => {
    event.preventDefault();
    const { registerUser, updateMessages, loggedUser } = this.props;
    // check if someone created new company
    const companyName = localStorage.getItem("companyName");

    const {
      name,
      email,
      password,
      status,
      selectedProjects,
      selectedUsers
    } = this.state;

    const data = {
      name,
      email,
      password,
      status,
      company: companyName ? companyName : loggedUser.company,
      projects: selectedProjects,
      users: selectedUsers
    };

    const response = registerUser(data);
    if (response) {
      updateMessages([{ name: "Użytkownik" }, { value: "użytkownik dodany" }]);
    }
  };
  onChangeUsersMultiCheckbox = event => {
    let { selectedUsers } = this.state;

    selectedUsers.includes(event.currentTarget.value)
      ? (selectedUsers = selectedUsers.filter(
          item => item !== event.currentTarget.value
        ))
      : selectedUsers.push(event.currentTarget.value);

    this.setState({
      ...this.state,
      selectedUsers: selectedUsers
    });
  };
  onChangeProjectsMultiCheckbox = event => {
    let { selectedProjects } = this.state;

    selectedProjects.includes(event.currentTarget.value)
      ? (selectedProjects = selectedProjects.filter(
          item => item !== event.currentTarget.value
        ))
      : selectedProjects.push(event.currentTarget.value);

    this.setState({
      ...this.state,
      selectedProjects: selectedProjects
    });
  };
  render() {
    const {
      name,
      email,
      password,
      status,
      company,
      selectedProjects,
      selectedUsers
    } = this.state;
    const { users, loggedUser } = this.props;
    let { projects } = this.props;
    let projectContent = "";
    let userContent = "";
    // console.log("state", this.state);

    // check if someone created new company
    const insertedCompanyName = localStorage.getItem("companyName");

    // show only logged user projects if is not administrator
    if (projects && loggedUser) {
      if (loggedUser.status !== "Administrator") {
        projects = loggedUser.projects.split(",");
      } else {
        projects = projects.map(item => item.name);
      }
    }

    // filter users compare to selected projects
    // let users;

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

    if (projects) {
      let counter = 1;
      projectContent = projects.map(project => {
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

    if (users) {
      let counter = 1;
      userContent = users.map(user => {
        return (
          <div className="checkbox-item" key={counter++}>
            <input
              type="checkbox"
              name={user.name}
              value={user.name}
              onChange={this.onChangeUsersMultiCheckbox}
              checked={selectedUsers.includes(user.name)}
            />
            <div>{user.name}</div>
          </div>
        );
      });
    }

    return (
      <StyledUserForm>
        <div className="registry-form-box">
          <form action="post">
            <div className="form-group form-row">
              <input
                onChange={this.onChangeInput}
                className="form-control"
                type="text"
                name="name"
                value={name}
                placeholder="Nazwa"
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
                  ? user_statuses.map(status => {
                      if (loggedUser.status !== "Administrator") {
                        if (status.name !== "Administrator") {
                          return (
                            <option key={status._id} value={status.name}>
                              {status.name}
                            </option>
                          );
                        }
                      } else {
                        return (
                          <option key={status._id} value={status.name}>
                            {status.name}
                          </option>
                        );
                      }
                    })
                  : null}
              </select>
            </div>

            {/* <div className="form-group form-row">
              <select
                className="form-control"
                onChange={this.onChangeSelect}
                name="company"
                required
              >
                <option value="">Przypisz do firmy</option>
                {companies.map(company => (
                  <option value={company.name}>{company.name}</option>
                ))}
              </select>
            </div> */}
            <div className="form-group form-row multi-checkboxes">
              {!insertedCompanyName ? (
                <React.Fragment>
                  <label>[Przypisz projekty]</label>
                  {projectContent}
                </React.Fragment>
              ) : null}
            </div>
            {/* <div className="form-group form-row multi-checkboxes">
              <label>[Przypisz użytkowników]</label>
              {userContent}
            </div> */}
            <div className="form-group">
              <input
                onClick={this.registerHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledUserForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user,
    projects: state.projects.projects,
    users: state.users.users,
    companies: state.companies.companies
  };
};

export default connect(mapStateToProps, { registerUser, updateMessages })(
  RegistryForm
);
