import React from 'react'
import Main from "../../NestedDnd/Main"
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../appConstants";
import { useSelector } from "react-redux";

const PCvariation = () => {

    return (
        <>
            <div className='PCvariationContainer'>
                <div style={{ marginBottom: "15px" }}>
                    <h3 style={{ fontSize: "20px", color: "#1565C0" }}>
                        Please Confirm system recognized Parent-Child Variation for various Categories
                    </h3>
                </div>
                <div >
                    <Main />
                </div>
            </div>
        </>
    )
}

export default PCvariation;