import React, { Component } from "react";
import { connect } from "react-redux";

import ProjectsEditForm from "./ProjectsEditForm";
import { updateFilter } from "../../Filters/actions";

import MailsAddForm from "../../Mails/components/MailsAddForm";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";

class ProjectsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEditForm: false,
      showModalTrigger: false
    };
  }
  updateFilterHandler = () => {
    const {
      item,
      filters: { statuses, priorities, responsiblePerson },
      updateFilter
    } = this.props;
    const projectName = item.name;
    updateFilter({ statuses, priorities, projectName, responsiblePerson });
  };
  showModal = result => {
    this.setState({
      ...this.state,
      showModalTrigger: result
    });
  };
  render() {
    const {
      item,
      filters: { projectName },
      loggedUser,
      users
    } = this.props;
    const { toggleEditForm, showModalTrigger } = this.state;

    // get users emails assign to this project
    let projectUsersEmails = "";
    users.forEach(user => {
      // console.log("split", user.projects);
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

    // console.log("projects string", projectUsersEmails);
    let clazz_box;

    clazz_box =
      item.name === projectName
        ? "btn btn-default selected"
        : "btn btn-default";

    return (
      <div className={clazz_box}>
        <div className="title" onClick={this.updateFilterHandler}>
          {item.name}
        </div>
        <div className="edit-form">
          <i
            className="glyphicon glyphicon-envelope"
            onClick={() => this.showModal(true)}
          ></i>
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
          {loggedUser.status === "Administrator" ? (
            <React.Fragment>
              <i
                className="glyphicon glyphicon-edit"
                onClick={() =>
                  this.setState({ toggleEditForm: !toggleEditForm })
                }
              ></i>
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
    users: state.users.users
  };
};

export default connect(mapStateToProps, { updateFilter })(ProjectsItem);
