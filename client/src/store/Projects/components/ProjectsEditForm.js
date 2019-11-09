import React, { Component } from "react";
import { connect } from "react-redux";

import { updateProject } from "../actions";

class ProjectsEditFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: ""
    };
  }
  componentDidMount() {
    const {
      item: { _id, name, description }
    } = this.props;
    this.setState({
      _id,
      name,
      description
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
    const { updateProject } = this.props;
    const { _id, name, description } = this.state;

    const data = {
      _id,
      name,
      description
    };
    updateProject(data);
    event.preventDefault();
  };
  render() {
    const { name, description } = this.state;
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
              disabled
              required
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={this.onChangeInput}
              type="text"
              name="description"
              value={description}
              className="form-control"
              rows="5"
              placeholder="Opis"
              required
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

export default connect(
  mapStateToProps,
  { updateProject }
)(ProjectsEditFrom);
