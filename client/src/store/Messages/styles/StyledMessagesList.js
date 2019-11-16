import styled from "styled-components";

export const StyledMessagesList = styled.div`
  .messages-box {
    position: fixed;
    width: 120px;
    bottom: 0px;
    right: -150px;
    z-index: 1000;
    fonsize: 20px;
    background-color: #379037;
    color: #fff;
    padding: 5px 9px;
    border-radius: 4px;
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }
  .messages-box.active {
    right: 0px;
    opacity: 1;
  }
`;
