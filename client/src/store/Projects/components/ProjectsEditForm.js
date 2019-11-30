import React, { Component } from "react";
import { connect } from "react-redux";

import { updateProject } from "../actions";
import { updateMessages } from "../../Messages/actions";

class ProjectsEditFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
      cms: "",
      ftp: "",
      panel: ""
    };
  }
  componentDidMount() {
    const {
      item: { _id, name, description, cms, ftp, panel }
    } = this.props;
    this.setState({
      _id,
      name,
      description,
      cms,
      ftp,
      panel
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
  updateHandler = event => {
    const { updateProject, updateMessages } = this.props;
    const { _id, name, description, cms, ftp, panel } = this.state;

    const data = {
      _id,
      name,
      description,
      cms,
      ftp,
      panel
    };
    const response = updateProject(data);
    if (response) {
      updateMessages([
        { name: "Projekty" },
        { value: "opis został zmieniony" }
      ]);
    }
    event.preventDefault();
  };
  toggleClassHandler = event => {
    event.preventDefault();
    event.target.classList.toggle("active");
  };
  render() {
    const { name, description, cms, ftp, panel } = this.state;
    return (
      <div className="project-update-form-box">
        <form action="">
          <div className="form-group">
            <input
              onChange={this.onChangeInput}
              type="text"
              name="name"
              value={name}
              className="form-control"
              placeholder="Nazwa"
              title="Nazwa domeny"
              disabled
              required
            />
          </div>
          <div className="form-group">
            <i
              className="show-hide-button glyphicon glyphicon-eye-open"
              onClick={this.toggleClassHandler}
            ></i>
            <div className="glass">dane ukryte</div>
            <textarea
              onChange={this.onChangeInput}
              type="text"
              name="description"
              value={description}
              className="form-control"
              rows="5"
              placeholder="Opis"
              title="Opis"
            />
          </div>
          <div className="form-group">
            <i
              className="show-hide-button glyphicon glyphicon-eye-open"
              onClick={this.toggleClassHandler}
            ></i>
            <div className="glass">dane ukryte</div>
            <input
              onChange={this.onChangeInput}
              type="text"
              name="cms"
              value={cms}
              className="form-control"
              placeholder="Cms hasło"
              title="Cms hasło"
            />
          </div>
          <div className="form-group">
            <i
              className="show-hide-button glyphicon glyphicon-eye-open"
              onClick={this.toggleClassHandler}
            ></i>
            <div className="glass">dane ukryte</div>
            <input
              onChange={this.onChangeInput}
              type="text"
              name="ftp"
              value={ftp}
              className="form-control"
              placeholder="Ftp hasło"
              title="Ftp hasło"
            />
          </div>
          <div className="form-group">
            <i
              className="show-hide-button glyphicon glyphicon-eye-open"
              onClick={this.toggleClassHandler}
            ></i>
            <div className="glass">dane ukryte</div>
            <input
              onChange={this.onChangeInput}
              type="text"
              name="panel"
              value={panel}
              className="form-control"
              placeholder="Panel hasło"
              title="Panel hasło"
            />
          </div>
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
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, { updateProject, updateMessages })(
  ProjectsEditFrom
);
