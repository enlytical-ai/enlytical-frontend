import React, { useState } from "react";
import "./CustomMasterGrid.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import getDynamicData from "./api";
import AccordianFour from "./AccordianFour";
const TableFour = (props) => {
    const { category, ad_asin, campaign_type } = props;
    const [dataArray, setDataArray] = useState([]);
    const { campaign_type_array } = props;
    const appParams = useSelector(state => state.appParams);
    const { current_brand } = appParams;
    useEffect(() => {
        (async () => {
            const res = await getDynamicData({
                filter: { category, ad_asin, campaign_type }, group_by: "type",
                current_brand_id: current_brand._id,
                campaign_type_array
            })
            console.log("res", res)
            setDataArray(res);
        })()
    }, []);
    return (
        <div className="table-body" >
            {/* <div className="table-header" >
                    <div className="table-header-el" >Targetting Type</div>
                    <div className="table-header-el" >Cost</div>
                    <div className="table-header-el" >sales</div>
                    <div className="table-header-el" >ACOS</div>
                </div> */}
            {
                dataArray.length > 0 ? (dataArray.map(el => {
                    return <AccordianFour
                        category={category}
                        ad_asin={ad_asin}
                        campaign_type={campaign_type}
                        type={el}
                        setDropDown={props.setCategoryDropDown}
                        dropDown={props.dropDown}
                        campaign_type_array={props.campaign_type_array}
                    />
                })) : <div className="table-data-loading" > <p>Loadng...</p></div>
            }


        </div>
    )
}

export default TableFour;
