import React, { Component } from "react";
import { connect } from "react-redux";

import { BiggerButton } from "../../../themes/basic";
import { StyledCompanyList } from "../styles/StyledCompanyList";

import { removeCompany, updateCompany } from "../actions";
import CompaniesAddForm from "./CompaniesAddForm";
import CompaniesItem from "./CompaniesItem";

class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyFilterName: "",
      toggleCompaniesAddForm: false,
      toggleCompaniesList: false
    };
  }
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  removeCompanyHandler = id => {
    const { removeCompany } = this.props;
    removeCompany(id);
  };
  updateCompanyHandler = data => {
    const { updateCompany } = this.props;
    updateCompany(data);
  };
  filterItems = items => {
    const { companyFilterName } = this.state;
    const filteredItems = items.filter(item => {
      return item.name.toLowerCase().indexOf(companyFilterName) !== -1;
    });
    if (document.querySelector(".remove-filter")) {
      if (companyFilterName.length > 0) {
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
      companyFilterName: ""
    });
  };
  render() {
    const { loggedUser } = this.props;
    const {
      companyFilterName,
      toggleCompaniesAddForm,
      toggleCompaniesList
    } = this.state;

    let companies =
      this.state.companies > 0 ? this.state.companies : this.props.companies;

    // if (companies && companies.length > 0) {
    //   companies = this.filterItems(companies);
    // }

    const companiesContent = companies.map(company => {
      return <CompaniesItem item={company} key={company._id} />;
    });
    const windowHeight = window.innerHeight - 50;
    const clazz = "glyphicon glyphicon-filter";

    const btn_clazz = toggleCompaniesAddForm ? "flow-box active" : "flow-box";
    const btn_list_clazz = toggleCompaniesList
      ? "company-list-flow-box active"
      : "company-list-flow-box";

    return (
      <StyledCompanyList>
        <div className="companies-box">
          {loggedUser.status === "Administrator" ? (
            <div className={btn_clazz}>
              <BiggerButton
                variant="primary"
                onClick={() =>
                  this.setState({
                    toggleCompaniesAddForm: !toggleCompaniesAddForm
                  })
                }
              >
                Dodaj firmę
              </BiggerButton>
              {toggleCompaniesAddForm ? <CompaniesAddForm /> : null}
            </div>
          ) : null}
          <div className={btn_list_clazz}>
            {loggedUser.status === "SuperAdministrator" ? (
              <BiggerButton
                variant="primary"
                onClick={() =>
                  this.setState({
                    toggleCompaniesList: !toggleCompaniesList
                  })
                }
              >
                Lista firm
              </BiggerButton>
            ) : null}

            {toggleCompaniesList ? (
              <div
                className="companies-list"
                style={{ height: `${windowHeight}px` }}
              >
                <i
                  className="remove-filter glyphicon glyphicon-remove"
                  onClick={this.toggleClassHandler}
                ></i>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={companyFilterName}
                    type="text"
                    name="companyFilterName"
                    className="form-control"
                    placeholder="filtruj po nazwie"
                    title="filtruj po nazwie"
                  />
                </div>
                <div className="content">{companiesContent}</div>
              </div>
            ) : null}
          </div>
        </div>
      </StyledCompanyList>
    );
  }
}

const mapStateToProps = state => {
  return {
    companies: state.companies.companies,
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, {
  removeCompany,
  updateCompany
})(CompaniesList);
