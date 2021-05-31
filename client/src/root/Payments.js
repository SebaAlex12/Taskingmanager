import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import PaymentsContainer from "../store/Payments/components/PaymentsContainer";

import {
  fetchPayments,
  fetchLastInsertInvoice,
  fetchLastInsertPattern
} from "../store/Payments/actions";
import { fetchCompanies } from "../store/Companies/actions";
import { fetchContractors } from "../store/Contractors/actions";
import CompaniesList from "../store/Companies/components/CompaniesList";
// import ContractorsList from "../store/Contractors/components/ContractorsList";

class Payments extends Component {
  componentDidMount() {
    const {
      fetchPayments,
      fetchLastInsertInvoice,
      fetchLastInsertPattern
    } = this.props;
    fetchPayments({ paymentType: "Faktura" });
    fetchLastInsertInvoice();
    fetchLastInsertPattern();
  }
  render() {
    return (
      <PaymentStyled>
        <CompaniesList />
        {/* <ContractorsList /> */}
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
  fetchPayments,
  fetchLastInsertInvoice,
  fetchLastInsertPattern
})(Payments);
