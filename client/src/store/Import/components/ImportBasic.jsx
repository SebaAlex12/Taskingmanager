import React from "react";
import axios from "axios";

import Styled from "styled-components";

const ImportBasic = () => {
    const showProducts = async() => {
        try{
            const response = await axios.get("/imports");
            if(response){
                console.log("response",response);
            }
        }catch(errors){
            console.log("errors", errors);
        }
    }
    
    return(
        <ImportBasicStyles>
            <h1>Import</h1>
            <div className="warnning">Attention - imports works only on localhost !</div>
            <div className="warnning">You have to configure your databases settings first !</div>
            <button onClick={() => showProducts()}>Lunch imports</button>
        </ImportBasicStyles>
    )
}

export default ImportBasic;

export const ImportBasicStyles = Styled.div`
    .warnning{
        color:red;
        font-size:22px;
    }
`;