import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";

import CatalogShortListContainer from "../../Catalogs/components/CatalogShortListContainer";
import CatalogShortList from "../../Catalogs/components/CatalogShortList";

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
    const { showModalCatalogAddForm } = this.state;
    const { catalogs } = this.props;

    console.log("cat", catalogs);

    const catalogAddFormContent = showModalCatalogAddForm ? (
      <ModalDialog showModal={this.showModal}>
        <CatalogShortListContainer />
      </ModalDialog>
    ) : null;

    const catalogShortListContent =
      catalogs.length > 0 ? <CatalogShortList catalogs={catalogs} /> : null;

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
        {catalogShortListContent}
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
