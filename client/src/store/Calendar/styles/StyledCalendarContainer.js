import styled from "styled-components";

export const StyledCalendarContainer = styled.div`
  h2 {
    color: #000;
  }
  table {
    width: 100%;
  }
  table td {
    padding: 10px 5px;
    border: 1px solid #eaeaea;
  }
  table .day {
    cursor: pointer;
  }
  table .current-day {
    background-color: #337ab7;
    color: #fff;
  }
  .month-nav-box {
    position: relative;
  }
  .month-nav-box button {
    float: right;
  }
  .calendar-header > tr > td {
    width: 42%;
  }
  .calendar-header > tr > td:last-child {
    width: 16%;
  }
  .month-nav-box .months-box {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    background-color: #fff;
    position: absolute;
    left: 0px;
    top: 34px;
    z-index: 1000;
    width: 92%;
  }
  .month-nav-box > ul > li {
    padding: 1px 5px;
  }
  .month-nav-box .months-box a {
    font-size: 15px;
  }
  .year-editor,
  .month-editor {
    font-size: 20px;
    color: #000;
  }
`;
