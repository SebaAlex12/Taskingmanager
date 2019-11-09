import React, { Component } from "react";
import { connect } from "react-redux";

import UsersEditForm from "./UsersEditForm";

class UsersItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEditForm: false
    };
  }
  render() {
    const { item } = this.props;
    const { toggleEditForm } = this.state;
    return (
      <div className="btn btn-default">
        {item.name}
        <div className="edit-form">
          <i
            className="glyphicon glyphicon-edit"
            onClick={() => this.setState({ toggleEditForm: !toggleEditForm })}
          ></i>
          {toggleEditForm ? <UsersEditForm item={item} /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(UsersItem);
