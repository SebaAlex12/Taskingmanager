import React, { Component } from "react";
import { connect } from "react-redux";

import ProjectsEditForm from "./ProjectsEditForm";

class ProjectsItem extends Component {
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
        <div className="title">{item.name}</div>
        <div className="edit-form">
          <i
            className="glyphicon glyphicon-edit"
            onClick={() => this.setState({ toggleEditForm: !toggleEditForm })}
          ></i>
          {toggleEditForm ? <ProjectsEditForm item={item} /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(ProjectsItem);
