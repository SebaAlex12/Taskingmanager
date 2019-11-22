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
