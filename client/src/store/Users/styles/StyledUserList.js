import styled from "styled-components";

export const StyledUserList = styled.div`
  .users-box > .flow-box {
    position: fixed;
    float: left;
    text-align: right;
    top: 0px;
    right: 296px;
    z-index: 12;
  }
  .users-box > .flow-box.active > button {
    background-color: green;
  }
  .users-box > .flow-box > button:last-child {
    left: 50px;
    right: auto;
    top: 0px;
  }
  .users-list .status {
    background-color: grey;
    color: #fff;
    padding: 2px;
    border-radius: 10px;
    width: 18px;
    font-size: 10px;
    margin-right: 5px;
    text-align: center;
    display: inline-block;
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
  .users-list .user-update-form-box form > .form-group:first-child {
    display: none;
  }
  .users-box select[name="projects"],
  .users-box select[name="users"] {
    height: 150px;
  }
  .users-box .multi-checkboxes {
    height: 250px;
    overflow-y: scroll;
    text-align: center;
  }
  .users-box .multi-checkboxes .checkbox-item {
    display: flex;
    flex-direction: row;
    padding: 2px;
  }
  .users-box .multi-checkboxes .checkbox-item input {
    cursor: pointer;
    padding: 5px;
  }
  .users-box .multi-checkboxes .checkbox-item div {
    cursor: auto;
  }
  .user-list-flow-box {
    position: fixed;
    top: 0px;
    left: 155px;
    z-index: 10;
  }
  .user-list-flow-box.active > button {
    background-color: green;
  }
  .user-list-flow-box .glyphicon-filter {
    margin-left: 4px;
    cursor: pointer;
    position: absolute;
    z-index: 100;
    right: 10px;
    top: 18px;
  }
  .user-list-flow-box .glyphicon-filter:before {
    color: grey;
    opacity: 0.5;
    cursor: default;
    font-size: 16px;
  }
  .user-list-flow-box .glyphicon-filter.active:before {
    color: #ff4e4e;
    opacity: 1;
    cursor: pointer;
  }
`;
