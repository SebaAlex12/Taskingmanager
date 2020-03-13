import React, { Component } from "react";
import { connect } from "react-redux";

import { updateFilter } from "../actions";
import { StyledFilters } from "../styles/StyledFilters";

class FiltersForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statuses: [],
      priorities: [],
      projectName: "",
      responsiblePerson: ""
    };
  }
  componentDidMount() {
    const {
      filters: { statuses, priorities, projectName, responsiblePerson }
    } = this.props;
    this.setState({
      statuses,
      priorities,
      projectName,
      responsiblePerson
    });
  }

  onChangeStatusHandler = event => {
    // console.log("lll");
    const { updateFilter } = this.props;
    let { statuses, priorities, projectName, responsiblePerson } = this.state;
    // event.preventDefault();
    statuses.map(status => {
      if (status.name === event.target.name) {
        status.active = event.target.checked;
      }
      return status;
    });
    updateFilter({ statuses, priorities, projectName, responsiblePerson });
    this.setState({
      statuses
    });
    // console.log(event.target);
  };

  onChangePriorityHandler = event => {
    const { updateFilter } = this.props;
    let { statuses, priorities, projectName, responsiblePerson } = this.state;
    // event.preventDefault();
    priorities.map(priority => {
      if (priority.name === event.target.name) {
        priority.active = event.target.checked;
      }
      return priority;
    });
    updateFilter({ statuses, priorities, projectName, responsiblePerson });
    this.setState({
      priorities
    });
  };

  render() {
    const { statuses, priorities } = this.state;
    let stateContent = "";
    let priorityContent = "";

    // console.log("filter state", this.state);

    if (statuses) {
      let counter = 1;
      stateContent = statuses.map(status => {
        // console.log(status.active);
        // let checked = status.active ? checked=true : null;
        return (
          <div className="form-check" key={counter++}>
            <input
              className="form-check-input"
              type="checkbox"
              name={status.name}
              // value={status.active}
              onChange={this.onChangeStatusHandler}
              checked={status.active}
            />
            <label className="form-check-label" htmlFor={status.name}>
              {status.name}
            </label>
          </div>
        );
      });
    }

    if (priorities) {
      let counter = 1;
      priorityContent = priorities.map(priority => {
        return (
          <div className="form-check" key={counter++}>
            <input
              className="form-check-input"
              type="checkbox"
              name={priority.name}
              onChange={this.onChangePriorityHandler}
              checked={priority.active}
            />
            <label className="form-check-label" htmlFor={priority.name}>
              {priority.name}
            </label>
          </div>
        );
      });
    }

    return (
      <StyledFilters>
        <div className="filter-form-box">
          <form action="">
            <div className="form-group row">
              <label>[Stan]</label>
              {stateContent}
            </div>
            <div className="form-group row">
              <label>[Priorytet]</label>
              {priorityContent}
            </div>
          </form>
        </div>
      </StyledFilters>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user,
    filters: state.filters.filters
  };
};

export default connect(mapStateToProps, { updateFilter })(FiltersForm);
