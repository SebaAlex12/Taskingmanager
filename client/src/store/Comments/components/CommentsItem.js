import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class CommentsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDescriptionMore: false
    };
  }
  render() {
    const { item, responsiblePerson } = this.props;
    const { toggleDescriptionMore } = this.state;
    const charts = 100;
    // console.log("item user", item);

    const isActive =
      item.createdBy === responsiblePerson
        ? "list-group-item creator"
        : "list-group-item";

    const isDisabled =
      item.description.length < charts
        ? "glyphicon glyphicon-edit disabled"
        : "glyphicon glyphicon-edit";

    return (
      <li className={isActive}>
        <div className="date">
          {moment(new Date(item.createdAt))
            .locale("de")
            .format("LLLL")}
        </div>
        <div className="creator-name">{item.createdBy}</div>
        <div className="content-box">
          <div className="details">
            <i
              className={isDisabled}
              onClick={() =>
                this.setState({
                  toggleDescriptionMore: !toggleDescriptionMore
                })
              }
            ></i>
          </div>
          {toggleDescriptionMore ? (
            <div className="description">{item.description}</div>
          ) : (
            <div className="short-description">
              {item.description.substring(0, charts)}
            </div>
          )}
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, {})(CommentsItem);
