import React, { useEffect, useState } from "react";
import './zamestnanecDetailStyleSheet.css'
import {useParams} from "react-router-dom";

function ZamestnanecDetailRender() {

    const { id } = useParams();


    return (
        <div>
            <h2>Zamestnanec Detail Page</h2>
            <p>ID: {id}</p>
            {/* Other details go here */}
        </div>
    );
}


export default ZamestnanecDetailRender;