import styled from "styled-components";

export const StyledModalDialog = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 10001;
  .modal-dialog-box .content {
    display: block;
    width: 460px;
    margin-left: auto;
    margin-right: auto;
    color: #000;
    font-size: 16px;
    margin-top: 10vh;
    background-color: #fff;
    padding: 30px;
  }
`;
