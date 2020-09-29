import React, { Component } from "react";

import QuickSearcher from "../../../common/Forms/components/QuickSearcher";
import styled from "styled-components";

class CatalogProjectsContainer extends Component {
  constructor(props) {
    super(props);
    const { websites } = this.props;
    this.state = {
      websites: websites,
      filteredItems: websites,
    };
  }
  onChangeSearcherHandler = (obj) => {
    const { websites } = this.state;
    const filteredItems = websites.filter((item) => {
      return item.name.toLowerCase().indexOf(obj.filteredName) !== -1;
    });
    this.setState({
      filteredItems: filteredItems,
    });
  };
  render() {
    const { filteredItems } = this.state;

    let n = 1;
    const websitesListContent = filteredItems
      ? filteredItems.map((website) => (
          <div key={n++}>
            <strong>{website.name}</strong> ścieżka:[{website.path}]
          </div>
        ))
      : null;
    return (
      <CatalogProjectsContainerStyled>
        <div className="catalog-projects-container-box">
          <QuickSearcher
            onChange={this.onChangeSearcherHandler}
            title="Wyszukaj stronę www"
            placeholder="Wyszukaj stronę www"
          />
          {websitesListContent}
        </div>
      </CatalogProjectsContainerStyled>
    );
  }
}
export default CatalogProjectsContainer;

const CatalogProjectsContainerStyled = styled.div`
  .catalog-projects-container-box {
    box-sizing: border-box;
    border: 1px solid #dedede;
    padding: 10px 15px;
    width: 100%;
    height: 115px;
    overflow-y: auto;
  }
  .catalog-projects-container-box div {
    text-align: left;
  }
`;
