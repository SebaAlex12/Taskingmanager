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
      projects: [],
      users: []
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
  onChangeMultiSelect = event => {
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ [event.target.name]: value });
  };
  registerHandler = event => {
    event.preventDefault();
    const { registerUser, updateMessages } = this.props;
    const response = registerUser(this.state);
    if (response) {
      updateMessages([{ name: "Użytkownik" }, { value: "użytkownik dodany" }]);
    }
  };
  render() {
    const { projects, loggedUser } = this.props;
    const { status } = this.state;
    // console.log("state", this.state);

    // filter users compare to selected projects
    let users;

    if (this.state.projects) {
      users = this.props.users.filter(user => {
        if (user.projects !== null) {
          let userProjects = user.projects.split(",");
          let isProject = false;
          userProjects.forEach(project => {
            if (this.state.projects.includes(project)) {
              isProject = true;
            }
          });

          if (isProject) {
            console.log("is project");
            return user;
          }
        }
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
            {/* {status === "Menedżer" ||
            status === "Pracownik" ||
            status === "Klient" ? (
              <React.Fragment> */}
            <div className="form-group form-row">
              <select
                className="form-control"
                onChange={this.onChangeMultiSelect}
                name="projects"
                multiple={true}
                value={this.state.value}
                required
              >
                <option value="">[Przypisz projekty]</option>
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
            <div className="form-group form-row">
              <select
                className="form-control"
                onChange={this.onChangeMultiSelect}
                name="users"
                multiple={true}
                value={this.state.value}
                required
              >
                <option value="">[Przypisz osoby]</option>
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
            {/* </React.Fragment>
            ) : null} */}
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
    users: state.users.users
  };
};

export default connect(mapStateToProps, { registerUser, updateMessages })(
  RegistryForm
);
