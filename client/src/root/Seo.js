import React, { Component } from "react";
import { connect } from "react-redux";

import SeoContainer from "../store/Seo/components/SeoContainer";
import { fetchProjects } from "../store/Projects/actions";

class Seo extends Component {
  componentDidMount() {
    const {
      fetchProjects,
      loggedUser: { company },
    } = this.props;
    fetchProjects(company);
    console.log(company);
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
export default connect(mapStateToProps, { fetchProjects })(Seo);
