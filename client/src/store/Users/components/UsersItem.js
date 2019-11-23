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
    const {
      item,
      filters: { responsiblePerson }
    } = this.props;
    const { toggleEditForm } = this.state;

    let clazz_box;
    let clazz;

    clazz_box =
      item.name === responsiblePerson
        ? "btn btn-default selected"
        : "btn btn-default";

    switch (item.status) {
      case "Administrator":
        clazz = "status admin";
        break;
      case "Pracownik":
        clazz = "status employee";
        break;
      case "Klient":
        clazz = "status client";
        break;
      default:
        clazz = "status default";
        break;
    }

    return (
      <div className={clazz_box}>
        <div className="title" onClick={this.updateFilterHandler}>
          <i className={clazz}>{item.status.substr(0, 1)}</i>
          {item.name}
        </div>
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

export default connect(mapStateToProps, { updateFilter })(UsersItem);
