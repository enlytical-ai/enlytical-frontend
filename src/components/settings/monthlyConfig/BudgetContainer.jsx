import "./BudgetContainer.css";

import axios from "axios"

import GridComponent from "../../Grids/GridComponent/GridComponent";
import { useMemo, useEffect, useState, useRef } from "react";
import { getMonthAndYearArray } from "../../../utils/commonFunction";
const BudgetContainer = (props) => {
    const [popUp, setPopUp] = useState(false);
    const [searchDate, setSearchDate] = useState("Sep-2022");
    const [searchDateArray, setSearchDateArray] = useState();
    const [popUpData, setPopUpData] = useState()
    const [state, setState] = useState({
        _id: "",
        category_wise_sales_and_spend_target: [],
    });

    useEffect(() => {
        const datesArray = getMonthAndYearArray(3, 3, new Date());
        setSearchDateArray(datesArray);
    }, [])
    useEffect(() => {
        axios.post('http://localhost:5000/clientMonthlyConfig/monthlyBudget', {
            time_stamp: searchDate
        })
            .then(function (response) {
                const { category_wise_sales_and_spend_target, _id } = response.data.data.clientMonthlyConfig
                setState({ _id, category_wise_sales_and_spend_target })
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [searchDate])

    const searchDateFn = (e) => {
        setSearchDate(e.target.value);
    }

    const editIconClicked = (data) => {
        setPopUp(true)
        setPopUpData(data);
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
        const arr = [...state.category_wise_sales_and_spend_target];
        const { category, ad_sales, spend } = popUpData;
        arr.forEach(el => {
            if (el.category === category) {
                el.ad_sales = ad_sales;
                el.spend = spend
            }
        })
        setState({ _id: "", category_wise_sales_and_spend_target: [] });
        axios.put(`http://localhost:5000/clientMonthlyConfig/${state._id}`, { category_wise_sales_and_spend_target: arr })
            .then(function (response) {
                const { category_wise_sales_and_spend_target, _id } = response.data.data.clientMonthlyConfig;
                setState({ _id: _id, category_wise_sales_and_spend_target });
                closePopUp();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //ag-grid
    const editIcon = (props) => {
        return (
            <div className="editIcon" >
                <i onClick={() => editIconClicked(props.data)} class="bi bi-pencil"></i>
            </div>
        )
    }


    const headerArray = [
        {
            headerName: "Category",
            field: "category",
            width: 320
        },
        {
            headerName: "AD Sales Target",
            field: "ad_sales",
            width: 240
        },
        {
            headerName: "Spend Target Budget",
            field: "spend",
            width: 240
        },
        {
            headerName: "Date",
            field: "for_month",
            width: 160
        },
        {
            headerName: "Edit",
            field: "",
            cellComponent: editIcon,
            minWidth: 200,
            maxWidth: 300
        },
    ]
    return (
        <div className="salesSpendContainer" >
                <div style={{ flex: 1 }} >
                    <div className="salesSpendContainerHeader" >
                        <h3 style={{ fontSize: "18px", color: "#1565C0" }} >Category wise Sales & Spend Target.</h3>
                        <div className="salesSpendContainerDateContainer" >
                            <select onChange={searchDateFn} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                {
                                    searchDateArray && searchDateArray.map((date, i) => {
                                        return (
                                            <option selected={searchDate === date ? true : false} key={i} value={date}>{date}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                    </div>
                    <GridComponent
                        headerArray={headerArray}
                        rowArray={state.category_wise_sales_and_spend_target}
                        tableHeight={560}
                    />
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
        </div>
    )
}

export default BudgetContainer;