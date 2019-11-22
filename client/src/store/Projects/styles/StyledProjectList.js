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
  }
  .projects-list .title {
    float: left;
    padding-left: 5px;
    padding-bottom: 5px;
  }
  .projects-list form > .form-group:first-child {
    display: none;
  }
  .project-list-flow-box {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
  }
`;
