import React from "react";
import axios from "axios";

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
        <div>
            <h1>Import</h1>
            <button onClick={() => showProducts()}>Lunch imports</button>
        </div>
    )
}

export default ImportBasic;