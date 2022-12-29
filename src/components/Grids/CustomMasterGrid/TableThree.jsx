import React, { useState } from "react";
import "./CustomMasterGrid.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import getDynamicData from "./api";
import AccordianThree from "./AccordianThree";

const TableThree = (props) => {
    const { category, ad_asin } = props;
    const [dataArray, setDataArray] = useState([]);
    const { campaign_type_array } = props;
    const appParams = useSelector(state => state.appParams);
    const { current_brand } = appParams;
    useEffect(() => {
        (async () => {
            const res = await getDynamicData({
                filter: { category, ad_asin },
                group_by: "campaign_type",
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
                    <div className="table-header-el" >AdType</div>
                    <div className="table-header-el" >Cost</div>
                    <div className="table-header-el" >sales</div>
                    <div className="table-header-el" >ACOS</div>
                </div> */}
            {
                dataArray.length > 0 ? (dataArray.map(el => {
                    return <AccordianThree
                        category={category}
                        ad_asin={ad_asin}
                        campaign_type={el}
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

export default TableThree;


