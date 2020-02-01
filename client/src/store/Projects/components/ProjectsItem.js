import React, { Component } from "react";
import { connect } from "react-redux";

import ProjectsEditForm from "./ProjectsEditForm";
import { updateFilter } from "../../Filters/actions";

class ProjectsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEditForm: false
    };
  }
  updateFilterHandler = () => {
    const {
      item,
      filters: { statuses, priorities, responsiblePerson },
      updateFilter
    } = this.props;
    const projectName = item.name;
    updateFilter({ statuses, priorities, projectName, responsiblePerson });
  };
  render() {
    const {
      item,
      filters: { projectName },
      loggedUser
    } = this.props;
    const { toggleEditForm } = this.state;

    let clazz_box;

    clazz_box =
      item.name === projectName
        ? "btn btn-default selected"
        : "btn btn-default";

    return (
      <div className={clazz_box}>
        <div className="title" onClick={this.updateFilterHandler}>
          {item.name}
        </div>
        {loggedUser.status === "Administrator" ? (
          <div className="edit-form">
            <i
              className="glyphicon glyphicon-edit"
              onClick={() => this.setState({ toggleEditForm: !toggleEditForm })}
            ></i>
            {toggleEditForm ? <ProjectsEditForm item={item} /> : null}
          </div>
        ) : null}
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

export default connect(mapStateToProps, { updateFilter })(ProjectsItem);
