import { useState } from "react";
import TableFour from "./TableFour";
const AccordianThree = (props) => {
    const { category, ad_asin, campaign_type, dropDown } = props;
    const [toggle, setToggle] = useState(false);
    function toggleFunction(e) {
        setToggle(prevState => !prevState);
        const arr = [...dropDown.adTypeArray];
        const index = arr.indexOf(e);
        if (index < 0) {
            arr.push(e);
            props.setDropDown(preState => ({ ...preState, adTypeArray: arr }));
        } else {
            arr.splice(index, 1);
            props.setDropDown(preState => ({ ...preState, adTypeArray: arr }));
        }

    }
    return (
        <div className="accordian-body">
            <div onClick={() => toggleFunction(`${category}-${ad_asin}-${campaign_type.campaign_type}`)} className={`accordion`}>
                <div className="accordion-el bg-gray accordian-category-color" >{category}</div>
                <div className="accordion-el bg-gray accordian-asin-color" >{ad_asin}</div>
                <div className={`accordion-el accordion-el-as-icon-container ${toggle ? "active" : ""} accordian-three-open-color`} >
                    <span> {campaign_type.campaign_type} </span>
                    <span><i class={`bi bi-chevron-${toggle ? "up" : "right"}`}></i></span>
                </div>
                {
                    dropDown.adTypeArray.length > 0 && <div className="accordion-el accordian-three-open-color" ></div>
                }
                {/* 
                <div className="accordion-el accordian-three-open-color" ></div> */}
                <div className="accordian-column-for-data accordion-el accordian-three-open-color" >{campaign_type.range_one_cost}</div>
                <div className="accordian-column-for-data accordion-el accordian-three-open-color" >{campaign_type.range_two_cost}</div>
                <div className="accordian-column-for-data accordion-el accordian-three-open-color" >{campaign_type.cost_percentage_change}</div>
                <div className="accordian-column-for-data accordion-el accordian-three-open-color" >{campaign_type.range_one_sales}</div>
                <div className="accordian-column-for-data accordion-el accordian-three-open-color" >{campaign_type.range_two_sales}</div>
                <div className="accordian-column-for-data accordion-el accordian-three-open-color" >{campaign_type.sales_percentage_change}</div>
                <div className="accordian-column-for-data accordion-el accordian-three-open-color" >{campaign_type.acos_percentage_change}</div>
            </div>
            <div style={{ display: toggle ? "block" : "none" }} className="panel">
                {toggle && <TableFour
                    category={category}
                    ad_asin={ad_asin}
                    campaign_type={campaign_type.campaign_type}
                    setDropDown={props.setCategoryDropDown}
                    campaign_type_array={props.campaign_type_array}
                    dropDown={props.dropDown}
                />}
            </div>
        </div>
    )
}

export default AccordianThree;