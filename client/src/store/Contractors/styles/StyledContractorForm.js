import styled from "styled-components";

export const StyledContractorForm = styled.div`
  .contractor-add-form-box {
    padding: 15px;
    background-color: #fff;
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    border-radius: 5px;
    border: 1px solid lightgrey;
  }
  .contractor-add-form-box form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .contractor-add-form-box form .form-group {
    width: 33.3%;
    box-sizing: border-box;
    padding: 0px 10px;
  }
  .contractor-add-form-box form .form-group.description {
    width: 66.6%;
  }
  .contractor-add-form-box form .form-group.add {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;
