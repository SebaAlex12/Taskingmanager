import React, { Component } from "react";
import { connect } from "react-redux";

class MessengersUsersItem extends Component {
  render() {
    const {
      item: { _id, name, status },
      filterSelectedUsersHandler,
      selectedChannelId
    } = this.props;

    let clazz =
      _id === selectedChannelId ? "chat_list active_chat" : "chat_list";

    return (
      <div className={clazz}>
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
