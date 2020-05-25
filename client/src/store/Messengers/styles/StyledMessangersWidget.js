import styled from "styled-components";

export const StyledMessangersWidget = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 138px;
  .messages {
    overflow-y: auto;
  }
  .messages .item {
    display: flex;
    flex-direction: row;
  }
  .messages .item .from {
    font-weight: bold;
    padding-right: 4px;
  }
`;
