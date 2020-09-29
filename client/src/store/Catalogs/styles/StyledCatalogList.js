import styled from "styled-components";

export const StyledCatalogList = styled.div`
  .catalog-list-box table thead i {
    cursor: pointer;
    margin-left: 2px;
    margin-right: 2px;
    display: block;
    float: left;
  }
  .catalog-list-box table input {
    text-align: center;
  }
  .catalog-list-box table tbody tr:first-child .form-group {
    margin-bottom: 0px;
  }
  .catalog-list-box table .url {
    width: 190px;
  }
  .catalog-list-box table .login {
    width: 130px;
  }
  .catalog-list-box table .password {
    width: 130px;
  }
  .catalog-list-box table .multicode {
    width: 130px;
  }
  .catalog-list-box table .websites {
    width: 98px;
  }
  .catalog-list-box table .price {
    width: 88px;
  }
  .catalog-list-box table .sum {
    width: 90px;
  }
  .catalog-list-box table .rank {
    width: 95px;
  }
  .catalog-list-box table .status {
    width: 94px;
  }
  .catalog-list-box table .actions {
    width: 134px;
  }
  .catalog-list-box table tbody .actions {
    text-align: right;
  }
  .catalog-list-box table tbody .websites {
    position: relative;
  }
  .catalog-list-box table tbody .websites > div {
    position: absolute;
    left: 0px;
    top: 48px;
    background-color: #fff;
    z-index: 10;
    min-width: 400px;
  }
  .catalog-list-box table tbody .websites .catalog-projects-container-box {
    height: 350px;
  }
  .catalog-item-desc-box {
    position: relative;
  }
  .catalog-item-desc-box button {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
`;
