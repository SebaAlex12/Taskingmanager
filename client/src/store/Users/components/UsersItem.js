import React, { Component } from "react";
import { connect } from "react-redux";

import UsersEditForm from "./UsersEditForm";
import MailsAddForm from "../../Mails/components/MailsAddForm";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import { updateFilter } from "../../Filters/actions";

import { SmallerButton } from "../../../themes/basic";
import { faEnvelope, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class UsersItem extends Component {
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
      filters: { statuses, priorities, projectName },
      updateFilter
    } = this.props;
    const responsiblePerson = item.name;
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
      loggedUser,
      filters: { responsiblePerson }
    } = this.props;
    const { toggleEditForm, showModalTrigger } = this.state;

    let clazz_box;
    let clazz;

    clazz_box =
      item.name === responsiblePerson
        ? "btn btn-default selected"
        : "btn btn-default";

    switch (item.status) {
      case "Administrator":
        clazz = "status admin";
        break;
      case "Pracownik":
        clazz = "status employee";
        break;
      case "Klient":
        clazz = "status client";
        break;
      default:
        clazz = "status default";
        break;
    }

    return (
      <div className={clazz_box}>
        <div className="title" onClick={this.updateFilterHandler}>
          <i className={clazz}>{item.status.substr(0, 1)}</i>
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
                title={"Wiadomość Crm - " + "autor: " + loggedUser.name}
                to={item.email}
              />
            </ModalDialog>
          ) : null}
          {loggedUser.status === "Administrator" ? (
            <React.Fragment>
              <SmallerButton
                title="edytuj"
                onClick={() =>
                  this.setState({ toggleEditForm: !toggleEditForm })
                }
              >
                <FontAwesomeIcon icon={faEdit} />
              </SmallerButton>
              {toggleEditForm ? <UsersEditForm item={item} /> : null}
            </React.Fragment>
          ) : item.status !== "Administrator" &&
            item.name !== loggedUser.name ? (
            <React.Fragment>
              <SmallerButton
                title="edytuj"
                onClick={() =>
                  this.setState({ toggleEditForm: !toggleEditForm })
                }
              >
                <FontAwesomeIcon icon={faEdit} />
              </SmallerButton>
              {toggleEditForm ? <UsersEditForm item={item} /> : null}
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
    filters: state.filters.filters
  };
};

export default connect(mapStateToProps, { updateFilter })(UsersItem);
