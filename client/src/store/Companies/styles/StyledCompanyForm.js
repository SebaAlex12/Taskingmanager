import styled from "styled-components";

export const StyledCompanyForm = styled.div`
  .company-add-form-box {
    padding: 15px;
    background-color: #fff;
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    border-radius: 5px;
    border: 1px solid lightgrey;
  }
  .company-add-form-box form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .company-add-form-box form .form-group {
    width: 33.3%;
    box-sizing: border-box;
    padding: 0px 10px;
  }
  .company-add-form-box form .form-group.description {
    width: 66.6%;
  }
  .company-add-form-box form .form-group.add {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;
