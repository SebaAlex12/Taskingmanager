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
      projects: [],
      users: []
    };
  }
  componentDidMount() {
    const {
      item: { _id, name, email, status, projects, company, users }
    } = this.props;

    this.setState({
      _id,
      name,
      email,
      status,
      company,
      projects: projects ? projects.split(",") : [],
      users: users ? users.split(",") : []
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
  updateHandler = event => {
    const { updateUser, updateMessages } = this.props;
    const {
      _id,
      name,
      email,
      password,
      status,
      projects,
      users,
      company
    } = this.state;

    const data = {
      _id,
      name,
      email,
      password,
      status,
      company,
      projects,
      users
    };

    const response = updateUser(data);
    if (response) {
      updateMessages([
        { name: "Użytkownik" },
        { value: "dane zostały zmienione" }
      ]);
    }
    event.preventDefault();
  };
  render() {
    const { name, email, password, status, company } = this.state;
    const { projects, companies, loggedUser } = this.props;

    console.log("user state", this.state);
    // console.log("users", this.props.users);
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
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
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
                ? user_statuses.map(stats => {
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
              value={this.state.projects}
              // defaultValue={this.state.projects}
              required
            >
              <option value="">[Przypisz projekty]</option>
              {projects
                ? projects.map(project => {
                    return (
                      <option
                        key={project._id}
                        value={project.name}
                        selected={
                          this.state.projects.includes(project.name)
                            ? "selected"
                            : null
                        }
                      >
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
              value={this.state.users}
              // defaultValue={this.state.users}
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
              onClick={this.updateHandler}
              className="btn btn-primary float-right"
              type="submit"
              value="zapisz"
            />
          </div>
        </form>
      </div>
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

export default connect(mapStateToProps, { updateUser, updateMessages })(
  UsersEditFrom
);
