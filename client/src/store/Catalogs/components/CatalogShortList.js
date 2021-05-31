import React, { Component } from "react";
import { connect } from "react-redux";

import { removeCatalog } from "../actions";
import CatalogShortListItem from "./CatalogShortListItem";
import { StyledCatalogShortList } from "../styles/StyledCatalogShortList";

class CatalogShortList extends Component {
  constructor(props) {
    super(props);
    const { catalogs } = this.props;
    this.state = {
      catalogs: catalogs,
    };
  }
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
          catalogs: catalogs.filter((item) => item._id !== id),
        });
      }
    }
  };
  render() {
    const { catalogs } = this.state;

    const catalogListContent =
      catalogs.length > 0
        ? catalogs.map((item) => (
            <CatalogShortListItem
              key={item._id}
              item={item}
              removeItem={() => this.removeCatalogHandler(item._id)}
            />
          ))
        : null;
    return (
      <StyledCatalogShortList className="catalog-short-list-box">
        <table>
          <thead>
            <tr>
              <th>Adres:</th>
              <th>Ranga</th>
              <th>Status</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>{catalogListContent}</tbody>
        </table>
      </StyledCatalogShortList>
    );
  }
}

export default connect(null, { removeCatalog })(CatalogShortList);
