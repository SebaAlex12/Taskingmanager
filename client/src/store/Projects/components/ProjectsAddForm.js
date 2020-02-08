import React, { Component } from "react";
import { connect } from "react-redux";

import { addProject } from "../actions";
import { StyledProjectForm } from "../styles/StyledProjectForm";

class ProjectsAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      cms: "",
      ftp: "",
      panel: ""
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
    const { addProject } = this.props;
    const { name, description, cms, ftp, panel } = this.state;

    const data = {
      name,
      description,
      cms,
      ftp,
      panel
    };

    event.preventDefault();

    addProject(data);
  };
  render() {
    return (
      <StyledProjectForm>
        <div className="project-add-form-box">
          <form action="">
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="name"
                className="form-control"
                placeholder="Nazwa"
                title="Nazwa domeny"
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
                title="Opis"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="cms"
                className="form-control"
                placeholder="Cms hasło"
                title="Cms hasło"
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="ftp"
                className="form-control"
                placeholder="Ftp hasło"
                title="Ftp hasło"
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.onChangeInput}
                type="text"
                name="panel"
                className="form-control"
                placeholder="Panel hasło"
                title="Panel hasło"
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
      </StyledProjectForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, { addProject })(ProjectsAddForm);
