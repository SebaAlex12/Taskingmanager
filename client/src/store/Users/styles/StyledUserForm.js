import styled from "styled-components";

export const StyledUserForm = styled.div`
  .registry-form-box {
    padding: 15px;
    background-color: #fff;
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    border-radius: 5px;
    border: 1px solid lightgrey;
  }
  .registry-form-box .multi-checkboxes{
    height:300px;
    overflow-y:auto;
  }
  .registry-form-box .multi-checkboxes .checkbox-item{
    display:flex;
    gap:5px;
  }
`;
