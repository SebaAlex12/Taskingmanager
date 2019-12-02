import styled from "styled-components";

export const StyledProjectList = styled.div`
  .projects-box > .flow-box {
    position: fixed;
    float: left;
    text-align: right;
    top: 0px;
    right: 115px;
    background-color: #fff;
    z-index: 1000;
  }
  .flow-box .project-add-form-box {
    background-color: #fff;
    padding: 5px;
  }
  .projects-box > .flow-box > button:last-child {
    left: 0px;
    right: auto;
    top: 0px;
  }
  .projects-list {
    position: fixed;
    top: 32px;
    left: 0px;
    z-index: 100;
    overflow-y: auto;
    width: 260px;
  }
  .projects-list > div {
    display: block;
    padding-left: 0px;
    padding-right: 0px;
    margin-bottom: 0px;
  }
  .projects-list .remove-filter {
    position: absolute;
    right: 10px;
    top: 10px;
    color: grey;
    opacity: 0.5;
    cursor: default;
  }
  .projects-list .remove-filter.active {
    opacity: 1;
    color: red;
    cursor: pointer;
  }
  .projects-list > div.selected {
    background-color: #e2e2e2;
  }
  .projects-list .title {
    float: left;
    padding-left: 5px;
    padding-bottom: 5px;
    width: 85%;
    text-align: left;
  }
  .projects-list form > .form-group:first-child {
    display: none;
  }
  .projects-list form > .form-group {
    position: relative;
  }
  .projects-list form textarea{
    min-height:420px;
  }
  .projects-list form .show-hide-button {
    position: absolute;
    right: 10px;
    top: 10px;
    color: grey;
    z-index: 100;
  }
  .projects-list form .show-hide-button ~ .glass {
    content: "";
    position: absolute;
    padding-top: 5px;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    border: 1px solid grey;
  }
  .projects-list form .show-hide-button.active {
    color: #000;
  }
  .projects-list form .show-hide-button.active ~ .glass {
    display: none;
  }
  .project-list-flow-box {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
  }
  .project-list-flow-box button {
    padding-right: 22px;
  }
  .project-list-flow-box .glyphicon-filter {
    margin-left: 4px;
    cursor: pointer;
    position: absolute;
    z-index: 1000;
    right: 5px;
    top: 8px;
  }
  .project-list-flow-box .glyphicon-filter:before {
    color: grey;
    opacity: 0.5;
    cursor: default;
  }
  .project-list-flow-box .glyphicon-filter.active:before {
    color: red;
    opacity: 1;
    cursor: pointer;
  }
`;
