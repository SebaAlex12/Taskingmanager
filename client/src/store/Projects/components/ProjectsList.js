import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";
import { StyledProjectList } from "../styles/StyledProjectList";

import { fetchProjects, removeProject, updateProject } from "../actions";
import { updateFilter } from "../../Filters/actions";
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
  removeProjectHandler = id => {
    const { removeProject } = this.props;
    removeProject(id);
  };
  updateProjectHandler = data => {
    const { updateProject } = this.props;
    updateProject(data);
  };
  removeProjectFilterNameHandler = () => {
    const {
      updateFilter,
      filters: { statuses, priorities, responsiblePerson }
    } = this.props;
    updateFilter({ statuses, priorities, projectName: "", responsiblePerson });
  };
  render() {
    const {
      projects,
      loggedUser,
      filters: { projectName }
    } = this.props;
    const { toggleProjectsAddForm, toggleProjectsList } = this.state;
    const projectsContent = projects.map(project => {
      return <ProjectsItem item={project} key={project._id} />;
    });
    const windowHeight = window.innerHeight - 50;
    const clazz =
      projectName !== ""
        ? "glyphicon glyphicon-filter active"
        : "glyphicon glyphicon-filter";
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
            <i
              className={clazz}
              onClick={
                projectName !== "" ? this.removeProjectFilterNameHandler : null
              }
            ></i>
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
    loggedUser: state.users.logged_user,
    filters: state.filters.filters
  };
};

export default connect(mapStateToProps, {
  fetchProjects,
  removeProject,
  updateProject,
  updateFilter
})(ProjectsList);
