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
  }
  .projects-list > div {
    display: block;
  }
  .project-list-flow-box {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
  }
`;
