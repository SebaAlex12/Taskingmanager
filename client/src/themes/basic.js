import styled from "styled-components";
import theme from "styled-theming";
import { PropTypes } from "prop-types";

const backgroundColor = theme.variants("mode", "variant", {
  default: { light: "gray", dark: "darkgray" },
  primary: { light: "#007bff", dark: "#004da0" },
  success: { light: "green", dark: "darkgreen" },
  warning: { light: "red", dark: "darkred" }
});

const backgroundColorHover = theme.variants("mode", "variant", {
  default: { light: "green", dark: "darkgreen" },
  primary: { light: "#0069d9", dark: "#004da0" },
  success: { light: "#28a745", dark: "#186a2b" },
  warning: { light: "#dc3545", dark: "#9b2631" }
});

const fontColor = theme.variants("mode", "variant", {
  default: { light: "#fff", dark: "#fff" },
  primary: { light: "#fff", dark: "#fff" },
  success: { light: "#fff", dark: "#fff" },
  warning: { light: "#fff", dark: "#fff" }
});

const fontColorHover = theme.variants("mode", "variant", {
  default: { light: "#fff", dark: "#fff" },
  primary: { light: "#fff", dark: "#fff" },
  success: { light: "#fff", dark: "#fff" },
  warning: { light: "#fff", dark: "#fff" }
});

const borderColor = theme.variants("mode", "variant", {
  default: { light: "gray", dark: "darkgray" },
  primary: { light: "#0069d9", dark: "#004da0" },
  success: { light: "#28a745", dark: "#186a2b" },
  warning: { light: "#dc3545", dark: "#9b2631" }
});

export const ListBox = styled.div`
  position: fixed;
  top: 50px;
  left: 0px;
  padding:5px;
  background-color:#fff;
  z-index: 100;
  overflow-y: auto;
  width: 300px;
  display: flex;
  flex-direction:column;
  .filter-box .form-group{
    
  }
  .item-box {
    padding-left: 0px;
    padding-right: 0px;
    margin-bottom: 0px;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .remove-filter {
    position: fixed;
    left: 240px;
    top: 60px;
    color: grey;
    opacity: 0.5;
    cursor: default;
    z-index: 1000;
  }
  .remove-filter.active {
    opacity: 1;
    color: red;
    cursor: pointer;
  }
  .title {
    display: flex;
    flex-direction: row;
  }
`;

export const Button = styled.button`
  background-color: ${props =>
    props.active ? backgroundColorHover : backgroundColor};
  color: ${fontColor};
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${backgroundColorHover};
    color: ${fontColorHover};
  }
  span {
    display: inline-block;
    padding: 0px 5px;
  }
  border-width: 1px;
  border-style: solid;
  border-color: ${borderColor};
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
`;

export const DisabledButton = styled(Button)`
  background-color: ${props => (props.active ? "red" : "orange")};
  color: ${fontColor};
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
