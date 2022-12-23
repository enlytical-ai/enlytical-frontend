import React, { useState } from "react";
import "./CustomMasterGrid.css";
import { BASE_URL } from "../../../appConstants";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import TableTwo from "./TableTwo";
const AccordianOne = (props) => {
    const { category, dropDown } = props;
    const [toggle, setToggle] = useState(false);
    function toggleFunction(e) {
        setToggle(prevState => !prevState);
        const arr = [...dropDown.categoryArray];
        const index = arr.indexOf(e);
        if (index < 0) {
            arr.push(e);
            props.setDropDown(preState => ({ ...preState, categoryArray: arr }));
        } else {
            arr.splice(index, 1);
            props.setDropDown(preState => ({ ...preState, categoryArray: arr }));
        }

    }
    return (
        <div className="accordian-body" >
            <div onClick={() => toggleFunction(category.category)} className={`accordion `}>
                <div className={`accordion-el accordion-el-as-icon-container ${toggle ? "active" : ""}`} >
                    <span>{category.category}</span>
                    <span><i class={`bi bi-chevron-${toggle ? "up" : "right"}`}></i></span>
                </div>
                {dropDown.categoryArray.length > 0 && <div className={`accordion-el ${toggle ? "active" : ""}`} ></div>}
                {dropDown.asinArray.length > 0 && <div className={`accordion-el ${toggle ? "active" : ""}`} ></div>}
                {dropDown.adTypeArray.length > 0 && <div className={`accordion-el ${toggle ? "active" : ""}`} ></div>}
                {/*  
                <div className={`accordion-el ${toggle ? "active" : ""}`} ></div> */}
                <div className={`accordian-column-for-data accordion-el ${toggle ? "active" : ""}`} >{category.range_one_cost}</div>
                <div className={`accordian-column-for-data accordion-el ${toggle ? "active" : ""}`} >{category.range_two_cost}</div>
                <div className={`accordian-column-for-data accordion-el ${toggle ? "active" : ""}`} >{category.cost_percentage_change}</div>
                <div className={`accordian-column-for-data accordion-el ${toggle ? "active" : ""}`} >{category.range_one_sales}</div>
                <div className={`accordian-column-for-data accordion-el ${toggle ? "active" : ""}`} >{category.range_two_sales}</div>
                <div className={`accordian-column-for-data accordion-el ${toggle ? "active" : ""}`} >{category.sales_percentage_change}</div>
                <div className={`accordian-column-for-data accordion-el ${toggle ? "active" : ""}`} >{category.acos_percentage_change}</div>
            </div>
            <div style={{ display: toggle ? "block" : "none" }} className="panel">
                {toggle && <TableTwo
                    category={category.category}
                    setDropDown={props.setDropDown}
                    campaign_type_array={props.campaign_type_array}
                    dropDown={props.dropDown}
                />}
            </div>
        </div>
    )
}

export default React.memo(AccordianOne);
