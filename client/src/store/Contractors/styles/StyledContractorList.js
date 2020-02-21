import styled from "styled-components";

export const StyledContractorList = styled.div`
  .contractors-box > .flow-box {
    position: fixed;
    float: left;
    text-align: right;
    top: 0px;
    right: 402px;
    z-index: 11;
  }
  .flow-box.active > button {
    background-color: green;
  }
  .contractors-box > .flow-box > button:last-child {
    left: 0px;
    right: auto;
    top: 0px;
  }
  .contractors-list {
    position: fixed;
    top: 45px;
    left: 0px;
    z-index: 100;
    overflow-y: auto;
    width: 400px;
  }
  .contractors-list > .form-group {
    position: fixed;
    top: 45px;
    left: 0px;
    z-index: 100;
    overflow-y: auto;
    width: 260px;
  }
  .contractors-list > div,
  .contractors-list > .content {
    padding-left: 0px;
    padding-right: 0px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .contractors-list .content > div {
    position: relative;
  }
  .contractors-list .content .edit-form > i {
    position: absolute;
    right: 10px;
    top: 8px;
  }
  .contractors-list .content .edit-form > i.glyphicon-envelope {
    right: 25px;
  }
  .contractors-list .content .edit-form > i.glyphicon-usd {
    right: 42px;
  }
  .contractors-list > .form-group {
    z-index: 100;
  }
  .contractors-list .remove-filter {
    position: fixed;
    left: 236px;
    top: 55px;
    color: grey;
    opacity: 0.5;
    cursor: default;
    z-index: 1000;
  }
  .contractors-list > div:nth-child(3) {
    margin-top: 34px;
  }
  .contractors-list .remove-filter.active {
    opacity: 1;
    color: red;
    cursor: pointer;
  }
  .contractors-list > div.selected {
    background-color: #e2e2e2;
  }
  .contractors-list .title {
    float: left;
    padding-left: 5px;
    padding-bottom: 5px;
    width: 85%;
    text-align: left;
    height: 18px;
  }
  .contractors-list .contractor-update-form-box {
    padding-top: 25px;
  }
  .contractor-update-form-box form {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  contractor-update-form-box form .form-control {
    width: auto;
  }

  .contractors-list form .form-group {
    position: relative;
  }
  .contractors-list form .form-group label {
    text-align: left;
    display: block;
  }
  .contractors-list form .form-group .form-content {
    position: relative;
  }
  .contractor-update-form-box .textarea.form-group {
    width: 100%;
  }
  .contractor-update-form-box .button.form-group {
    flex: 1;
    text-align: right;
  }
  .contractors-list .contractor-update-form-box form textarea {
    min-height: 120px;
  }
  .contractors-list form .show-hide-button {
    position: absolute;
    right: 10px;
    top: 10px;
    color: grey;
    z-index: 100;
  }
  .contractors-list form .show-hide-button ~ .glass {
    content: "";
    position: absolute;
    padding-top: 5px;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    border: 1px solid grey;
  }
  .contractors-list form .show-hide-button.active {
    color: #000;
  }
  .contractors-list form .show-hide-button.active ~ .glass {
    display: none;
  }
  .contractor-list-flow-box {
    position: fixed;
    top: 0px;
    left: 299px;
    z-index: 101;
  }
  .contractor-list-flow-box.active > button {
    background-color: green;
  }
  .contractor-list-flow-box .glyphicon-filter {
    margin-left: 4px;
    cursor: pointer;
    position: absolute;
    z-index: 1000;
    right: 5px;
    top: 12px;
  }
  .contractor-list-flow-box .glyphicon-filter:before {
    color: grey;
    opacity: 0.5;
    cursor: default;
    font-size: 16px;
  }
  .contractor-list-flow-box .glyphicon-filter.active:before {
    color: #ff4e4e;
    opacity: 1;
    cursor: pointer;
  }
`;
