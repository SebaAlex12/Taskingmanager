import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";

import CatalogShortListContainer from "../../Catalogs/components/CatalogShortListContainer";
import CatalogListContainer from "../../Catalogs/components/CatalogListContainer";

class SeoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalCatalogAddForm: false,
    };
  }
  update = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964";
    const $json = await axios.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    console.log("json", $json);
  };
  showModal = () => {
    this.setState({
      showModalCatalogAddForm: false,
    });
  };
  render() {
    const { catalogs } = this.props;
    const { showModalCatalogAddForm } = this.state;

    const catalogAddFormContent = showModalCatalogAddForm ? (
      <ModalDialog showModal={this.showModal}>
        <CatalogShortListContainer />
      </ModalDialog>
    ) : null;

    let newCatalogs = [];

    if (catalogs.length > 0) {
      newCatalogs = catalogs.map((catalog) => {
        if (catalog.websites !== null) {
          catalog.websites = JSON.parse(catalog.websites);
        }
        return catalog;
      });
    }

    const catalogListContent =
      newCatalogs.length > 0 ? (
        <CatalogListContainer catalogs={newCatalogs} />
      ) : (
        <p>Trwa wczytywanie katalogów...</p>
      );

    return (
      <div>
        {/* <button onClick={() => this.update()}>Update</button> */}
        <Button
          onClick={() =>
            this.setState({
              showModalCatalogAddForm: !showModalCatalogAddForm,
            })
          }
        >
          <FontAwesomeIcon icon={faSyncAlt} />
          Dodaj katalogi
        </Button>
        {catalogAddFormContent}
        {catalogListContent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    catalogs: state.catalogs.catalogs,
  };
};

export default connect(mapStateToProps)(SeoContainer);
