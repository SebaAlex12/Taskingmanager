import React, { Component } from "react";
import { connect } from "react-redux";

import CompaniesEditForm from "./CompaniesEditForm";

import MailsAddForm from "../../Mails/components/MailsAddForm";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";

import { SmallerButton } from "../../../themes/basic";
import { faEnvelope, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CompaniesItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEditForm: false,
      showModalTrigger: false
    };
  }
  showModal = result => {
    this.setState({
      ...this.state,
      showModalTrigger: result
    });
  };
  render() {
    const { item, loggedUser } = this.props;
    const { toggleEditForm, showModalTrigger } = this.state;

    let clazz_box;

    clazz_box = "btn btn-default";

    return (
      <div className={clazz_box}>
        <div className="title">{item.name}</div>
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
                  (item.name ? "firma: " + item.name + ", " : "") +
                  "autor: " +
                  loggedUser.name
                }
                projectName={item.name}
                to={item.mail}
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
              {toggleEditForm ? <CompaniesEditForm item={item} /> : null}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, {})(CompaniesItem);
