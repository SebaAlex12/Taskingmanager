import React, { Component } from "react";
import { connect } from "react-redux";

import SeoContainer from "../store/Seo/components/SeoContainer";
import { fetchProjects } from "../store/Projects/actions";
import { fetchCatalogs } from "../store/Catalogs/actions";

class Seo extends Component {
  constructor(props) {
    super(props);
    const {
      fetchProjects,
      fetchCatalogs,
      loggedUser: { company },
    } = this.props;
    fetchProjects(company);
    fetchCatalogs();
  }
  render() {
    return <SeoContainer />;
  }
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
  };
};
export default connect(mapStateToProps, { fetchProjects, fetchCatalogs })(Seo);
