import React, { Component } from "react";
import { connect } from "react-redux";

import UsersEditForm from "./UsersEditForm";
import { updateFilter } from "../../Filters/actions";

class UsersItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEditForm: false
    };
  }
  updateFilterHandler = () => {
    const {
      item,
      filters: { statuses, priorities, projectName },
      updateFilter
    } = this.props;
    const responsiblePerson = item.name;
    updateFilter({ statuses, priorities, projectName, responsiblePerson });
  };
  render() {
    const { item } = this.props;
    const { toggleEditForm } = this.state;
    return (
      <div className="btn btn-default">
        <div onClick={this.updateFilterHandler}>{item.name}</div>
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
  return {
    filters: state.filters.filters
  };
};

export default connect(
  mapStateToProps,
  { updateFilter }
)(UsersItem);
