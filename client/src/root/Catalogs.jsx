import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCatalogs } from "../store/Catalogs/actions";
import CatalogListContainer from "../store/Catalogs/components/CatalogListContainer";

const Catalogs = () => {

    const dispatch = useDispatch();
    const catalogs = useSelector(state => state.catalogs.catalogs);

    if(catalogs.length < 1){
        dispatch(fetchCatalogs());
    }

    const content = catalogs.length > 0 ? <CatalogListContainer /> : "Catalogs are loading please wait...";

    return (
        <React.Fragment>    
        <h1>Katalogi</h1>
        { content }
        </React.Fragment>
    )
}

export default Catalogs;