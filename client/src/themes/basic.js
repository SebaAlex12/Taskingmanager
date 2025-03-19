import styled from "styled-components";
import { PropTypes } from "prop-types";

export const DashboardBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  
  input.notValid{
    border:1px solid red;
  }
  .notValid{
    color:red;
  }
  
  .content-box{
    width:100%;
    display:flex;
    flex-direction: column;
  }
  .content-box .user-name{
    display:flex;
    justify-content:center;
    font-weight:bold;
    margin:5px;
  }
  .right-buttons-box{
    position: fixed;
    right: 0px;
    top: 0px;
    display: flex;
  }
  .center-buttons-box{
    display:flex;
    justify-content:center;
  }
  .right-buttons-box > button{
    display:flex;
    justify-content:right;
  }
  .right-buttons-box .item{
    position:relative;
  }
  .right-buttons-box .item > div{
    position:fixed;
    right:0px;
  }
`;

export const ListBox = styled.div`
  position: fixed;
  top: 50px;
  left: 0px;
  padding: 5px;
  background-color: #fff;
  z-index: 100;
  overflow-y: scroll;
  width: 335px;
  display: flex;
  flex-direction: column;
  height:100%;
  .item-box > .title {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
  }
  .item-box > .title > .name{
    text-align:left;
  }
  .items {
    margin-top: 40px;
  }
  .item-box {
    padding-left: 0px;
    padding-right: 0px;
    margin-bottom: 0px;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .filter-box {
    position: fixed;
    width: 272px;
    background-color: #fff;
    z-index: 10;
  }
  .filter-box .form-group {
    margin: 0px;
  }
  .remove-filter {
    position: fixed;
    left: 240px;
    top: 60px;
    opacity: 0.5;
    cursor: default;
    z-index: 1000;
    cursor:pointer;
  }
  .remove-filter.active {
    opacity: 1;
    color: red;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  background-color: ${props =>
    props.active ? 'blue' : 'green'};
  color: #fff;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${'#000'};
    color: #fff;
  }
  span {
    display: inline-block;
    padding: 0px 5px;
  }
  border-width: 1px;
  border-style: solid;
  border-color: grey;
  padding: 4px 8px;
  border-radius: 5px;
  margin: 5px;
  min-width: 30px;
`;

export const BiggerButton = styled(Button)`
  padding: 10px 18px;
`;

export const SmallerButton = styled(Button)`
  padding: 2px 4px;
  font-size: 12px;
  margin: 2px;
  background-color: ${props => props.isActive ? "#008000" : "grey"};
`;

export const DisabledButton = styled(Button)`
  background-color: ${props => (props.active ? "red" : "orange")};
  color: #fff;
`;

export const WarningButton = styled(Button)`
  background-color: red;
  color: #fff;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

export const Title = styled.h1`
  color: grey;
  size: 14px;
`;

export const SubTitle = styled.h2`
  color: #428839;
  font-size: 18px;
  font-weight: bold;
`;

Button.propTypes = {
  variant: PropTypes.oneOf(["default", "primary", "success", "warning"])
};

Button.defaultProps = {
  variant: "default"
};
