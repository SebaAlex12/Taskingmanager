import styled from "styled-components";

export const StyledTaskListContainer = styled.div`
  .flow-box {
    position: fixed;
    float: left;
    text-align: right;
    top: 0px;
    right: 0px;
    z-index: 1000;
  }
  .flow-box .task-add-form-box {
    background-color: #fff;
    padding: 5px;
  }
  .task-items-box > div > * {
    float: left;
  }
  .task-items-box .title {
    float: left;
    padding-top: 10px;
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
  .task-switcher {
    float: right;
    padding-top: 5px;
  }
  .task-switcher > label:first-child {
    margin-top: 7px;
    margin-right: 4px;
  }
  .switch {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 100px;
    height: 30px;
    padding: 3px;
    margin: 0 10px 10px 0;
    background: linear-gradient(to bottom, #eeeeee, #ffffff 25px);
    background-image: -webkit-linear-gradient(top, #eeeeee, #ffffff 25px);
    border-radius: 18px;
    box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    box-sizing: content-box;
  }
  .switch-input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    box-sizing: content-box;
  }
  .switch-label {
    position: relative;
    display: block;
    height: inherit;
    font-size: 10px;
    text-transform: uppercase;
    background: #eceeef;
    border-radius: inherit;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12),
      inset 0 0 2px rgba(0, 0, 0, 0.15);
    box-sizing: content-box;
  }
  .switch-label:before,
  .switch-label:after {
    position: absolute;
    top: 50%;
    margin-top: -0.5em;
    line-height: 1;
    -webkit-transition: inherit;
    -moz-transition: inherit;
    -o-transition: inherit;
    transition: inherit;
    box-sizing: content-box;
  }
  .switch-label:before {
    content: attr(data-off);
    right: 11px;
    color: #aaaaaa;
    text-shadow: 0 1px rgba(255, 255, 255, 0.5);
  }
  .switch-label:after {
    content: attr(data-on);
    left: 11px;
    color: #ffffff;
    text-shadow: 0 1px rgba(0, 0, 0, 0.2);
    opacity: 0;
  }
  .switch-input:checked ~ .switch-label {
    background: #e1b42b;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15),
      inset 0 0 3px rgba(0, 0, 0, 0.2);
  }
  .switch-input:checked ~ .switch-label:before {
    opacity: 0;
  }
  .switch-input:checked ~ .switch-label:after {
    opacity: 1;
  }
  .switch-handle {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 28px;
    height: 28px;
    background: linear-gradient(to bottom, #ffffff 40%, #f0f0f0);
    background-image: -webkit-linear-gradient(top, #ffffff 40%, #f0f0f0);
    border-radius: 100%;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
  .switch-handle:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -6px 0 0 -6px;
    width: 12px;
    height: 12px;
    background: linear-gradient(to bottom, #eeeeee, #ffffff);
    background-image: -webkit-linear-gradient(top, #eeeeee, #ffffff);
    border-radius: 6px;
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);
  }
  .switch-input:checked ~ .switch-handle {
    left: 74px;
    box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2);
  }

  /* Transition
  ========================== */
  .switch-label,
  .switch-handle {
    transition: All 0.3s ease;
    -webkit-transition: All 0.3s ease;
    -moz-transition: All 0.3s ease;
    -o-transition: All 0.3s ease;
  }
`;
