import React, { Component } from "react";
import { connect } from "react-redux";

import { sortArray } from "../../../common/tools";

import { removeCatalog, updateCatalog } from "../actions";
import CatalogList from "./CatalogList";
import { StyledCatalogList } from "../styles/StyledCatalogList";

class CatalogListContainer extends Component {
  constructor(props) {
    super(props);
    const { catalogs } = this.props;
    this.state = {
      catalogs: catalogs,
    };
  }
  sortItems = (column, direction) => {
    let { catalogs } = this.state;

    if (direction === "asc") {
      sortArray(catalogs, column);
    }
    if (direction === "desc") {
      sortArray(catalogs, column, -1);
    }
    this.setState({
      catalogs: catalogs,
      // orderColumn: column,
      // orderDirection: direction,
    });
  };
  removeCatalogHandler = async (id) => {
    const { catalogs } = this.state;
    const { removeCatalog } = this.props;

    const result = window.confirm(
      "Czy napewno chcesz usunąć wybrany katalog !"
    );

    if (result) {
      const response = await removeCatalog(id);
      if (response) {
        this.setState({
          catalogs: catalogs.filter((item) => item._id != id),
        });
      }
    }
  };
  updateCatalogHandler = async (element) => {
    const { catalogs } = this.state;
    const { updateCatalog } = this.props;

    const response = await updateCatalog(element);
    if (response) {
      this.setState({
        catalogs: catalogs.map((item) =>
          item._id == element._id ? element : item
        ),
      });
    }
  };
  render() {
    const { catalogs } = this.state;

    const catalogListContent = (
      <CatalogList
        items={catalogs}
        sortItems={this.sortItems}
        removeItem={this.removeCatalogHandler}
        updateItem={this.updateCatalogHandler}
      />
    );

    return (
      <div className="catalog-list-container-box">
        <StyledCatalogList>{catalogListContent}</StyledCatalogList>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    catalogs: state.catalogs.catalogs
  };
};
export default connect(mapStateToProps, { removeCatalog, updateCatalog })(
  CatalogListContainer
);
