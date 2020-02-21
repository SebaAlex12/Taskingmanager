import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import PaymentsContainer from "../store/Payments/components/PaymentsContainer";

import { fetchPayments } from "../store/Payments/actions";
import { fetchCompanies } from "../store/Companies/actions";
import { fetchContractors } from "../store/Contractors/actions";
import CompaniesList from "../store/Companies/components/CompaniesList";
import ContractorsList from "../store/Contractors/components/ContractorsList";

class Payments extends Component {
  componentDidMount() {
    const { fetchCompanies, fetchContractors, fetchPayments } = this.props;
    fetchPayments();
    fetchCompanies();
    fetchContractors();
  }
  render() {
    return (
      <PaymentStyled>
        <CompaniesList />
        <ContractorsList />
        <h1>Płatności</h1>
        <PaymentsContainer />
      </PaymentStyled>
    );
  }
}

const PaymentStyled = styled.div`
  .company-list-flow-box {
    left: 0px;
  }
  .companies-box > .flow-box {
    right: 0px;
  }
  .contractor-list-flow-box {
    left: 95px;
  }
  .contractors-box > .flow-box {
    right: 112px;
  }
`;

export default connect(null, {
  fetchCompanies,
  fetchContractors,
  fetchPayments
})(Payments);
