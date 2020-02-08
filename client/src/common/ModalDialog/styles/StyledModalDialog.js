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
    width: 780px;
    margin-left: auto;
    margin-right: auto;
    color: #000;
    font-size: 16px;
    margin-top: 10px;
    background-color: #fff;
    padding: 30px;
  }
  .modal-dialog-box .content .title {
    font-size: 18px;
    font-weight: bold;
    float: left;
  }
  .modal-dialog-box .content .close-button {
    float: right;
    cursor: pointer;
    font-weight: bold;
  }
  .modal-dialog-box > .content > .description {
    clear: both;
    margin-top: 30px;
  }
  .mail-add-form-box > form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .mail-add-form-box > form > .form-group {
    width: 50%;
    box-sizing: border-box;
    padding: 0px 10px;
  }
  .mail-add-form-box > form > .form-group:nth-child(7),
  .mail-add-form-box > form > .form-group:nth-child(8) {
    width: 100%;
  }
  .mail-add-form-box > form > .form-group:nth-child(7) textarea {
    height: 150px;
  }
`;
