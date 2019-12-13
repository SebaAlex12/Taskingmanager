import React, { Component } from "react";
import { connect } from "react-redux";

import MessangersList from "./MessangersList";
import { StyledMessangersContainer } from "../styles/StyledMessangersContainer";

class MessangersContainer extends Component {
  render() {
    console.log("messangers", this.props);
    return (
      <StyledMessangersContainer className="messanger-container-box">
        <div className="container">
          <h3 className=" text-center">Wiadomości</h3>
          <div className="messaging">
            <div className="inbox_msg">
              <div className="inbox_people">
                <div className="headind_srch">
                  <div className="recent_heading">
                    <h4>Recent</h4>
                  </div>
                  <div className="srch_bar">
                    <div className="stylish-input-group">
                      <input
                        type="text"
                        className="search-bar"
                        placeholder="Search"
                      />
                      <span className="input-group-addon">
                        <button type="button">
                          {" "}
                          <i
                            className="fa fa-search"
                            aria-hidden="true"
                          ></i>{" "}
                        </button>
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <div className="inbox_chat">
                  <div className="chat_list active_chat">
                    <div className="chat_people">
                      <div className="chat_img">
                        {" "}
                        <img src="inspector.png" alt="" />{" "}
                      </div>
                      <div className="chat_ib">
                        <h5>
                          Mister roboto{" "}
                          <span className="chat_date">Dec 25</span>
                        </h5>
                        <p>
                          Test, which is a new approach to have all solutions
                          astrology under one roof.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <MessangersList />
            </div>
          </div>
        </div>
      </StyledMessangersContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    messangers: state.messangers.messangers
  };
};

export default connect(mapStateToProps, {})(MessangersContainer);
