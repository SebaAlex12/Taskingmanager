import React, { Component } from "react";
import { connect } from "react-redux";

import { addProject } from "../actions";
import { updateMessages } from "../../Messages/actions";

class ProjectsAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    const { addProject, updateMessages } = this.props;
    const { name, description } = this.state;

    const data = {
      name,
      description
    };

    event.preventDefault();

    const response = addProject(data);
    if (response) {
      updateMessages([{ name: "Projekty" }, { value: "projekt dodany" }]);
    }
  };
  render() {
    return (
      <div className="project-add-form-box">
        <form action="">
          <div className="form-group">
            <input
              onChange={this.onChangeInput}
              type="text"
              name="name"
              className="form-control"
              placeholder="Nazwa"
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
    loggedUser: state.users.logged_user,
    errors: state.projects.errors
  };
};

export default connect(mapStateToProps, { addProject, updateMessages })(
  ProjectsAddForm
);
