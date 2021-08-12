import React, { Component } from "react";
import { connect } from "react-redux";

import { updateProject, removeProject } from "../actions";
import { updateMessages } from "../../Messages/actions";

import ProjectsEditForm from "./ProjectsEditForm";
import { updateFilter } from "../../Filters/actions";

import MailsAddForm from "../../Mails/components/MailsAddForm";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";

import TasksShortList from "../../Tasks/components/TasksShortList";

import { SmallerButton } from "../../../themes/basic";
import {
  faEdit,
  faFilter,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProjectsItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleEditForm: false,
      toggleEditName: false,
      showModalTrigger: false,
      showModalTasksListTrigger: false,
      projectName: props.item.name,
      filteredTasksList: props.tasks.filter(task => task.projectName === props.item.name)
    };
  }
  updateFilterHandler = () => {
    const {
      item,
      filters: { statuses, priorities, responsiblePerson },
      updateFilter
    } = this.props;
    const filterProjectName = item.name;
    updateFilter({ statuses, priorities, filterProjectName, responsiblePerson });
  };
  deleteHandler = () => {
      const { item: { _id, name }, removeProject } = this.props;
      const result = window.confirm(
        "Czy napewno chcesz usunąć projekt: " + name
      );
      if (result === true) {
        const response = removeProject(_id);
        if (response) {
          updateMessages([
            { name: "Projekt" },
            { value: name + " został usunięty" },
          ]);
        }
      }
  }
  updateHandler = () => {
    const { updateProject, item : { _id } } = this.props;
    const { projectName } = this.state;
    updateProject({ _id, name: projectName });
    this.setState({
      ...this.state,
      toggleEditName: false
    })
  }
  onChangeHandler = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  showModal = result => {
    this.setState({
      ...this.state,
      showModalTrigger: result
    });
  };
  render() {
    const {
      item,
      filters: { filterProjectName },
      loggedUser,
      users
    } = this.props;
    const { 
      toggleEditForm, 
      toggleEditName, 
      showModalTrigger, 
      showModalTasksListTrigger,
      projectName,
      filteredTasksList
    } = this.state;

    // if(allPosts){
    //   console.log("allPosts",allPosts);
    // }

    // get users emails assign to this project
    let projectUsersEmails = "";
    users.forEach(user => {
      if (user.projects) {
        const projects = user.projects.split(",");
        if (projects.includes(item.name)) {
          if (projectUsersEmails.length > 0) {
            projectUsersEmails = projectUsersEmails + "," + user.email;
          } else {
            projectUsersEmails = user.email;
          }
        }
      }
    });

    let clazz_box;

    clazz_box = item.name === filterProjectName ? "item-box selected" : "item-box";

    return (
      <div className={clazz_box}>
        <div className="title">
          <div className="name">
          <span className="task-counter" style={{fontWeight:"bold",marginRight:"4px"}}>{ filteredTasksList.length }</span>
            {
              toggleEditName ? (
                <input 
                type="text" 
                name="projectName"
                onChange={(event) => this.onChangeHandler(event)}
                value={projectName}
                />
              ) : <span onClick={() => this.setState({toggleEditName:true})}>{item.name}</span>
            }
            
          </div>
          <div className="buttons">
            <SmallerButton onClick={this.updateFilterHandler}>
              <FontAwesomeIcon title="filtruj po nazwie" icon={faFilter} />
            </SmallerButton>

            {/* <SmallerButton
              onClick={() => this.showModal(true)}
              title="wyślij maila"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </SmallerButton> */}
            {loggedUser.status === "Administrator" ||
            loggedUser.status === "Menedżer" ? (

                <SmallerButton
                  title="edytuj"
                  onClick={() =>
                    this.setState({ toggleEditForm: !toggleEditForm })
                  }
                >
                  <FontAwesomeIcon icon={faEdit} />
                </SmallerButton>

            ) : null}
            {
              loggedUser.status === "Administrator" && (
                <React.Fragment>
                  {/* <SmallerButton onClick={this.updateHandler}>
                    <FontAwesomeIcon style={{color:"green"}} title="zapisz projekt" icon={faPen} />
                  </SmallerButton> */}
                  <SmallerButton
                        onClick={() => this.setState({showModalTasksListTrigger:true})}
                  >
                      <FontAwesomeIcon icon={faTimes} style={{color:"red"}}/>
                  </SmallerButton>
                </React.Fragment>
              )
            }
          </div>
        </div>
        <div className="edit-form">
          {showModalTrigger ? (
            <ModalDialog
              title="Wyślij email"
              showModal={() => this.showModal(false)}
            >
              <MailsAddForm
                title={
                  "Wiadomość Crm - " +
                  (item.name ? "projekt: " + item.name + ", " : "") +
                  "autor: " +
                  loggedUser.name
                }
                projectName={item.name}
                to={projectUsersEmails}
              />
            </ModalDialog>
          ) : null}
          {
            showModalTasksListTrigger && (
              <ModalDialog 
                  showModal={() => this.setState({showModalTasksListTrigger:false})}
              >
                <TasksShortList 
                    deleteProjectHandler={this.deleteHandler}
                    tasks={filteredTasksList}
                />
              </ModalDialog>
            )
          }
          {loggedUser.status === "Administrator" ||
          loggedUser.status === "Menedżer" ||
          loggedUser.status === "Pracownik" ? (
            <React.Fragment>
              {toggleEditForm ? <ProjectsEditForm item={item} /> : null}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user,
    filters: state.filters.filters,
    users: state.users.users,
    tasks: state.tasks.tasks
  };
};

export default connect(mapStateToProps, { updateFilter, updateProject, removeProject })(ProjectsItem);
