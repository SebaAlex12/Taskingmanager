import styled from "styled-components";

export const StyledProjectList = styled.div`
  .projects-box > .flow-box {
    position: fixed;
    float: left;
    text-align: right;
    top: 0px;
    right: 126px;
    z-index: 11;
  }
  .flow-box.active > button {
    background-color: green;
  }
  .projects-box > .flow-box > button:last-child {
    left: 0px;
    right: auto;
    top: 0px;
  }
  
  .projects-list form > .form-group:first-child {
    display: none;
  }
  .projects-list form > .form-group{
    position:relative;
  }
  .projects-list .project-update-form-box form textarea {
    min-height: 420px;
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
    z-index: 101;
  }
  .project-list-flow-box.active > button {
    background-color: green;
  }
  .project-list-flow-box .glyphicon-filter {
    margin-left: 4px;
    cursor: pointer;
    position: absolute;
    z-index: 1000;
    right: 5px;
    top: 12px;
  }
  .project-list-flow-box .glyphicon-filter:before {
    color: grey;
    opacity: 0.5;
    cursor: default;
    font-size: 16px;
  }
  .project-list-flow-box .glyphicon-filter.active:before {
    color: #ff4e4e;
    opacity: 1;
    cursor: pointer;
  }
`;
