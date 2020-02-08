import styled from "styled-components";

export const StyledMailAddForm = styled.div`
  .mail-add-form-box {
    padding: 15px;
    background-color: #fff;
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    border-radius: 5px;
    border: 1px solid lightgrey;
  }
  .mail-add-form-box .form-group {
    display: flex !important;
    flex-direction: column;
    align-items: self-start;
  }
  .mail-add-form-box .form-group:last-child {
    align-items: flex-end;
  }
`;
