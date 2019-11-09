import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";
import { StyledProjectList } from "../styles/StyledProjectList";

import { fetchProjects, removeProject, updateProject } from "../actions";
import ProjectsAddForm from "./ProjectsAddForm";
import ProjectsItem from "./ProjectsItem";

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
    const { projects, loggedUser } = this.props;
    const { toggleProjectsAddForm, toggleProjectsList } = this.state;
    const projectsContent = projects.map(project => {
      return <ProjectsItem item={project} key={project._id} />;
    });
    const windowHeight = window.innerHeight - 50;
    return (
      <StyledProjectList>
        <div className="projects-box">
          {loggedUser.status === "Administrator" ? (
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
          ) : null}
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
              <div
                className="projects-list"
                style={{ height: `${windowHeight}px` }}
              >
                {projectsContent}
              </div>
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
