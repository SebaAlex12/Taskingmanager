import styled from "styled-components";

export const StyledTaskForm = styled.div`
  .task-add-form-box {
    padding: 15px;
    background-color: #fff;
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    border-radius: 5px;
    border: 1px solid lightgrey;
    width: 480px;
  }
  .task-add-form-box input.notValid{
    border:1px solid red;
  }
  .task-add-form-box .notValid{
    color:red;
  }
`;
