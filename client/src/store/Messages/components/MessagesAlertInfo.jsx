import React from "react";
import Styled from "styled-components";

const MessagesAlertInfo = ({errors}) => {
    const contentInfo = errors.map((error, index) => (
        <div className="messages-alet-box" key={index}>
                <div className="path">{ error.path }</div>
                <div className="message">{ error.message }</div>
        </div>
    ));
    return (
           <MessagesAlertInfoStyled>
               { contentInfo }
           </MessagesAlertInfoStyled> 
        )
}

export default MessagesAlertInfo;

const MessagesAlertInfoStyled = Styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .path{
        font-size:20px;
    }
    .message{
        font-size:16px;
    }
`;