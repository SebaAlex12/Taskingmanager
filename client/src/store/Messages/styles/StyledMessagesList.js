import styled from "styled-components";

export const StyledMessagesList = styled.div`
  width: 99%;
  .messages-box {
    position: fixed;
    bottom: 0px;
    right: -235px;
    z-index: 1000;
    opacity: 0;
    transition: all 0.1s ease-in-out;
  }
  .messages-box.active {
    right: 0px;
    opacity: 1;
  }
  .messages-box .msg,
  .messages-box .alert{
    font-weight: bold;
    padding: 5px 9px;
    border-radius: 4px;
  }
  .messages-box .msg{
    background-color: #379037;
    color: #fff;
  }
  .messages-box .alert {
    background-color: #ca2b2b;
    color: #fff;
  }
`;
