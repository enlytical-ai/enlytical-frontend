import "./SellerTable.css";
import axios from "axios";
import GridComponent from "../../Grids/GridComponent/GridComponent";
import Grid from "../../Grids/Grid/Grid";
import { useState } from "react";
import { useEffect } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../appConstants";
import Loader from "../../commonComponent/Loader/Loader";
const SellerTable = (props) => {
    const [loading, setLoading] = useState(false)
    const [sellerDataArray, setSellerDataArray] = useState([]);
    const appParams = useSelector(state => state.appParams);
    const { current_brand } = appParams;
    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);
        axios.get(`${BASE_URL}clientSellerDetail?brandId=${current_brand}`, {
            headers: {
                token
            }
        }).then(function (response) {
            console.log(response.data.data);
            const { seller_data_array } = response.data.data
            setSellerDataArray(seller_data_array);
            setLoading(false);
        }).catch(function (error) {
            console.log(error);
            setLoading(false);
        });
    }, [current_brand])
    //To get the height for grid
    const [gridHeight, setGridHeight] = useState();
    useEffect(() => {
        const height = window.innerHeight
        const netHeight = height - (49 + 40 + 32 + 42 + 24);
        setGridHeight(netHeight)
        //Header48,padding40,24,32,24
        // console.log("====Height===>", el - 168)
    }, [])
    window.addEventListener('resize', () => {
        const height = window.innerHeight
        const netHeight = height - (49 + 40 + 32 + 42 + 24);
        setGridHeight(netHeight)
    });
    //



    const onRowSelected = (selected, data) => {
        const token = localStorage.getItem("token");
        // const selected = e.target.checked;
        const { _id } = data;
        console.log(data)
        axios.put(`${BASE_URL}clientSellerDetail/${_id}?brandId=${current_brand}`, { selected }, {
            headers: {
                token
            }
        }).then(function (response) {
            const { seller } = response.data.data;
            const { _id, selected } = seller;
            const sellerArray = [...sellerDataArray];
            sellerArray.forEach(el => {
                if (el._id === _id) {
                    el.selected = selected;
                }
            })
            setSellerDataArray(sellerArray);
        }).catch(function (error) {
            console.log(error);
            NotificationManager.error(error.response.data.data.message, 'Error', 3000);
        });
    }
    const onSelectAll = (selected, data) => {
        const token = localStorage.getItem("token");
        // const selected = e.target.checked;
        const { _id } = data;
        console.log(data)
        axios.put(`${BASE_URL}clientSellerDetail/updateClientAllSellerDetail?brandId=${current_brand}`, { selected }, {
            headers: {
                token
            }
        }).then(function (response) {
            const { selected } = response.data.data.updated;
            const sellerArray = [...sellerDataArray];
            sellerArray.forEach(el => {
                el.selected = selected;
            })
            setSellerDataArray(sellerArray);
        }).catch(function (error) {
            console.log(error);
            NotificationManager.error(error.response.data.data.message, 'Error', 3000);
        });
    }

    const checkBoxClicked = (status, data) => {
        if (data !== "all") {
            onRowSelected(status, data);
        } else {
            onSelectAll(status, data)
        }
    }

    const onSellerTypeClicked = (e, data) => {
        const token = localStorage.getItem("token");
        let seller_type = e.target.id;
        if (seller_type === data.seller_type) {
            seller_type = null;
        }
        const { _id } = data;
        console.log(data)
        axios.put(`${BASE_URL}clientSellerDetail/${_id}?brandId=${current_brand}`, { seller_type }, {
            headers: {
                token
            }
        }).then(function (response) {
            const { seller } = response.data.data;
            const { _id, seller_type } = seller;
            const sellerArray = [...sellerDataArray];
            sellerArray.forEach(el => {
                if (el._id === _id) {
                    el.seller_type = seller_type;
                }
            })
            setSellerDataArray(sellerArray);
        }).catch(function (error) {
            console.log(error);
            NotificationManager.error(error.response.data.data.message, 'Error', 3000);
        });

    }


    const checkBoxComponent = (props) => {
        return (
            <>
                <input onChange={(e) => onRowSelected(e, props.data)} className="form-check-input" type="checkbox" checked={props.value}></input>
            </>
        )
    }

    const sellerType = (props) => {
        const sellerTypeElementArray = ["Authorised", "Unauthorised"];
        const { seller_type } = props.data;
        return (
            <div style={{ display: "flex" }} >
                {
                    sellerTypeElementArray.map(p => {
                        return <div onClick={(e) => onSellerTypeClicked(e, props.data)} key={p} id={p} className={`sellerTypeElement ${p === seller_type ? "selectedSellerTypeElement" : ""}`} >{p}</div>
                    })
                }
            </div>
        )
    }

    const headerArray = [

        {
            headerName: "Seller Name",
            field: "seller_name",
            width: 260,

        },
        {
            headerName: "Seller Type",
            field: "seller_type",
            cellComponent: sellerType,
            width: 320
        },
        {
            headerName: "No. of ASIN",
            field: "",
            width: 260
        },
        {
            headerName: "Seller Rating",
            field: "",
            width: 260
        }
    ]

    return (
        <div className="sellerTable" >
            <div className="sellerTableHeader" >
                <h3 style={{ fontSize: "18px", color: "#1565C0" }} >Please select you Sellers</h3>

            </div>
            {
                loading ? <div style={{ height: gridHeight }} ><Loader /></div> : (
                    <Grid
                        headerArray={headerArray}
                        rowArray={sellerDataArray}
                        tableHeight={gridHeight}
                        checkBox={{
                            field: "selected"
                        }}
                        checkBoxClicked={checkBoxClicked}
                    />
                )
            }

            <div className="nextButtonContainer" >

                <button onClick={() => { props.changeOnBoardingEl("Portfolio") }} type="button" className="btn btn-secondary btn-sm">Back</button>
                <button style={{ marginLeft: 20 }} onClick={() => { props.changeOnBoardingEl("Budget") }} type="button" className="btn btn-primary btn-sm">Next</button>

            </div>
            <NotificationContainer />
        </div>
    )
}

export default SellerTable