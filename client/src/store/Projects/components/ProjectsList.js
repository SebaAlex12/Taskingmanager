import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

import { BiggerButton, SmallerButton, ListBox } from "../../../themes/basic";
import { StyledProjectList } from "../styles/StyledProjectList";
import {
  faTimes,
  faArrowAltCircleDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeTask } from "../../Tasks/actions";

import { removeProject, updateProject } from "../actions";
import { updateFilter } from "../../Filters/actions";
import ProjectsAddForm from "./ProjectsAddForm";
import ProjectsItem from "./ProjectsItem";

import { apiUrl } from '../../ini';

class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTasks: {},
      projectFilterName: "",
      toggleProjectsAddForm: false,
      toggleProjectsList: false
    };
  }
  componentDidMount = () => {
    this.fetchAllTasks();      
  }
  fetchAllTasks = async() => {
    try{
        let response = await axios.get(apiUrl + '/fetchAllTasks');
        let { data } = response;
        if(data){
          this.setState({allTasks:data});
        }
    }catch(errors){
        return errors;
    }
  };
  // fetchAllTasks = () => {
  //   return axios.get("/fetchAllTasks")
  //   .then(response => {
  //     const { data } = response;
  //     this.setState({allTasks:data});
  //     // return response.data;
  //   })
  //   .catch(errors => {
  //     console.log("catch errors",errors);
  //     return errors;
  //   })
  // }
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
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
  filterItems = items => {
    const { projectFilterName } = this.state;
    const filteredItems = items.filter(item => {
      return item.name.toLowerCase().indexOf(projectFilterName) !== -1;
    });
    if (document.querySelector(".remove-filter")) {
      if (projectFilterName.length > 0) {
        document.querySelector(".remove-filter").classList.add("active");
      } else {
        document.querySelector(".remove-filter").classList.remove("active");
      }
    }
    return filteredItems;
  };
  toggleClassHandler = event => {
    event.preventDefault();
    event.target.classList.toggle("active");
    this.setState({
      projectFilterName: ""
    });
  };
  deleteTaskHandler = taskId => {
    const { allTasks } = this.state;
    const { removeTask } = this.props;
    if(window.confirm(`Czy na pewno chcesz usunać zadanie o id - ${taskId} ?`)){
        removeTask(taskId);
        this.setState({allTasks: allTasks.filter(item=>item._id !== taskId)});
    }
  }
  render() {
    const {
      loggedUser,
      filters: { projectName }
    } = this.props;
    const {
      allTasks,
      projectFilterName,
      toggleProjectsAddForm,
      toggleProjectsList
    } = this.state;

    let projects =
      this.state.projects > 0 ? this.state.projects : this.props.projects;

    if (projects && projects.length > 0) {
      projects = this.filterItems(projects);
    }

    const projectsContent = projects.length > 0 ? projects.map(project => {
      // const projectTasks = allTasks.filter(task => task.projectName === project.name);
      const projectTasks = [];
      return <ProjectsItem item={project} key={project._id} projectTasks={projectTasks} deleteTaskHandler={this.deleteTaskHandler}/>;
    }) : "project tasks are loading...";
    const windowHeight = window.innerHeight - 50;
    const clazz =
      projectName !== ""
        ? "glyphicon glyphicon-filter active"
        : "glyphicon glyphicon-filter";

    const btn_clazz = toggleProjectsAddForm ? "flow-box active" : "flow-box";
    const btn_list_clazz = toggleProjectsList
      ? "project-list-flow-box active"
      : "project-list-flow-box";

    return (
      <StyledProjectList>
        <div className="projects-box">
          <div className={btn_list_clazz}>
            <BiggerButton
              variant="primary"
              title="Pokaż listę projektów"
              onClick={() =>
                this.setState({
                  toggleProjectsList: !toggleProjectsList
                })
              }
            >
              <FontAwesomeIcon icon={faArrowAltCircleDown} />
              <span>Lista Projektów</span>
            </BiggerButton>
            <i
              className={clazz}
              onClick={
                projectName !== "" ? this.removeProjectFilterNameHandler : null
              }
            ></i>
            {toggleProjectsList ? (
              <ListBox
                className="projects-list"
                style={{ height: `${windowHeight}px` }}
              >
                <SmallerButton
                  className="remove-filter"
                  onClick={this.toggleClassHandler}
                >
                  <FontAwesomeIcon title="usuń filtrowanie" icon={faTimes} />
                </SmallerButton>
                <div className="filter-box">
                  <TextFieldGroup
                    onChange={this.onChangeInput}
                    value={projectFilterName}
                    type="text"
                    name="projectFilterName"
                    className="form-control"
                    placeholder="filtruj po nazwie"
                    title="filtruj po nazwie"
                  />
                </div>
                <div className="items">{projectsContent}</div>
              </ListBox>
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
  removeTask,
  removeProject,
  updateProject,
  updateFilter
})(ProjectsList);
