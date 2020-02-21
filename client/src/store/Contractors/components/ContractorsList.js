import React, { Component } from "react";
import { connect } from "react-redux";

import { BiggerButton } from "../../../themes/basic";
import { StyledContractorList } from "../styles/StyledContractorList";

import { removeContractor, updateContractor } from "../actions";
import ContractorsAddForm from "./ContractorsAddForm";
import ContractorsItem from "./ContractorsItem";

class ContractorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractorFilterName: "",
      toggleContractorsAddForm: false,
      toggleContractorsList: false
    };
  }
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  removeContractorHandler = id => {
    const { removeContractor } = this.props;
    removeContractor(id);
  };
  updateContractorHandler = data => {
    const { updateContractor } = this.props;
    updateContractor(data);
  };
  filterItems = items => {
    const { contractorFilterName } = this.state;
    const filteredItems = items.filter(item => {
      return item.name.toLowerCase().indexOf(contractorFilterName) !== -1;
    });
    if (document.querySelector(".remove-filter")) {
      if (contractorFilterName.length > 0) {
        document.querySelector(".remove-filter").classList.add("active");
      } else {
        document.querySelector(".remove-filter").classList.remove("active");
      }
    }
    return filteredItems;
  };
  toggleClassHandler = event => {
    event.preventDefault();
    event.target.classList.toggle("active");
    this.setState({
      contractorFilterName: ""
    });
  };
  render() {
    const { loggedUser } = this.props;
    const {
      contractorFilterName,
      toggleContractorsAddForm,
      toggleContractorsList
    } = this.state;

    let contractors =
      this.state.contractors > 0
        ? this.state.contractors
        : this.props.contractors;

    if (contractors && contractors.length > 0) {
      contractors = this.filterItems(contractors);
    }

    const contractorsContent = contractors.map(contractor => {
      return <ContractorsItem item={contractor} key={contractor._id} />;
    });
    const windowHeight = window.innerHeight - 50;
    const clazz = "glyphicon glyphicon-filter";

    const btn_clazz = toggleContractorsAddForm ? "flow-box active" : "flow-box";
    const btn_list_clazz = toggleContractorsList
      ? "contractor-list-flow-box active"
      : "contractor-list-flow-box";

    return (
      <StyledContractorList>
        <div className="contractors-box">
          {loggedUser.status === "Administrator" ? (
            <div className={btn_clazz}>
              <BiggerButton
                variant="primary"
                onClick={() =>
                  this.setState({
                    toggleContractorsAddForm: !toggleContractorsAddForm
                  })
                }
              >
                Dodaj kontrahenta
              </BiggerButton>
              {toggleContractorsAddForm ? <ContractorsAddForm /> : null}
            </div>
          ) : null}
          <div className={btn_list_clazz}>
            <BiggerButton
              variant="primary"
              onClick={() =>
                this.setState({
                  toggleContractorsList: !toggleContractorsList
                })
              }
            >
              Lista kontrahentów
            </BiggerButton>
            {toggleContractorsList ? (
              <div
                className="contractors-list"
                style={{ height: `${windowHeight}px` }}
              >
                <i
                  className="remove-filter glyphicon glyphicon-remove"
                  onClick={this.toggleClassHandler}
                ></i>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={contractorFilterName}
                    type="text"
                    name="contractorFilterName"
                    className="form-control"
                    placeholder="filtruj po nazwie"
                    title="filtruj po nazwie"
                  />
                </div>
                <div className="content">{contractorsContent}</div>
              </div>
            ) : null}
          </div>
        </div>
      </StyledContractorList>
    );
  }
}

const mapStateToProps = state => {
  return {
    contractors: state.contractors.contractors,
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, {
  removeContractor,
  updateContractor
})(ContractorsList);
