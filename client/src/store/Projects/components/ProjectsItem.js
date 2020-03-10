import React, { Component } from "react";
import { connect } from "react-redux";

import ProjectsEditForm from "./ProjectsEditForm";
import { updateFilter } from "../../Filters/actions";

import MailsAddForm from "../../Mails/components/MailsAddForm";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";

import { SmallerButton } from "../../../themes/basic";
import { faEnvelope, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <SmallerButton
            onClick={() => this.showModal(true)}
            title="wyślij maila"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </SmallerButton>
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
          {loggedUser.status === "Administrator" || loggedUser.status === "Menadżer" || loggedUser.status === "Pracownik" ? (
            <React.Fragment>
              <SmallerButton
                title="edytuj"
                onClick={() =>
                  this.setState({ toggleEditForm: !toggleEditForm })
                }
              >
                <FontAwesomeIcon icon={faEdit} />
              </SmallerButton>
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
