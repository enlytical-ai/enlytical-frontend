import React, { useState } from "react";
import "./CustomMasterGrid.css";
import { BASE_URL } from "../../../appConstants";
import { useSelector } from "react-redux";
import TableOne from "./TableOne";
const CustomMasterGrid = (props) => {
    const [dropDown, setDropDown] = useState({
        categoryArray: [],
        asinArray: [],
        adTypeArray: []
    });
    console.log("dropDown", dropDown);
    const { campaign_type_array } = props;

    return (
        <div style={{ height: 460, overflow: "scroll", border: "1px solid gray" }}>
            <TableOne
                setDropDown={setDropDown}
                campaign_type_array={campaign_type_array}
                dropDown={dropDown}
            />
        </div>
    )
}

export default CustomMasterGrid;