import React, { Component } from "react";
import { connect } from "react-redux";

import ContractorsEditForm from "./ContractorsEditForm";

import MailsAddForm from "../../Mails/components/MailsAddForm";
import PaymentsAddForm from "../../Payments/components/PaymentsAddForm";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";

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
          <i
            className="glyphicon glyphicon-usd"
            onClick={() => this.showPaymentModal(true)}
          ></i>
          <i
            className="glyphicon glyphicon-envelope"
            onClick={() => this.showModal(true)}
          ></i>
          {showPaymentModalTrigger ? (
            <ModalDialog
              title="Dodaj nową płatność"
              showModal={() => this.showPaymentModal(false)}
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
              <i
                className="glyphicon glyphicon-edit"
                onClick={() =>
                  this.setState({ toggleEditForm: !toggleEditForm })
                }
              ></i>
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
