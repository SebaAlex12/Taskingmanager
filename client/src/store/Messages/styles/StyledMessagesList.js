import styled from "styled-components";

export const StyledMessagesList = styled.div`
  .messages-box {
    position: fixed;
    bottom: 0px;
    right: -150px;
    z-index: 1000;
    fonsize: 20px;
    font-weight: bold;
    background-color: #379037;
    color: #fff;
    padding: 5px 9px;
    border-radius: 4px;
    opacity: 0;
    transition: all 0.1s ease-in-out;
  }
  .messages-box.active {
    right: 0px;
    opacity: 1;
  }
  .messages-box .error {
    color: #bd0101;
  }
`;
