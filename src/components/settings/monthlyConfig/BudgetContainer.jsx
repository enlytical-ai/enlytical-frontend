import "./BudgetContainer.css";

import axios from "axios"

import GridComponent from "../../Grids/GridComponent/GridComponent";
import Grid from "./../../Grids/Grid/Grid";
import Accordian from "../../accordian/Accordian";
// import { Accordian } from "accordianjs";
import { useMemo, useEffect, useState, useRef } from "react";
import { getMonthAndYearArray, getFirstDayOfMonthAndYearArray, getMontheInText } from "../../../utils/commonFunction";
import { divTwoNum, roundOffToTwoDecimal } from "../../../commonFunction/commomFunction";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../appConstants";
const BudgetContainer = (props) => {
    const [popUp, setPopUp] = useState(false);
    const [searchDate, setSearchDate] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01T00:00:00.000+00:00`);
    const [searchDateArray, setSearchDateArray] = useState();
    const [popUpData, setPopUpData] = useState()
    const [state, setState] = useState({
        _id: "",
        category_wise_sales_and_spend_target: [],
        category_wise_sales_and_spend_target_deal_days: [],
        category_wise_sales_and_spend_target_business_as_usual: []
    });
    const appParams = useSelector(state => state.appParams);
    const { current_brand } = appParams;


    useEffect(() => {
        const datesArray = getFirstDayOfMonthAndYearArray(3, 3, new Date());
        setSearchDateArray(datesArray);
    }, [])
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.post(`${BASE_URL}clientMonthlyConfig/monthlyBudget?brandId=${current_brand}`, {
            time_stamp: searchDate
        },
            {
                headers: { token }
            }
        ).then(function (response) {
            const {
                category_wise_sales_and_spend_target_deal_days,
                category_wise_sales_and_spend_target_business_as_usual,
                _id } = response.data.data.clientMonthlyConfig
            setState({
                _id,
                category_wise_sales_and_spend_target_deal_days,
                category_wise_sales_and_spend_target_business_as_usual
            })
        }).catch(function (error) {
            NotificationManager.error(error.response.data.data.message, 'Error', 2000);
            setState({
                _id: "",
                category_wise_sales_and_spend_target_deal_days: [],
                category_wise_sales_and_spend_target_business_as_usual: []
            });
        });
    }, [searchDate, current_brand])

    //To get the height for grid
    const [gridHeight, setGridHeight] = useState();
    useEffect(() => {
        const height = window.innerHeight
        const netHeight = height - (49 + 40 + 32 + 42 + 24 + 10);
        setGridHeight(netHeight)
    }, [])
    window.addEventListener('resize', () => {
        const height = window.innerHeight
        const netHeight = height - (49 + 40 + 32 + 42 + 24 + 10);
        setGridHeight(netHeight)
    });
    //


    const searchDateFn = (e) => {
        console.log(e.target.value);
        setSearchDate(e.target.value);
    }

    const onRowElSaveDealDays = (e) => {
        const token = localStorage.getItem("token");
        const arr = [...state.category_wise_sales_and_spend_target_deal_days];
        const { category, ad_sales, spend } = e;
        arr.forEach(el => {
            if (el.category === category) {
                el.ad_sales = ad_sales;
                el.spend = spend
            }
        })
        // setState({ _id: "", category_wise_sales_and_spend_target: [] });
        axios.put(`http://localhost:5000/clientMonthlyConfig/${state._id}`, { category_wise_sales_and_spend_target_deal_days: arr }, {
            headers: { token }
        }).then(function (response) {
            const { category_wise_sales_and_spend_target_deal_days, category_wise_sales_and_spend_target_business_as_usual, _id } = response.data.data.clientMonthlyConfig;
            setState({ _id: _id, category_wise_sales_and_spend_target_deal_days, category_wise_sales_and_spend_target_business_as_usual });
            // closePopUp();
        })
            .catch(function (error) {
                console.log(error.response.data.data.message);
                NotificationManager.error(error.response.data.data.message, 'Error', 2000);
            })
    }

    const onRowElSaveBusinessAsUsual = (e) => {
        const token = localStorage.getItem("token");
        const arr = [...state.category_wise_sales_and_spend_target_business_as_usual];
        const { category, ad_sales, spend } = e;
        arr.forEach(el => {
            if (el.category === category) {
                el.ad_sales = ad_sales;
                el.spend = spend
            }
        })
        // setState({ _id: "", category_wise_sales_and_spend_target: [] });
        axios.put(`http://localhost:5000/clientMonthlyConfig/${state._id}`, { category_wise_sales_and_spend_target_business_as_usual: arr }, {
            headers: { token }
        }).then(function (response) {
            const { category_wise_sales_and_spend_target_deal_days, category_wise_sales_and_spend_target_business_as_usual, _id } = response.data.data.clientMonthlyConfig;
            setState({ _id: _id, category_wise_sales_and_spend_target_deal_days, category_wise_sales_and_spend_target_business_as_usual });
            // closePopUp();
        })
            .catch(function (error) {
                console.log(error.response.data.data.message);
                NotificationManager.error(error.response.data.data.message, 'Error', 2000);
            })
    }
    const brandConfigEditToggle = () => {
        const token = localStorage.getItem("token");
        axios.put(`${BASE_URL}brand?brandId=${current_brand}`, {}, {
            headers: { token }
        }).then(function (response) {
            NotificationManager.success(response.data.data.message, 'Success', 2000);
        }).catch(function (error) {
            console.log(error.response.data.data.message);
            NotificationManager.error(error.response.data.data.message, 'Error', 2000);
        })
    }



    //ag-grid
    const getMandT = (d) => {
        const month = new Date(d).getMonth();
        const year = new Date(d).getFullYear();

        return `${getMontheInText((month + 1))}-${year}`

    }
    const acosComponent = props => {
        const { spend, ad_sales } = props.data
        const div = divTwoNum(spend, ad_sales);
        let result;
        if (div === "error") {
            result = ""
        } else {
            result = roundOffToTwoDecimal(div * 100)
        }
        return (
            <div> {result}</div>
        )
    }
    const dateComponent = props => {
        return (
            <div> {getMandT(props.value)}</div>
        )
    }



    //==========DEAL_DAYS===========
    const AdSalesTargetDealDays = props => {
        const [state, setState] = useState(props.data)
        const [inputToggle, setInputToggle] = useState(false);
        const addIconStatus = new Date(props.data.for_month) > new Date()
        const onDoubleClick = () => {
            if (new Date(props.data.for_month) > new Date()) {
                setInputToggle(true)
            } else {
                NotificationManager.info('You cannot edit.', 'Info', 2000);
            }
        }
        const onSaveFn = () => {
            setInputToggle(false)
            onRowElSaveDealDays(state)
        }
        return (
            <div style={{ width: 100 }} onDoubleClick={() => onDoubleClick()}>
                {
                    inputToggle ?
                        (
                            <div className="adSalesTargetInputContainer">
                                <input placeholder="Enter value" type="number" onChange={(e) => { setState(state => ({ ...state, ad_sales: e.target.value * 1 })) }} className="adSalesTargetInput" value={state.ad_sales} ></input >
                                <i onClick={() => onSaveFn()} class="bi bi-check-circle"></i>
                            </div>
                        )
                        : state.ad_sales === "" ? addIconStatus ? <i onClick={() => onDoubleClick()} class="bi bi-plus-circle"></i> : "" : state.ad_sales
                }
            </div>
        )
    }

    const SpendTargetBudgetDealDays = props => {
        const [inputToggle, setInputToggle] = useState(false);
        const [state, setState] = useState(props.data)
        const addIconStatus = new Date(props.data.for_month) > new Date()
        const onDoubleClick = () => {
            if (new Date(props.data.for_month) > new Date()) {
                setInputToggle(true)
            } else {
                NotificationManager.info('You cannot edit.', 'Info', 2000);
            }

        }
        const onSaveFn = () => {
            setInputToggle(false)
            onRowElSaveDealDays(state)
        }
        return (
            <div style={{ width: 100 }} onDoubleClick={() => onDoubleClick()}>
                {
                    inputToggle ? (
                        <div className="adSalesTargetInputContainer">
                            <input placeholder="Enter value" type="number" onChange={(e) => { setState(state => ({ ...state, spend: e.target.value * 1 })) }} className="adSalesTargetInput" value={state.spend} ></input >
                            <i onClick={() => onSaveFn()} class="bi bi-check-circle"></i>
                        </div>
                    ) : state.spend === "" ? addIconStatus ? <i onClick={() => onDoubleClick()} class="bi bi-plus-circle"></i> : "" : state.spend
                }
            </div>
        )
    }

    const headerArrayDealDays = [
        {
            headerName: "Category",
            field: "category",
            width: 260
        },
        {
            headerName: "AD Sales Target",
            field: "ad_sales",
            cellComponent: AdSalesTargetDealDays,
            width: 180
        },
        {
            headerName: "Spend Target Budget",
            cellComponent: SpendTargetBudgetDealDays,
            field: "spend",
            width: 180
        },
        {
            headerName: "Target ACOS",
            field: "",
            cellComponent: acosComponent,
            width: 170
        },
        {
            headerName: "Current ACOS",
            field: "",
            cellComponent: acosComponent,
            width: 160
        },
        {
            headerName: "Date",
            field: "for_month",
            cellComponent: dateComponent,
            width: 180
        },

    ]
    //==========BUSINESS_AS_USUAL==========
    const AdSalesTargetBusinessAsUsual = props => {
        const [state, setState] = useState(props.data)
        const [inputToggle, setInputToggle] = useState(false);
        const addIconStatus = new Date(props.data.for_month) > new Date()
        const onDoubleClick = () => {
            if (new Date(props.data.for_month) > new Date()) {
                setInputToggle(true)
            } else {
                NotificationManager.info('You cannot edit.', 'Info', 2000);
            }
        }
        const onSaveFn = () => {
            setInputToggle(false)
            onRowElSaveBusinessAsUsual(state)
        }
        return (
            <div style={{ width: 100 }} onDoubleClick={() => onDoubleClick()}>
                {
                    inputToggle ?
                        (
                            <div className="adSalesTargetInputContainer">
                                <input placeholder="Enter value" type="number" onChange={(e) => { setState(state => ({ ...state, ad_sales: e.target.value * 1 })) }} className="adSalesTargetInput" value={state.ad_sales} ></input >
                                <i onClick={() => onSaveFn()} class="bi bi-check-circle"></i>
                            </div>
                        )
                        : state.ad_sales === "" ? addIconStatus ? <i onClick={() => onDoubleClick()} class="bi bi-plus-circle"></i> : "" : state.ad_sales
                }
            </div>
        )
    }

    const SpendTargetBudgetBusinessAsUsual = props => {
        const [inputToggle, setInputToggle] = useState(false);
        const [state, setState] = useState(props.data)
        const addIconStatus = new Date(props.data.for_month) > new Date()
        const onDoubleClick = () => {
            if (new Date(props.data.for_month) > new Date()) {
                setInputToggle(true)
            } else {
                NotificationManager.info('You cannot edit.', 'Info', 2000);
            }

        }
        const onSaveFn = () => {
            setInputToggle(false)
            onRowElSaveBusinessAsUsual(state)
        }
        return (
            <div style={{ width: 100 }} onDoubleClick={() => onDoubleClick()}>
                {
                    inputToggle ? (
                        <div className="adSalesTargetInputContainer">
                            <input placeholder="Enter value" type="number" onChange={(e) => { setState(state => ({ ...state, spend: e.target.value * 1 })) }} className="adSalesTargetInput" value={state.spend} ></input >
                            <i onClick={() => onSaveFn()} class="bi bi-check-circle"></i>
                        </div>
                    ) : state.spend === "" ? addIconStatus ? <i onClick={() => onDoubleClick()} class="bi bi-plus-circle"></i> : "" : state.spend
                }
            </div>
        )
    }
    const headerArrayBusinessAsUsual = [
        {
            headerName: "Category",
            field: "category",
            width: 260
        },
        {
            headerName: "AD Sales Target",
            field: "ad_sales",
            cellComponent: AdSalesTargetBusinessAsUsual,
            width: 180
        },
        {
            headerName: "Spend Target Budget",
            cellComponent: SpendTargetBudgetBusinessAsUsual,
            field: "spend",
            width: 180
        },
        {
            headerName: "Target ACOS",
            field: "",
            cellComponent: acosComponent,
            width: 170
        },
        {
            headerName: "Current ACOS",
            field: "",
            cellComponent: acosComponent,
            width: 160
        },
        {
            headerName: "Date",
            field: "for_month",
            cellComponent: dateComponent,
            width: 180
        },

    ]

    const DealDaysAccordianBody = () => {
        return (
            <div>
                <Grid
                    headerArray={headerArrayDealDays}
                    rowArray={state.category_wise_sales_and_spend_target_deal_days}
                    tableHeight={gridHeight - 80}
                />
            </div>

        )
    }

    const businessAsUsual = () => {
        return (
            <div>
                <Grid
                    headerArray={headerArrayBusinessAsUsual}
                    rowArray={state.category_wise_sales_and_spend_target_business_as_usual}
                    tableHeight={gridHeight - 80}
                />
            </div>

        )
    }


    return (
        <div className="salesSpendContainer" >
            <div className="salesSpendContainerHeader" >
                <h3 style={{ fontSize: "18px", color: "#1565C0" }} >Category wise Sales & Spend Target.</h3>
                <div className="salesSpendContainerDateContainer" >
                    <select onChange={searchDateFn} className="form-select form-select-sm" aria-label=".form-select-sm example">
                        {
                            searchDateArray && searchDateArray.map((date, i) => {
                                return (
                                    <option selected={searchDate === date ? true : false} key={i} value={date}>   {getMandT(date)}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            {/* <GridComponent
                headerArray={headerArray}
                rowArray={state.category_wise_sales_and_spend_target}
                tableHeight={gridHeight}
            /> */}
            <div className="budgetAccordianContainer" style={{ height: gridHeight }} >
                {/* <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOneBudget">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneBudget" aria-expanded="false" aria-controls="collapseOneBudget">
                                Deal Days
                            </button>
                        </h2>
                        <div id="collapseOneBudget" class="accordion-collapse collapse show" aria-labelledby="headingOneBudget" data-bs-parent="#accordionExample">
                            <div class="accordion-body budget-accordion-body">
                                <Grid
                                    headerArray={headerArrayDealDays}
                                    rowArray={state.category_wise_sales_and_spend_target_deal_days}
                                    tableHeight={gridHeight - 80}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwoBudget">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwoBudget" aria-expanded="false" aria-controls="collapseTwoBudget">
                                Business As Usual
                            </button>
                        </h2>
                        <div id="collapseTwoBudget" class="accordion-collapse collapse" aria-labelledby="headingTwoBudget" data-bs-parent="#accordionExample">
                            <div class="accordion-body budget-accordion-body">
                                <Grid
                                    headerArray={headerArrayBusinessAsUsual}
                                    rowArray={state.category_wise_sales_and_spend_target_business_as_usual}
                                    tableHeight={gridHeight - 80}
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="accordianElementContainer" >
                    <Accordian
                        accordianHeaderText="Deal Days"
                        accordianHeaderHeight={40}
                        accordianBodyComponent={DealDaysAccordianBody}
                        accordianBodyHeight={(gridHeight - 80)}
                    />
                </div>

                <div className="accordianElementContainer" >
                    <Accordian
                        accordianHeaderText="Business As Usual"
                        accordianHeaderHeight={40}
                        accordianBodyComponent={businessAsUsual}
                        accordianBodyHeight={(gridHeight - 80)}
                    />
                </div>

            </div>

            <div className="nextButtonContainer" >
                <button onClick={() => { props.changeOnBoardingEl("Seller") }} type="button" className="btn btn-secondary btn-sm">Back</button>
                <button style={{ marginLeft: 20 }} onClick={brandConfigEditToggle} type="button" className="btn btn-primary btn-sm">Save</button>
            </div>


            {
                // popUp && (<div className="editPopUp"  >
                //     <form >
                //         <div className="form-group">
                //             <label for="inputCategory">Category</label>
                //             <input disabled type="text" value={popUpData.category} className="form-control" id="inputCategory" placeholder="Input Category"></input>
                //         </div>
                //         <div className="form-group">
                //             <label for="monthlyBudget">AD Sales Target</label>
                //             <input type="number" value={popUpData.ad_sales} name="ad_sales" onChange={onInputChange} className="form-control" id="monthlyBudget" placeholder="AD Sales Target"></input>
                //         </div>
                //         <div className="form-group">
                //             <label for="targetAcos">Spend Target</label>
                //             <input type="number" value={popUpData.spend} name="spend" onChange={onInputChange} className="form-control" id="targetAcos" placeholder="Spend Target"></input>
                //         </div>
                //     </form>
                //     <div className="editPopUpButtonsContainer" >
                //         <div className="editPopUpButtons" style={{ display: "flex" }} >
                //             <button style={{ marginRight: "20px" }} type="button" onClick={closePopUp} className="btn btn-warning btn-sm">Cancel</button>
                //         </div>
                //         <div className="editPopUpButtons" style={{ display: "flex" }} >
                //             <button type="button" onClick={onSave} className="btn btn-primary btn-sm">Save</button>
                //         </div>
                //     </div>
                // </div>)
            }
            <NotificationContainer />
        </div>
    )
}

export default BudgetContainer;