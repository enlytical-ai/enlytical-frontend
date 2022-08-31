import { useState } from "react";
import "./ProductTable.css"
import { useEffect } from "react";
const ProductTable = (props) => {
    const { crawled_data_array } = props
    const [state, setState] = useState({
        crawled_data_array: []
    })
    const onCheck = (e) => {
        console.log(e.target.checked);
    }

    return (
        <div className="productTableContainer" >
            <h3 style={{ fontSize: "18px", color: "#1565C0" }} >Please select your ASIN</h3>
            <div className="table"  >
                <div
                    className="tableHeader"
                >
                    <div className="tableHeaderElement" style={{ width: "50px" }} >   #</div>
                    <div className="tableHeaderElement" style={{ width: "110px" }} >Asin</div>
                    <div className="tableHeaderElement" style={{ width: "130px" }} >Product Name</div>
                    <div className="tableHeaderElement" style={{ width: "80px" }} >MRP</div>
                    <div className="tableHeaderElement" style={{ width: "220px" }} >Seller</div>
                    <div className="tableHeaderElement" style={{ width: "150px" }} >Main Category</div>
                    <div className="tableHeaderElement" style={{ width: "150px" }} >Sub Category</div>
                    <div className="tableHeaderElement" style={{ width: "150px" }} >Pack size / grams</div>
                    <div className="tableHeaderElement" style={{ width: "130px" }} >Visibility Priority</div>

                </div>
                {
                    crawled_data_array.map((p) => {
                        return (
                            <div
                                className="tableRow"
                                style={{
                                    display: "flex",
                                    height: "40px",
                                    alignItems: "center",
                                    borderBottom: "1px solid #e0e0e0",
                                    paddingLeft: "5px",


                                }}
                                key={p.platform_code}
                            >
                                <div style={{ width: "50px" }} >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={p._id}
                                        onChange={onCheck}

                                    ></input>
                                </div>
                                <div style={{ color: "#757575", width: "110px" }}  >{p.platform_code}</div>
                                <div style={{ color: "#757575", width: "130px" }}  >{"name"}</div>
                                <div style={{ color: "#757575", width: "80px" }}  >{p.mrp}</div>
                                <div style={{ color: "#757575", width: "220px" }}  >{p.seller}</div>
                                <div style={{ color: "#757575", width: "150px" }}  >{p.main_cat}</div>
                                <div style={{ color: "#757575", width: "150px" }}  >{p.sub_cat}</div>
                                <div style={{ color: "#757575", width: "150px" }}  ></div>
                                <div style={{ color: "#757575", width: "130px" }}  ></div>


                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default ProductTable;