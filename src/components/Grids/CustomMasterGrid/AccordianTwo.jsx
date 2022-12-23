import { useState } from "react";
import TableThree from "./TableThree";
const AccordianTwo = (props) => {
    const { category, ad_asin, dropDown } = props;
    const [toggle, setToggle] = useState(false);
    function toggleFunction(e) {
        setToggle(prevState => !prevState);
        const arr = [...dropDown.asinArray];
        const index = arr.indexOf(e);
        if (index < 0) {
            arr.push(e);
            props.setDropDown(preState => ({ ...preState, asinArray: arr }));
        } else {
            arr.splice(index, 1);
            props.setDropDown(preState => ({ ...preState, asinArray: arr }));
        }


    }
    return (
        <div className="accordian-body">
            <div onClick={() => toggleFunction(`${category}-${ad_asin.ad_asin}`)} className={`accordion`}>
                <div className="accordion-el bg-gray accordian-category-color" >{category}</div>
                <div className={`accordion-el accordion-el-as-icon-container ${toggle ? "active" : ""} accordian-two-open-color`} >
                    <span> {ad_asin.ad_asin} </span>
                    <span><i class={`bi bi-chevron-${toggle ? "up" : "right"}`}></i></span>
                </div>
                {dropDown.asinArray.length > 0 && <div className="accordion-el accordian-two-open-color" ></div>}
                {dropDown.adTypeArray.length > 0 && <div className="accordion-el accordian-two-open-color" ></div>}
                {/* 
               
                <div className="accordion-el accordian-two-open-color" ></div> */}
                <div className="accordian-column-for-data accordion-el accordian-two-open-color" >{ad_asin.range_one_cost}</div>
                <div className="accordian-column-for-data accordion-el accordian-two-open-color" >{ad_asin.range_two_cost}</div>
                <div className="accordian-column-for-data accordion-el accordian-two-open-color" >{ad_asin.cost_percentage_change}</div>
                <div className="accordian-column-for-data accordion-el accordian-two-open-color" >{ad_asin.range_one_sales}</div>
                <div className="accordian-column-for-data accordion-el accordian-two-open-color" >{ad_asin.range_two_sales}</div>
                <div className="accordian-column-for-data accordion-el accordian-two-open-color" >{ad_asin.sales_percentage_change}</div>
                <div className="accordian-column-for-data accordion-el accordian-two-open-color" >{ad_asin.acos_percentage_change}</div>


            </div>
            <div style={{ display: toggle ? "block" : "none" }} className="panel">
                {toggle && <TableThree
                    category={category}
                    ad_asin={ad_asin.ad_asin}
                    setDropDown={props.setDropDown}
                    dropDown={props.dropDown}
                    campaign_type_array={props.campaign_type_array}
                />}
            </div>
        </div >
    )
}


export default AccordianTwo;