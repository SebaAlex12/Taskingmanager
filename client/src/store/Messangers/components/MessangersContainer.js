import React, { Component } from "react";
import { connect } from "react-redux";

import MessangersList from "./MessangersList";
import MessangersForm from "./MessangersForm";

class MessangersContainer extends Component {
  render() {
    console.log("messangers", this.props);
    return (
      <div>
        <MessangersList />
        <MessangersForm />;
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messangers: state.messangers.messangers
  };
};

export default connect(mapStateToProps, {})(MessangersContainer);
