import React, { useState } from "react";
import "./CustomMasterGrid.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import getDynamicData from "./api";
import AccordianTwo from "./AccordianTwo";
const TableTwo = (props) => {
    const { campaign_type_array } = props;
    const appParams = useSelector(state => state.appParams);
    const { current_brand } = appParams;
    const { category } = props;
    const [dataArray, setDataArray] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await getDynamicData({
                filter: { category },
                group_by: "ad_asin",
                current_brand,
                campaign_type_array
            })
            console.log("res", res)
            setDataArray(res);
        })()
    }, []);
    return (
        <div className="table-body" >
            {/* <div className="table-header" >
                    <div className="table-header-el" >ASIN</div>
                    <div className="table-header-el" >Cost</div>
                    <div className="table-header-el" >sales</div>
                    <div className="table-header-el" >ACOS</div>
                </div> */}
            {
                dataArray.length > 0 ? (dataArray.map(el => {
                    return <AccordianTwo
                        category={category}
                        ad_asin={el}
                        setCategoryDropDown={props.setCategoryDropDown}
                        campaign_type_array={props.campaign_type_array}
                        dropDown={props.dropDown}
                        setDropDown={props.setDropDown}
                    />

                })) : <div className="table-data-loading" > <p>Loadng...</p></div>
            }
        </div>
    )
}

export default TableTwo;