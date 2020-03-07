import styled from "styled-components";

export const StyledPaymentGeneratorSelectForm = styled.div`
  .payment-select-form-box {
    padding: 5px;
    background-color: #fff;
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    border-radius: 5px;
    border: 1px solid lightgrey;
    padding-right: 50px;
  }
  .payment-select-form-box form {
    display: flex;
    flex-direction: row;
  }
  .payment-select-form-box form label {
    display: block;
    padding-left: 10px;
    text-align: left;
  }
  .payment-select-form-box form .form-group {
    width: 50%;
    box-sizing: border-box;
    padding: 0px 10px;
    margin: 0px;
  }
`;
