import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import { StyledMessageInfo } from "../styles/StyledMessageInfo";

const MessageInfo = () => {

  const [ message, setMessage ] = useState("");
  const [ isAlert, setIsAlert ] = useState(false);
  const messages = useSelector(state => state.messages);

  useEffect(() => {

    setIsAlert(false);
    let delay = 5000;
    
    if(messages.message.length > 0){
        setMessage(messages.message);
    }

    if(messages.alert_message.length > 0){
      setMessage(messages.alert_message);
      setIsAlert(true);
      delay = 15000;
    }

    setTimeout(() => {
        setMessage("");
    },delay);

  },[messages])

  const messageContent = ( message.length > 0 &&
            <div className="msg msg">
              <div className="description">{message}</div>
            </div>);

  return(
      <StyledMessageInfo isAlert={isAlert}>
        <div className="messages-box">
          { messageContent }
        </div>
      </StyledMessageInfo>
  )
}

export default MessageInfo;