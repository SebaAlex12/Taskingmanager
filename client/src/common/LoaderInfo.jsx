import React from "react";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Styled from "styled-components";

const LoaderInfo = (props) => {
    return (
        <LoaderInfoStyles>
            <div className="loader-info-box">
                <div className="content">{ props.children }</div>
                <FontAwesomeIcon className="icon swing" icon={faHourglassHalf} />
            </div>
        </LoaderInfoStyles>
    )
}

export default LoaderInfo;

const LoaderInfoStyles = Styled.div`
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: rgba(1,1,1,0.5);
    .loader-info-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 72vh;
        color: #fff;
        font-size: 20px;
    }
    .icon{
        display:flex;
        font-size:25px;
        margin:5px;
    }
    .swing { 
        animation: swing 5s ease-in infinite;
     }
    @keyframes swing { 
        0% { transfrom: rotate(0deg); }
        20% { transform: rotate(15deg); } 
        40% { transform: rotate(-15deg); } 
        60% { transform: rotate(15deg); } 
        80% { transform: rotate(-15deg); } 
        100% { transform: rotate(0deg); } 
     } 
`;