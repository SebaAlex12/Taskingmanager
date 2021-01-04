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
      sites: [],
    };
  }
  update = async () => {
    // const url = "https://blumoseo.pl/pomiary/wyniki.json";
    // const $json = await axios.get(url, {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //   },
    // });
    // console.log("json", $json);
  };
  showSites = async () => {
    const url = "https://blumoseo.pl/pomiary/wyniki.json";
    const $json = await axios.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    // console.log("json", $json);
    //  console.log("stringify", JSON.stringify($json.data));
    this.setState({
      sites: $json.data,
    });
  };
  showModal = () => {
    this.setState({
      showModalCatalogAddForm: false,
    });
  };
  render() {
    const { catalogs } = this.props;
    const { showModalCatalogAddForm, sites } = this.state;

    const sitesContent =
      sites.length > 0 ? (
        <table className="table table-striped">
          <thead></thead>
          <tbody>
            {sites.map((site) => {
              return (
                <tr>
                  {Object.keys(site).map((key) => {
                    console.log("site[key]", site[key]);
                    console.log("key", key);
                    return (
                      <React.Fragment>
                        <td className={site[key].url}>{site[key].url}</td>
                        <td className={site[key].ile}>{site[key].ile}</td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "dane nie zaczytane"
      );

    const catalogAddFormContent = showModalCatalogAddForm ? (
      <ModalDialog showModal={this.showModal}>
        <CatalogShortListContainer />
      </ModalDialog>
    ) : null;

    let newCatalogs = [];

    if (catalogs.length > 0) {
      newCatalogs = catalogs.map((catalog) => {
        // console.log("catalog.websites", catalog.websites.length);
        // if (catalog.websites !== null && !Array.isArray(catalog.websites)) {
        //   catalog.websites = JSON.parse(catalog.websites);
        // }
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
        <div>{sitesContent}</div>
        {/* <button onClick={() => this.update()}>Update</button> */}
        <Button onClick={this.showSites}>Pokaż wyniki</Button>

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
