import styled from "styled-components";

export const StyledLastActiveList = styled.div`
  position: absolute;
  left: 10px;
  top: 50px;
  pading: 15px;
  background-color: #fff;
  overflow: hidden;
  z-index: 1;
  min-width: 300px;
  .btn-show-more {
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .last-active-list-box {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    text-align: left;
  }
  .last-active-list-box li {
    font-size: 12px;
  }
`;
