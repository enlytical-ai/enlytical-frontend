

import axios from "axios";
import GridComponent from "../../Grids/GridComponent/GridComponent";
import GridAccordianComponent from "../../Grids/GridAccordianComponent/GridAccordianComponent"
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import "./ProductTable.css"
import Loader from "../../commonComponent/Loader/Loader";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../appConstants";

const ProductTable = (props) => {
    const [productDataArray, setProductDataArray] = useState([]);
    const [loading, setLoading] = useState(false)
    const defaultColDef = useMemo(() => ({ sortable: true }
    ), []);

    const appParams = useSelector(state => state.appParams);
    const { current_brand } = appParams;
    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem("token");

        axios.get(`${BASE_URL}clientProductDetail?brandId=${current_brand}`, {
            headers: {
                token
            }
        }).then(function (response) {
            console.log("======>", response.data.data);
            const { product_data_array } = response.data.data
            setProductDataArray(product_data_array);
            setLoading(false);
        }).catch(function (error) {
            console.log("======>", error.response.data.data.message);
        });
    }, [current_brand]);
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
    const onRowSelected = (e, data) => {
        const token = localStorage.getItem("token");
        const selected = e.target.checked;
        const { _id } = data;
        console.log(data)
        axios.put(`http://localhost:5000/clientProductDetail/${_id}?brandId=${current_brand}`, { selected }, {
            headers: {
                token
            }
        }).then(function (response) {
            const { product } = response.data.data;
            const { _id, selected } = product;
            const productArray = [...productDataArray];
            productArray.forEach(el => {
                if (el._id === _id) {
                    el.selected = selected;
                }
            })
            setProductDataArray(productArray);
        }).catch(function (error) {
            console.log(error.response.data.data.message);
            NotificationManager.error(error.response.data.data.message, 'Error', 3000);
        });
    }
    const onPriorityClicked = (e, data) => {
        const token = localStorage.getItem("token");
        let priority = e.target.id;
        if (priority === data.priority) {
            priority = null;
        }
        const { _id } = data;

        axios.put(`http://localhost:5000/clientProductDetail/${_id}?brandId=${current_brand}`, { priority }, {
            headers: {
                token
            }
        }).then(function (response) {
            const { product } = response.data.data;
            const { _id, priority } = product;
            const productArray = [...productDataArray];
            productArray.forEach(el => {
                if (el._id === _id) {
                    el.priority = priority;
                }
            })
            setProductDataArray(productArray);
        }).catch(function (error) {
            console.log(error);
            NotificationManager.error(error.response.data.data.message, 'Error', 3000);
        });

    }
    const productNameComponent = (props) => {
        return (
            <abbr title={props.value} style={{ overflow: "hidden", whiteSpace: "nowrap", textDecoration: "none", width: "100%" }} >{props.value}</abbr>
        )
    }
    const productCodeComponent = (props) => {
        return (
            <abbr title={props.value} style={{ overflow: "hidden", whiteSpace: "nowrap", textDecoration: "none" }} >{props.value}</abbr>
        )
    }
    const checkBoxComponent = (props) => {
        return (
            <>
                <input onChange={(e) => onRowSelected(e, props.data)} className="form-check-input" type="checkbox" checked={props.value}></input>
            </>
        )
    }
    const priorityComponent = (props) => {
        const priorityElementArray = ["Launch", "Growth", "ROI"];
        const { priority } = props.data;
        return (
            <div style={{ display: "flex" }} >
                {
                    priorityElementArray.map(p => {
                        return <div onClick={(e) => onPriorityClicked(e, props.data)} key={p} id={p} className={`priorityElement ${p === priority ? "selectedPriorityElement" : ""}`} >{p}</div>
                    })
                }
            </div>
        )
    }

    const asinComponent = props => {
        return (
            <div style={{ display: "flex", alignItems: "center" }} >
                <img src={props.data.image_url} style={{ height: "32px" }} ></img>
                <a href={`https://www.amazon.in/dp/${props.value}`} target="_blank" style={{ color: "#1565C0", cursor: "pointer" }} >{props.value}</a>
            </div>
        )
    }
    const headerArray = [
        { headerName: "", field: "selected", minWidth: 30, maxWidth: 30, cellComponent: checkBoxComponent },
        { headerName: "Asin", field: 'platform_code', cellComponent: asinComponent, minWidth: 160, maxWidth: 160 },
        { headerName: "Product Name", field: 'product_name', cellComponent: productNameComponent, minWidth: 300, maxWidth: 300 },
        { headerName: "MRP", field: 'mrp', minWidth: 80, maxWidth: 80 },
        { headerName: "Product Code", field: "product_code", cellComponent: productCodeComponent, minWidth: 160, maxWidth: 160 },
        { headerName: "Priority", field: "", cellComponent: priorityComponent, minWidth: 360, maxWidth: 360 },
        // { headerName: "Portfolio", field: "category", minWidth: 180 },
        // { headerName: "Category", field: "amazon_sub_cat", minWidth: 180 },
        // { headerName: "Type", field: "type", minWidth: 120 },
        // { headerName: "Platform", field: "platform", minWidth: 120 },
    ]
    const accordianBodyArray = [
        { headerName: "Portfolio", field: "category", width: 180 },
        { headerName: "Category", field: "amazon_sub_cat", width: 180 },
        { headerName: "Type", field: "type", width: 120 },
        { headerName: "Platform", field: "platform", width: 120 },
    ]
    return (
        <>
            <div className="productTableContainer" >
                <div className="productTableContainerHeader" >
                    <h3 style={{ fontSize: "18px", color: "#1565C0" }} >Please select your ASIN</h3>
                </div>
                {/* {
                    productDataArray.length > 0 && ( */}
                {/* <GridComponent
                    headerArray={headerArray}
                    rowArray={productDataArray}
                    tableHeight={gridHeight}
                /> */}
                <GridAccordianComponent
                    headerArray={headerArray}
                    rowArray={productDataArray}
                    tableHeight={gridHeight}
                    accordianBodyArray={accordianBodyArray}
                />
                {/* )
                } */}
                {/* {
                    loading && <Loader />
                } */}
                <div className="nextButtonContainer" >
                    <button onClick={() => {
                        props.changeOnBoardingEl("Seller")
                    }} type="button" className="btn btn-primary btn-sm">Next</button>
                </div>
                <NotificationContainer />
            </div>
        </>
    )
}
export default ProductTable;