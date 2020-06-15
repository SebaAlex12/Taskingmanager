import React, { Component } from "react";
import styled from "styled-components";

import { faTimes, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, SmallerButton } from "../themes/basic";

class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetActiveToggle: false,
    };
  }
  render() {
    const {
      name,
      leftPosition,
      topPosition,
      rightPosition,
      bottomPosition,
    } = this.props;
    const { widgetActiveToggle } = this.state;

    const showButton = (
      <Button
        variant="primary"
        onClick={() =>
          this.setState({ widgetActiveToggle: !widgetActiveToggle })
        }
        className="widget-button"
      >
        <FontAwesomeIcon icon={faQuestionCircle} />
      </Button>
    );

    const closeButton = (
      <SmallerButton
        onClick={() =>
          this.setState({ widgetActiveToggle: !widgetActiveToggle })
        }
        className="close-widget-button"
      >
        <FontAwesomeIcon icon={faTimes} />
      </SmallerButton>
    );

    const content = (
      <StyledWidgetContent>
        {closeButton}
        {name ? <h1>{name}</h1> : null}
        {this.props.children}
      </StyledWidgetContent>
    );

    return (
      <StyledWidget
        style={{
          left: leftPosition,
          top: topPosition,
          right: rightPosition,
          bottom: bottomPosition,
        }}
        className="widget-box"
      >
        {widgetActiveToggle ? content : null}
        {showButton}
      </StyledWidget>
    );
  }
}

const StyledWidget = styled.div`
  position: fixed;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #dcdcdc;
  .widget-button {
    font-size: 24px;
    float: right;
  }
  .close-widget-button {
    float: right;
  }
`;

const StyledWidgetContent = styled.div`
  padding: 5px;
`;

export default Widget;
