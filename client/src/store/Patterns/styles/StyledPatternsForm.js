import styled from "styled-components";

export const StyledPatternsForm = styled.div`
  .pattern-add-form-box {
    padding: 15px;
    background-color: #fff;
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    border-radius: 5px;
    border: 1px solid lightgrey;
  }
  .pattern-add-form-box form {
    display: flex;
    flex-direction: column;
  }
  .pattern-add-form-box form label {
    display: block;
    padding-left: 10px;
    text-align: left;
  }
  .pattern-add-form-box form .pattern-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .pattern-add-form-box form .form-group {
    width: 25%;
    box-sizing: border-box;
    padding: 0px 10px;
  }
  .pattern-add-form-box form .form-group.description {
    width: 50%;
  }
  .pattern-add-form-box form .form-group.add {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;
