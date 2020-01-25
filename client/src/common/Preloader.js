import React from "react";
import styled from "styled-components";

const StyledPreloader = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 1001;
  .content {
    margin-top: 40vh;
  }
  .info {
    display: block;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    color: #fff;
    font-size: 16px;
  }
  .lds-hourglass {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
`;

function Preloader() {
  return (
    <StyledPreloader>
      <div className="preloader-box">
        <div className="content">
          <div className="info">
            <span>Trwa ładowanie strony...</span>
          </div>
          <div className="lds-hourglass"></div>
        </div>
      </div>
    </StyledPreloader>
  );
}

export default Preloader;
