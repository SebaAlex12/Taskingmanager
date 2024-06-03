import styled from "styled-components";

export const StyledMessageInfo = styled.div`
  width: 99%;
  .messages-box {
    position: fixed;
    bottom: 0px;
    right: 0px;
    z-index: 1000;
    transition: all 0.1s ease-in-out;
  }
  .messages-box.active {
    right: 0px;
  }
  .messages-box .msg,
  .messages-box .alert{
    font-weight: bold;
    padding: 5px 9px;
    border-radius: 4px;
  }
  .messages-box .msg{
    background-color: ${props => props.isAlert ? `#ca2b2b` : `#379037`};
    color: #fff;
  }

  .messages-alert-box {
    display: inline-block;
    position: relative;
    margin: 5px;
    width: 100px;
  }
  .messages-alert-box > i {
    width: 100%;
  }
  .messages-alert-box .glyphicon {
    color: green;
  }
  .messages-alert-box > .glyphicon:before {
    font-size: 35px;
  }
  .messages-alert-box.active .glyphicon {
    color: red;
  .messages-box .msg,
  .messages-box .alert{
    font-weight: bold;
    padding: 5px 9px;
    border-radius: 4px;
  }
  .messages-alert-box .content {
    position: absolute;
  .messages-box .msg{
    background-color: #379037;
    color: #fff;
    display: flex;
    left: 50%;
    transform: translate(-50%, -84px);
    opacity: 0;
    transition: all 0.8s ease-in-out 0s;
    max-width: 100%;
    z-index: 1000;
  }
  .messages-alert-box .content .btn {
    cursor: pointer;
  }
  .messages-alert-box .msg.alert {
    display: block;
    padding: 5px 18px;
    margin-bottom: 0px;
    background-color: grey;
  }
  .messages-alert-box .msg.alert .glyphicon:before {
    font-size: 17px;
  }
  .messages-alert-box .msg.alert .priority {
    color: #cc1717 !important;
  }
  .messages-alert-box .msg.alert > div:first-child {
    color: #1c861c;
    font-size: 20px;
  }
  .messages-alert-box:hover .content {
    opacity: 1;
    transform: translate(-50%, 5px);
  }
`;
