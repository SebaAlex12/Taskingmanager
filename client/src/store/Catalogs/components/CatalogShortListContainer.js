import React, { Component } from "react";
import { connect } from "react-redux";

import CatalogAddForm from "./CatalogAddForm";
import CatalogShortList from "./CatalogShortList";
import { Button } from "../../../themes/basic";
import Aux from "../../../hoc/Auxiliary";

class CatalogShortListContainer extends Component {
  constructor(props) {
    super(props);
    const { catalogs } = this.props;
    this.state = {
      showShortList: false,
      catalogs: catalogs,
    };
  }
  render() {
    const { catalogs, showShortList } = this.state;
    const showShortContent = showShortList ? (
      <CatalogShortList catalogs={catalogs} />
    ) : null;

    return (
      <Aux>
        <CatalogAddForm />
        <Button
          onClick={() => this.setState({ showShortList: !showShortList })}
          style={showShortList ? { backgroundColor: "green" } : null}
        >
          Lista katalogów
        </Button>
        {showShortContent}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    catalogs: state.catalogs.catalogs,
  };
};

export default connect(mapStateToProps)(CatalogShortListContainer);
