import React, { Component } from "react";
import { connect } from "react-redux";

import ContractorsEditForm from "./ContractorsEditForm";

import MailsAddForm from "../../Mails/components/MailsAddForm";
import PaymentsAddForm from "../../Payments/components/PaymentsAddForm";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";

import { SmallerButton } from "../../../themes/basic";
import {
  faEnvelope,
  faEdit,
  faAsterisk
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ContractorsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEditForm: false,
      showModalTrigger: false,
      showPaymentModalTrigger: false
    };
  }
  showModal = result => {
    this.setState({
      ...this.state,
      showModalTrigger: result
    });
  };
  showPaymentModal = result => {
    this.setState({
      ...this.state,
      showPaymentModalTrigger: result
    });
  };
  render() {
    const { item, loggedUser } = this.props;
    const {
      toggleEditForm,
      showModalTrigger,
      showPaymentModalTrigger
    } = this.state;

    let clazz_box;

    clazz_box = "btn btn-default";

    return (
      <div className={clazz_box}>
        <div className="title">{item.name}</div>
        <div className="edit-form">
          <SmallerButton
            onClick={() => this.showPaymentModal(true)}
            title="dodaj nową płatność"
          >
            <FontAwesomeIcon icon={faAsterisk} />
          </SmallerButton>
          <SmallerButton
            onClick={() => this.showModal(true)}
            title="wyślij maila"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </SmallerButton>
          {showPaymentModalTrigger ? (
            <ModalDialog
              title="Dodaj nową płatność"
              showModal={() => this.showPaymentModal(false)}
              width="960px"
            >
              <PaymentsAddForm contractor={item} />
            </ModalDialog>
          ) : null}
          {showModalTrigger ? (
            <ModalDialog
              title="Wyślij email"
              showModal={() => this.showModal(false)}
            >
              <MailsAddForm
                title={
                  "Wiadomość Crm - " +
                  (item.name ? "kontrahent: " + item.name + ", " : "") +
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
              {toggleEditForm ? <ContractorsEditForm item={item} /> : null}
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

export default connect(mapStateToProps, {})(ContractorsItem);
