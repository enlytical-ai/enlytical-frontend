import React, { useState } from 'react'
import Main from "../../NestedDnd/Main"
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../appConstants";
import { useSelector } from "react-redux";
import Title from '../Title';
import { HEADER } from "../../../appUiConatsnts";
const PCvariation = () => {

    //To get the height for grid
    const [containerHeight, setContainerHeight] = useState();
    useEffect(() => {
        const height = window.innerHeight
        const netHeight = height - (HEADER.height + 20 + 32);
        setContainerHeight(netHeight)
    }, [])
    window.addEventListener('resize', () => {
        const height = window.innerHeight
        const netHeight = height - (HEADER.height + 20 + 32);
        setContainerHeight(netHeight)
    });
    //

    return (
        <>
            <div className='PCvariationContainer'>
                <Title> Please Confirm system recognized Parent-Child Variation for various Categories</Title>
                <div style={{ height: containerHeight }} >
                    <Main />
                </div>
            </div>
        </>
    )
}

export default PCvariation;