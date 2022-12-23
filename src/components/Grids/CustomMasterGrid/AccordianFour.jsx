import { useState } from "react";
import TableFive from "./TableFive";
const AccordianFour = (props) => {
    const { category, ad_asin, campaign_type, type } = props;
    const [toggle, setToggle] = useState(false);
    function toggleFunction(e) {
        setToggle(prevState => !prevState);
    }
    return (
        <div className="accordian-body">
            <div onClick={toggleFunction} className={`accordion`}>
                <div className="accordion-el bg-gray accordian-category-color" >{category}</div>
                <div className="accordion-el bg-gray accordian-asin-color" >{ad_asin}</div>
                <div className="accordion-el bg-gray accordian-adtype-color" >{campaign_type}</div>
                <div className={`accordion-el accordion-el-as-icon-container ${toggle ? "active" : ""} accordian-four-open-color accordian-four-open-color`} >
                    <span>  {type.type} </span>
                    <span><i class={`bi bi-chevron-${toggle ? "up" : "right"}`}></i></span>
                </div>

                <div className="accordian-column-for-data accordion-el accordian-four-open-color" >{type.range_one_cost}</div>
                <div className="accordian-column-for-data accordion-el accordian-four-open-color" >{type.range_two_cost}</div>
                <div className="accordian-column-for-data accordion-el accordian-four-open-color" >{type.cost_percentage_change}</div>
                <div className="accordian-column-for-data accordion-el accordian-four-open-color" >{type.range_one_sales}</div>
                <div className="accordian-column-for-data accordion-el accordian-four-open-color" >{type.range_two_sales}</div>
                <div className="accordian-column-for-data accordion-el accordian-four-open-color" >{type.sales_percentage_change}</div>
                <div className="accordian-column-for-data accordion-el accordian-four-open-color" >{type.acos_percentage_change}</div>
            </div>
            <div style={{ display: toggle ? "block" : "none" }} className="panel">
                {toggle && <TableFive />}
            </div>
        </div>
    )
}

export default AccordianFour;