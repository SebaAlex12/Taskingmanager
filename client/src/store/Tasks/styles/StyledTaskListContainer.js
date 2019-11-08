import styled from "styled-components";

export const StyledTaskListContainer = styled.div`
  .flow-box {
    position: fixed;
    float: left;
    text-align: right;
    top: 0px;
    right: 0px;
    background-color: #fff;
    z-index: 1000;
  }
  .task-items-box > div > * {
    float: left;
  }
  .task-items-box > div {
    clear: both;
  }
  .task-items-box table .description {
    text-align: left;
  }
  .task-items-box .description i {
    cursor: pointer;
  }
  .task-items-box>table>thead>tr>th: first-child {
    width: 180px;
  }
  .task-items-box > table > thead > tr > th i {
    cursor: pointer;
    margin-left: 2px;
    margin-right: 2px;
    display: block;
    float: left;
  }
  .task-items-box > table > tbody .name i {
    width: 10px;
    height: 10px;
    left: -7px;
    cursor: pointer;
  }
  .task-items-box > table > tbody > tr > td {
    position: relative;
  }
  .task-items-box > table > tbody .desc-box {
    position: absolute;
    right: 0px;
    top: 30px;
    z-index: 100;
  }
`;
