import styled from "styled-components";

export const StyledUserList = styled.div`
  .users-box > .flow-box {
    position: fixed;
    float: left;
    text-align: right;
    top: 0px;
    right: 225px;
    background-color: #fff;
    z-index: 1000;
  }
  .users-box > .flow-box > button:last-child {
    left: 50px;
    right: auto;
    top: 0px;
  }
  .users-list {
    position: fixed;
    top: 35px;
    left: 0px;
    z-index: 100;
    overflow-y: auto;
    width: 260px;
  }
  .users-list > div {
    display: block;
    padding-left: 0px;
    padding-right: 0px;
  }
  .users-list .title {
    float: left;
    padding-left: 5px;
    padding-bottom: 5px;
  }
  .users-list .status {
    background-color: grey;
    color: #fff;
    padding: 2px;
    border-radius: 10px;
    width: 18px;
    display: inline-block;
    font-size: 10px;
    margin-right: 5px;
  }
  .users-list .status.admin {
    background-color: #c30101;
  }
  .users-list .status.employee {
    background-color: #007bff;
  }
  .users-list .status.client {
    background-color: #179417;
  }
  .users-list form > .form-group:first-child {
    display: none;
  }
  .user-list-flow-box {
    position: fixed;
    top: 0px;
    left: 120px;
    z-index: 100;
  }
  .users-list .user-update-form-box select[name="projects"],
  .users-list .user-update-form-box select[name="users"] {
    height: 150px;
  }
`;
