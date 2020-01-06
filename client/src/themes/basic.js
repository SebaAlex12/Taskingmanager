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
  default: { light: "gray", dark: "darkgray" },
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

export const Button = styled.button`
  background-color: ${backgroundColor};
  color: ${fontColor};
  &:hover {
    background-color: ${backgroundColorHover};
    color: ${fontColorHover};
  }
  &:focus {
    outline: none;
  }
  border: 1px solid buttonface;
  padding: 10px 18px;
  border-radius: 5px;
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
