import { useState } from "react";
import "./CustomMasterGrid.css";
import { BASE_URL } from "../../../appConstants";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
const CustomMasterGrid = (props) => {
    const { campaign_type_array } = props;
    const appParams = useSelector(state => state.appParams);
    const { current_brand } = appParams;
    const loadData = (obj) => {
        axios.post(`${BASE_URL}dashboard/advertisingReport/getDynamicTableData?brandId=${current_brand}`, {
            time_range_one: {
                "start_time": "2022-11-10T00:00:00.000+00:00",
                "end_time": "2022-11-11T00:00:00.000+00:00"
            },
            time_range_two: {
                "start_time": "2022-11-11T00:00:00.000+00:00",
                "end_time": "2022-11-12T00:00:00.000+00:00"
            },
            group_by: obj.group_by,
            filter: obj.filter,
            campaign_type_array,
            category_array: [

            ]
        }).then(function (response) {
            const { dynamic_table_data } = response.data.data;
            obj.setDataArray(dynamic_table_data);
            console.log("dynamic_table_data", dynamic_table_data)
        }).catch(function (error) {
            console.log(error)
        });
    }

    const TableFive = () => {
        return (
            <div className="table-body" >
                {/* <div className="table-header" >
                    <div className="table-header-el" >Placement</div>
                    <div className="table-header-el" >Cost</div>
                    <div className="table-header-el" >sales</div>
                    <div className="table-header-el" >ACOS</div>
                </div> */}
                <div style={{ display: "flex", alignItems: "center" }} >
                    <div className="accordion-el bg-gray" >-</div>
                    <div className="accordion-el bg-gray" >-</div>
                    <div className="accordion-el bg-gray" >-</div>
                    <div className="accordion-el bg-gray" >-</div>
                    <div className="accordion-el" >PDP</div>
                    <div className="accordion-el" >2000</div>
                    <div className="accordion-el" >2000</div>
                    <div className="accordion-el" >1000%</div>
                </div>
            </div>
        )
    }

    const AccordianFour = (props) => {
        const { category, ad_asin, campaign_type, type } = props;
        const [toggle, setToggle] = useState(false);
        function toggleFunction(e) {
            setToggle(prevState => !prevState);
        }
        return (
            <div className="accordian-body">
                <div onClick={toggleFunction} className={`accordion`}>
                    <div className="accordion-el bg-gray" >{category}</div>
                    <div className="accordion-el bg-gray" >{ad_asin}</div>
                    <div className="accordion-el bg-gray" >{campaign_type}</div>
                    <div className={`accordion-el accordion-el-as-icon-container ${toggle ? "active" : ""}`} >
                        <span>  {type.type} </span>
                        <span><i class={`bi bi-chevron-${toggle ? "up" : "right"}`}></i></span>
                    </div>
                    <div className="accordion-el" ></div>
                    <div className="accordion-el" >{type.cost_percentage_change}</div>
                    <div className="accordion-el" >{type.sales_percentage_change}</div>
                    <div className="accordion-el" >{type.acos_percentage_change}</div>
                </div>
                <div style={{ display: toggle ? "block" : "none" }} className="panel">
                    {toggle && <TableFive />}
                </div>
            </div>
        )
    }

    const TableFour = (props) => {
        const { category, ad_asin, campaign_type } = props;
        const [dataArray, setDataArray] = useState([]);
        useEffect(() => {
            loadData({ setDataArray, filter: { category, ad_asin, campaign_type }, group_by: "type" })
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
                        return <AccordianFour category={category} ad_asin={ad_asin} campaign_type={campaign_type} type={el} />
                    })) : <div className="table-data-loading" > <p>Loadng...</p></div>
                }


            </div>
        )
    }

    const AccordianThree = (props) => {
        const { category, ad_asin, campaign_type } = props;
        const [toggle, setToggle] = useState(false);
        function toggleFunction(e) {
            setToggle(prevState => !prevState);
        }
        return (
            <div className="accordian-body">
                <div onClick={toggleFunction} className={`accordion`}>
                    <div className="accordion-el bg-gray" >{category}</div>
                    <div className="accordion-el bg-gray" >{ad_asin}</div>
                    <div className={`accordion-el accordion-el-as-icon-container ${toggle ? "active" : ""}`} >
                        <span> {campaign_type.campaign_type} </span>
                        <span><i class={`bi bi-chevron-${toggle ? "up" : "right"}`}></i></span>
                    </div>
                    <div className="accordion-el" ></div>
                    <div className="accordion-el" ></div>
                    <div className="accordion-el" >{campaign_type.cost_percentage_change}</div>
                    <div className="accordion-el" >{campaign_type.sales_percentage_change}</div>
                    <div className="accordion-el" >{campaign_type.acos_percentage_change}</div>
                </div>
                <div style={{ display: toggle ? "block" : "none" }} className="panel">
                    {toggle && <TableFour category={category} ad_asin={ad_asin} campaign_type={campaign_type.campaign_type} />}
                </div>
            </div>
        )
    }

    const TableThree = (props) => {
        const { category, ad_asin } = props;
        const [dataArray, setDataArray] = useState([]);
        useEffect(() => {
            loadData({ setDataArray, filter: { category, ad_asin }, group_by: "campaign_type" })
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
                        return <AccordianThree category={category} ad_asin={ad_asin} campaign_type={el} />
                    })) : <div className="table-data-loading" > <p>Loadng...</p></div>
                }
            </div>
        )
    }

    const AccordianTwo = (props) => {
        const { category, ad_asin } = props;
        const [toggle, setToggle] = useState(false);
        function toggleFunction(e) {
            setToggle(prevState => !prevState);
        }
        return (
            <div className="accordian-body">
                <div onClick={toggleFunction} className={`accordion`}>
                    <div className="accordion-el bg-gray" >{category}</div>
                    <div className={`accordion-el accordion-el-as-icon-container ${toggle ? "active" : ""}`} >
                        <span> {ad_asin.ad_asin} </span>
                        <span><i class={`bi bi-chevron-${toggle ? "up" : "right"}`}></i></span>
                    </div>
                    <div className="accordion-el" ></div>
                    <div className="accordion-el" ></div>
                    <div className="accordion-el" ></div>
                    <div className="accordion-el" >{ad_asin.cost_percentage_change}</div>
                    <div className="accordion-el" >{ad_asin.sales_percentage_change}</div>
                    <div className="accordion-el" >{ad_asin.acos_percentage_change}</div>
                </div>
                <div style={{ display: toggle ? "block" : "none" }} className="panel">
                    {toggle && <TableThree category={category} ad_asin={ad_asin.ad_asin} />}
                </div>
            </div>
        )
    }


    const TableTwo = (props) => {
        const { category } = props;
        const [dataArray, setDataArray] = useState([]);
        useEffect(() => {
            loadData({ setDataArray, filter: { category }, group_by: "ad_asin" })
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
                        return <AccordianTwo category={category} ad_asin={el} />
                    })) : <div className="table-data-loading" > <p>Loadng...</p></div>
                }
            </div>
        )
    }


    const AccordianOne = (props) => {
        const { category } = props;
        const [toggle, setToggle] = useState(false);
        function toggleFunction(e) {
            setToggle(prevState => !prevState);
        }
        return (
            <div className="accordian-body" >
                <div onClick={toggleFunction} className={`accordion `}>
                    <div className={`accordion-el accordion-el-as-icon-container ${toggle ? "active" : ""}`} >
                        <span>{category.category}</span>
                        <span><i class={`bi bi-chevron-${toggle ? "up" : "right"}`}></i></span>
                    </div>
                    <div className="accordion-el" ></div>{/* Dynamic  */}
                    <div className="accordion-el" ></div>{/* Dynamic  */}
                    <div className="accordion-el" ></div>{/* Dynamic  */}
                    <div className="accordion-el" ></div>{/* Dynamic  */}
                    <div className="accordion-el" >{category.cost_percentage_change}</div>
                    <div className="accordion-el" >{category.sales_percentage_change}</div>
                    <div className="accordion-el" >{category.acos_percentage_change}</div>
                </div>
                <div style={{ display: toggle ? "block" : "none" }} className="panel">
                    {toggle && <TableTwo category={category.category} />}
                </div>
            </div>
        )
    }

    const TableOne = () => {
        const [dataArray, setDataArray] = useState([]);
        useEffect(() => {
            //  loadData({ setDataArray, group_by: "category" })
            axios.post(`${BASE_URL}dashboard/advertisingReport/getDynamicTableData?brandId=${current_brand}`, {
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
                    <div className="table-header-el" >ASIN</div> {/*Dynamic Master column */}
                    <div className="table-header-el" >Ad Type</div>{/*Dynamic Master column */}
                    <div className="table-header-el" >Targetting</div>{/*Dynamic Master column */}
                    <div className="table-header-el" >Placement</div>{/*Dynamic Master column */}
                    <div className="table-header-el" >Cost</div>
                    <div className="table-header-el" >sales</div>
                    <div className="table-header-el" >ACOS</div>
                </div>
                {
                    dataArray.length > 0 ? (dataArray.map(el => {
                        return <AccordianOne category={el} />
                    })) : <div className="table-data-loading" > <p>Loadng...</p></div>
                }
            </div>
        )
    }


    return (
        <div style={{ height: 460, overflow: "scroll", border: "1px solid gray" }}>
            <TableOne />
        </div>
    )
}

export default CustomMasterGrid;