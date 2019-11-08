import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";
import { StyledProjectList } from "../styles/StyledProjectList";

import { fetchProjects, removeProject, updateProject } from "../actions";
import ProjectsAddForm from "./ProjectsAddForm";

class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleProjectsAddForm: false,
      toggleProjectsList: false
    };
  }
  componentDidMount() {
    const { fetchProjects } = this.props;
    fetchProjects();
  }
  removeProjectHandler = id => {
    const { removeProject } = this.props;
    removeProject(id);
  };
  updateProjectHandler = data => {
    const { updateProject } = this.props;
    updateProject(data);
  };
  render() {
    const { projects } = this.props;
    const { toggleProjectsAddForm, toggleProjectsList } = this.state;
    const projectsContent = projects.map(project => {
      return <div className="btn btn-default">{project.name}</div>;
    });
    return (
      <StyledProjectList>
        <div className="projects-box">
          <div className="flow-box">
            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  toggleProjectsAddForm: !toggleProjectsAddForm
                })
              }
            >
              Dodaj projekt
            </Button>
            {toggleProjectsAddForm ? <ProjectsAddForm /> : null}
          </div>
          <div className="project-list-flow-box">
            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  toggleProjectsList: !toggleProjectsList
                })
              }
            >
              Lista projektów
            </Button>
            {toggleProjectsList ? (
              <div className="projects-list">{projectsContent}</div>
            ) : null}
          </div>
        </div>
      </StyledProjectList>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    loggedUser: state.users.logged_user
  };
};

export default connect(
  mapStateToProps,
  { fetchProjects, removeProject, updateProject }
)(ProjectsList);
