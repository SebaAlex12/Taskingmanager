import React, { Component } from "react";
import { connect } from "react-redux";

import FiltersForm from "./FiltersForm";

class FiltersContainer extends Component {
  render() {
    return <FiltersForm />;
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters.filters
  };
};

export default connect(
  mapStateToProps,
  {}
)(FiltersContainer);
