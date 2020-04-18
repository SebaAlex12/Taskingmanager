import styled from "styled-components";

export const StyledUserHistoryQuickView = styled.div`
  position: absolute;
  right: 10px;
  top: 50px;
  pading: 15px;
  background-color: #fff;
  overflow: hidden;
  width: 300px;
  z-index: 1;
  .info svg {
    cursor: pointer;
    font-size: 16px;
    color: grey;
    margin-right: 5px;
  }
  .btn-show-more {
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .btn-refresh {
    position: absolute;
    right: 0px;
    top: 25px;
  }
  .users-history-list-box {
    list-style-type: none;
    margin: 0px;
    padding: 0px 10px 10px 10px;
    text-align: left;
    overflow-y: auto;
  }
  .users-history-list-box li {
    font-size: 12px;
    border-bottom: 1px solid grey;
  }
`;
