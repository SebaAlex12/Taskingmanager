import React, { Component } from "react";
import { connect } from "react-redux";

import MailsAddForm from "../../Mails/components/MailsAddForm";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";

class MessengersUsersItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalTrigger: false
    };
  }
  showModal = result => {
    this.setState({
      showModalTrigger: result
    });
  };
  render() {
    const { showModalTrigger } = this.state;
    const {
      item: { _id, name, status, email },
      filterSelectedUsersHandler,
      selectedChannelId,
      loggedUser
    } = this.props;

    let clazz =
      _id === selectedChannelId ? "chat_list active_chat" : "chat_list";

    return (
      <div className={clazz}>
        {name !== "[Administrator+Manager+Employee]" &&
        name !== "[Administrator]" &&
        name !== "[Manager]" &&
        name !== "[Employee]" ? (
          <React.Fragment>
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
                    "Wiadomość Crm - komunikator, autor: " + loggedUser.name
                  }
                  to={email}
                />
              </ModalDialog>
            ) : null}{" "}
          </React.Fragment>
        ) : null}

        <button onClick={() => filterSelectedUsersHandler(name)}>
          <div className="chat_people">
            <div className="chat_img">
              {" "}
              <img src="inspector.png" alt="" />{" "}
            </div>
            <div className="chat_ib">
              <h5>
                {name} / {status} <span className="chat_date"></span>
              </h5>
              <p>
                Test, which is a new approach to have all solutions astrology
                under one roof.
              </p>
            </div>
          </div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, {})(MessengersUsersItem);
