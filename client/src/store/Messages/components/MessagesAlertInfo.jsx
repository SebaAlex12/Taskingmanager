import React from "react";
import Styled from "styled-components";

const MessagesAlertInfo = ({errors}) => {
    const contentInfo = errors.map((error, index) => (
        <div className="messages-alert-box" key={index}>
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
    .messages-alert-box{
        display: flex;
        flex-direction: column;
        padding: 15px 0px;
        color: #f52222;
    }
    .path{
        font-size:20px;
    }
    .message{
        font-size:16px;
    }
`;