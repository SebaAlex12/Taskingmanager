import styled from "styled-components";

export const StyledCompanyList = styled.div`
  .companies-box > .flow-box {
    position: fixed;
    float: left;
    text-align: right;
    top: 0px;
    right: 554px;
    z-index: 11;
  }
  .flow-box.active > button {
    background-color: green;
  }
  .companies-box > .flow-box > button:last-child {
    left: 0px;
    right: auto;
    top: 0px;
  }
  .companies-list {
    position: fixed;
    top: 45px;
    left: 0px;
    z-index: 100;
    overflow-y: auto;
    width: 400px;
  }
  .companies-list > .form-group {
    position: fixed;
    top: 45px;
    left: 0px;
    z-index: 100;
    overflow-y: auto;
    width: 260px;
  }
  .companies-list > div,
  .companies-list > .content {
    padding-left: 0px;
    padding-right: 0px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .companies-list .content > div {
    position: relative;
  }
  .companies-list .content .edit-form > i {
    position: absolute;
    right: 10px;
    top: 8px;
  }
  .companies-list .content .edit-form > i.glyphicon-envelope {
    right: 25px;
  }
  .companies-list > .form-group {
    z-index: 100;
  }
  .companies-list .remove-filter {
    position: fixed;
    left: 236px;
    top: 55px;
    color: grey;
    opacity: 0.5;
    cursor: default;
    z-index: 1000;
  }
  .companies-list > div:nth-child(3) {
    margin-top: 34px;
  }
  .companies-list .remove-filter.active {
    opacity: 1;
    color: red;
    cursor: pointer;
  }
  .companies-list > div.selected {
    background-color: #e2e2e2;
  }
  .companies-list .title {
    float: left;
    padding-left: 5px;
    padding-bottom: 5px;
    width: 85%;
    text-align: left;
    height: 18px;
  }
  .companies-list .company-update-form-box {
    padding-top: 25px;
  }
  .company-update-form-box form {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  company-update-form-box form .form-control {
    width: auto;
  }
  .companies-list form .form-group:first-child {
    display: none;
  }
  .companies-list form .form-group {
    position: relative;
  }
  .companies-list form .form-group label {
    text-align: left;
    display: block;
  }
  .companies-list form .form-group .form-content {
    position: relative;
  }
  .company-update-form-box .textarea.form-group {
    width: 100%;
  }
  .company-update-form-box .button.form-group {
    flex: 1;
    text-align: right;
  }
  .companies-list .company-update-form-box form textarea {
    min-height: 120px;
  }
  .companies-list form .show-hide-button {
    position: absolute;
    right: 10px;
    top: 10px;
    color: grey;
    z-index: 100;
  }
  .companies-list form .show-hide-button ~ .glass {
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
  .companies-list form .show-hide-button.active {
    color: #000;
  }
  .companies-list form .show-hide-button.active ~ .glass {
    display: none;
  }
  .company-list-flow-box {
    position: fixed;
    top: 0px;
    left: 456px;
    z-index: 101;
  }
  .company-list-flow-box.active > button {
    background-color: green;
  }
  .company-list-flow-box .glyphicon-filter {
    margin-left: 4px;
    cursor: pointer;
    position: absolute;
    z-index: 1000;
    right: 5px;
    top: 12px;
  }
  .company-list-flow-box .glyphicon-filter:before {
    color: grey;
    opacity: 0.5;
    cursor: default;
    font-size: 16px;
  }
  .company-list-flow-box .glyphicon-filter.active:before {
    color: #ff4e4e;
    opacity: 1;
    cursor: pointer;
  }
`;
