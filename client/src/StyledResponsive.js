import styled from "styled-components";

export const StyledResponsive = styled.div`
  .App .container {
    width: 1270px;
  }
  .overflow-div {
    overflow: auto;
    clear: both;
  }
  .task-items-box > .overflow-div > table {
    width: 1240px;
  }
  .tasks-box .col-lg-12 {
    margin: 0px;
    padding: 0px;
  }
  @media only screen and (max-width: 960px) {
    .filter-form-box {
      display: none;
    }
    .App .container {
      width: auto;
    }
    .inbox_people {
      display: none;
    }
    .mesgs,
    .received_withd_msg {
      width: 100%;
    }
    .sent_msg {
      width: 92%;
    }
    .messenger-form-box .users-list span {
      float: left;
    }
  }
  @media only screen and (max-width: 860px) {
    .users-box > .flow-box {
      right: 0px;
      top: 42px;
    }
    .projects-box > .flow-box {
      right: 0px;
      top: 84px;
    }
    .tasks-box > .flow-box {
      right: 0px;
      top: 0px;
    }
    .user-list-flow-box {
      left: 0px;
      top: 42px;
    }
    .task-switcher {
      float: left;
    }
    .task-switcher > label:first-child {
      display: none;
    }
    .users-list {
      top: 84px;
    }
  }
  @media only screen and (max-width: 520px) {
    .users-box > .flow-box,
    .user-list-flow-box,
    .projects-box > .flow-box {
      display: none;
    }
    .projects-list,
    .projects-list > .form-group {
      width: 100%;
    }
    .projects-list .remove-filter {
      left: auto;
      right: 34px;
    }
  }
  @media only screen and (max-width: 460px) {
  }
`;
