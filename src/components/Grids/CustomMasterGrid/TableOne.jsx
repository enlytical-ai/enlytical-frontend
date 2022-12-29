import React, { useState } from "react";
import "./CustomMasterGrid.css";
import { BASE_URL } from "../../../appConstants";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import AccordianOne from "./AccordianOne";
const TableOne = (props) => {
    const [dataArray, setDataArray] = useState([]);
    const { campaign_type_array, dropDown } = props;
    const appParams = useSelector(state => state.appParams);
    const { current_brand } = appParams;
    useEffect(() => {
        const token = localStorage.getItem("token");
        //  loadData({ setDataArray, group_by: "category" })
        axios.post(`${BASE_URL}dashboard/advertisingReport/getDynamicTableData?brandId=${current_brand._id}`, {
            time_range_one: {
                "start_time": "2022-11-10T00:00:00.000+00:00",
                "end_time": "2022-11-11T00:00:00.000+00:00"
            },
            time_range_two: {
                "start_time": "2022-11-11T00:00:00.000+00:00",
                "end_time": "2022-11-12T00:00:00.000+00:00"
            },
            group_by: "category",
            filter: {},
            campaign_type_array,
            category_array: [

            ]
        }, {
            headers: {
                token
            }
        }).then(function (response) {
            const { dynamic_table_data } = response.data.data;
            setDataArray(dynamic_table_data);
            console.log("dynamic_table_data", dynamic_table_data)
        }).catch(function (error) {
            console.log(error)
        });
    }, []);




    return (
        <div className="table-body"  >
            <div className="table-header" >
                <div className="table-header-el" >Category</div>
                {
                    dropDown.categoryArray.length > 0 && <div className="table-header-el" >ASIN</div>
                }
                {
                    dropDown.asinArray.length > 0 && <div className="table-header-el" >Ad Type</div>
                }
                {
                    dropDown.adTypeArray.length > 0 && <div className="table-header-el" >Targetting</div>
                }
                {/* Dynamic Master column */}
                {/* <div className="table-header-el" >Placement</div>Dynamic Master column */}
                <div className="accordian-column-for-data table-header-el" >Cost t1</div>
                <div className="accordian-column-for-data table-header-el" >Cost t2</div>
                <div className="accordian-column-for-data table-header-el" >Cost % Diff.</div>
                <div className="accordian-column-for-data table-header-el" >sales t1</div>
                <div className="accordian-column-for-data table-header-el" >sales t2</div>
                <div className="accordian-column-for-data table-header-el" >sales % Diff.</div>
                <div className="accordian-column-for-data table-header-el" >ACOS % Diff.</div>
            </div>
            {
                dataArray.length > 0 ? (dataArray.map(el => {
                    return <AccordianOne
                        category={el}
                        setDropDown={props.setDropDown}
                        dropDown={props.dropDown}
                        campaign_type_array={props.campaign_type_array}
                    />
                })) : <div className="table-data-loading" > <p>Loadng...</p></div>
            }
        </div>
    )
}

export default React.memo(TableOne);

