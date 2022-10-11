import "./BudgetContainer.css";

import axios from "axios"

import GridComponent from "../../Grids/GridComponent/GridComponent";
import { useMemo, useEffect, useState, useRef } from "react";
import { getMonthAndYearArray, getFirstDayOfMonthAndYearArray } from "../../../utils/commonFunction";
import { divTwoNum, roundOffToTwoDecimal } from "../../../commonFunction/commomFunction";
import { NotificationContainer, NotificationManager } from 'react-notifications';
const BudgetContainer = (props) => {
    const [popUp, setPopUp] = useState(false);
    const [searchDate, setSearchDate] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01T00:00:00.000+00:00`);
    const [searchDateArray, setSearchDateArray] = useState();
    const [popUpData, setPopUpData] = useState()
    const [state, setState] = useState({
        _id: "",
        category_wise_sales_and_spend_target: [],
    });

    useEffect(() => {
        const datesArray = getFirstDayOfMonthAndYearArray(3, 3, new Date());
        setSearchDateArray(datesArray);
    }, [])
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.post('http://localhost:5000/clientMonthlyConfig/monthlyBudget', {
            time_stamp: searchDate
        },
            {
                headers: { token }
            }

        )
            .then(function (response) {
                const { category_wise_sales_and_spend_target, _id } = response.data.data.clientMonthlyConfig
                setState({ _id, category_wise_sales_and_spend_target })
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [searchDate])

    const searchDateFn = (e) => {
        console.log(e.target.value);
        setSearchDate(e.target.value);
    }

    const editIconClicked = (data) => {
        if (new Date(data.for_month) > new Date()) {
            setPopUp(true)
            setPopUpData(data);
        } else {
            NotificationManager.info('You cannot edit.', 'Info', 2000);
        }
    }
    const closePopUp = () => {
        setPopUp(false);
        setPopUpData({});
    }
    const onInputChange = (e) => {
        const { value, name } = e.target;
        setPopUpData((prevState) => ({ ...prevState, [name]: value * 1 }))
    }
    const onSave = () => {
        const token = localStorage.getItem("token");
        const arr = [...state.category_wise_sales_and_spend_target];
        const { category, ad_sales, spend } = popUpData;
        arr.forEach(el => {
            if (el.category === category) {
                el.ad_sales = ad_sales;
                el.spend = spend
            }
        })
        // setState({ _id: "", category_wise_sales_and_spend_target: [] });
        axios.put(`http://localhost:5000/clientMonthlyConfig/${state._id}`, { category_wise_sales_and_spend_target: arr }, {
            headers: { token }
        })
            .then(function (response) {
                const { category_wise_sales_and_spend_target, _id } = response.data.data.clientMonthlyConfig;
                setState({ _id: _id, category_wise_sales_and_spend_target });
                closePopUp();
            })
            .catch(function (error) {
                console.log(error.response.data.data.message);
                NotificationManager.error(error.response.data.data.message, 'Error', 2000);
            })
    }
    const onRowElSave = (e) => {
        const token = localStorage.getItem("token");
        const arr = [...state.category_wise_sales_and_spend_target];
        const { category, ad_sales, spend } = e;
        arr.forEach(el => {
            if (el.category === category) {
                el.ad_sales = ad_sales;
                el.spend = spend
            }
        })
        // setState({ _id: "", category_wise_sales_and_spend_target: [] });
        axios.put(`http://localhost:5000/clientMonthlyConfig/${state._id}`, { category_wise_sales_and_spend_target: arr }, {
            headers: { token }
        })
            .then(function (response) {
                const { category_wise_sales_and_spend_target, _id } = response.data.data.clientMonthlyConfig;
                setState({ _id: _id, category_wise_sales_and_spend_target });
                // closePopUp();
            })
            .catch(function (error) {
                console.log(error.response.data.data.message);
                NotificationManager.error(error.response.data.data.message, 'Error', 2000);
            })
    }
    const brandConfigEditToggle = () => {
        const token = localStorage.getItem("token");
        axios.put(`http://localhost:5000/brand`, {}, {
            headers: { token }
        }).then(function (response) {
            NotificationManager.success(response.data.data.message, 'Success', 2000);
        }).catch(function (error) {
            console.log(error.response.data.data.message);
            NotificationManager.error(error.response.data.data.message, 'Error', 2000);
        })
    }





    //ag-grid
    const editIcon = (props) => {
        return (
            <div className="editIcon" >
                <i onClick={() => editIconClicked(props.data)} className="bi bi-pencil"></i>
            </div>
        )
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
            <div> {props.value.split("T")[0]}</div>
        )
    }
    const AdSalesTarget = props => {
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
            onRowElSave(state)
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

    const SpendTargetBudget = props => {
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
            onRowElSave(state)
        }
        return (
            <div style={{ width: 100 }} onDoubleClick={() => onDoubleClick()}>
                {
                    inputToggle ?
                        (
                            <div className="adSalesTargetInputContainer">
                                <input placeholder="Enter value" type="number" onChange={(e) => { setState(state => ({ ...state, spend: e.target.value * 1 })) }} className="adSalesTargetInput" value={state.spend} ></input >
                                <i onClick={() => onSaveFn()} class="bi bi-check-circle"></i>
                            </div>
                        )

                        : state.spend === "" ? addIconStatus ? <i onClick={() => onDoubleClick()} class="bi bi-plus-circle"></i> : "" : state.spend
                }
            </div>
        )
    }

    const headerArray = [
        {
            headerName: "Category",
            field: "category",
            width: 360
        },
        {
            headerName: "AD Sales Target",
            field: "ad_sales",
            cellComponent: AdSalesTarget,
            width: 180
        },
        {
            headerName: "Spend Target Budget",
            cellComponent: SpendTargetBudget,
            field: "spend",
            width: 180
        },
        {
            headerName: "Target ACOS",
            field: "",
            cellComponent: acosComponent,
            width: 180
        },
        {
            headerName: "Current ACOS",
            field: "",
            cellComponent: acosComponent,
            width: 180
        },
        {
            headerName: "Date",
            field: "for_month",
            cellComponent: dateComponent,
            width: 200
        },
        // {
        //     headerName: "Edit",
        //     field: "",
        //     cellComponent: editIcon,
        //     minWidth: 100,
        //     maxWidth: 180
        // },
    ]
    return (
        <div className="salesSpendContainer" >
            <div style={{ flex: 1 }} >
                <div className="salesSpendContainerHeader" >
                    <h3 style={{ fontSize: "18px", color: "#1565C0" }} >Category wise Sales & Spend Target.</h3>
                    <div className="salesSpendContainerDateContainer" >
                        <select onChange={searchDateFn} className="form-select form-select-sm" aria-label=".form-select-sm example">
                            {
                                searchDateArray && searchDateArray.map((date, i) => {
                                    return (
                                        <option selected={searchDate === date ? true : false} key={i} value={date}>{date.split("T")[0]}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                </div>

                <GridComponent
                    headerArray={headerArray}
                    rowArray={state.category_wise_sales_and_spend_target}
                    tableHeight={500}
                />

                <div className="nextButtonContainer" >
                    <button onClick={() => { props.changeOnBoardingEl("Seller") }} type="button" className="btn btn-secondary btn-sm">Back</button>
                    <button style={{ marginLeft: 20 }} onClick={brandConfigEditToggle} type="button" className="btn btn-primary btn-sm">Save</button>

                </div>

            </div>
            {
                popUp && (<div className="editPopUp"  >
                    <form >
                        <div className="form-group">
                            <label for="inputCategory">Category</label>
                            <input disabled type="text" value={popUpData.category} className="form-control" id="inputCategory" placeholder="Input Category"></input>
                        </div>
                        <div className="form-group">
                            <label for="monthlyBudget">AD Sales Target</label>
                            <input type="number" value={popUpData.ad_sales} name="ad_sales" onChange={onInputChange} className="form-control" id="monthlyBudget" placeholder="AD Sales Target"></input>
                        </div>
                        <div className="form-group">
                            <label for="targetAcos">Spend Target</label>
                            <input type="number" value={popUpData.spend} name="spend" onChange={onInputChange} className="form-control" id="targetAcos" placeholder="Spend Target"></input>
                        </div>
                    </form>
                    <div className="editPopUpButtonsContainer" >
                        <div className="editPopUpButtons" style={{ display: "flex" }} >
                            <button style={{ marginRight: "20px" }} type="button" onClick={closePopUp} className="btn btn-warning btn-sm">Cancel</button>
                        </div>
                        <div className="editPopUpButtons" style={{ display: "flex" }} >
                            <button type="button" onClick={onSave} className="btn btn-primary btn-sm">Save</button>
                        </div>
                    </div>
                </div>)
            }
            <NotificationContainer />
        </div>
    )
}

export default BudgetContainer;