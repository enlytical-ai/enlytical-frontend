const SellerTable = (props) => {
    const { seller_arrary } = props
    return (
        <div className="sellerTable" >
            <h3 style={{ fontSize: "18px", color: "#1565C0" }} >Please select you Sellers</h3>
            <div className="table"  >
                <div
                    className="tableHeader"
                >
                    <div className="tableHeaderElement" style={{ width: "50px" }} >   #</div>
                    <div className="tableHeaderElement" style={{ width: "260px" }} >Seller Name</div>
                    <div className="tableHeaderElement" style={{ width: "260px" }} >Seller Fulfilment Method</div>

                </div>
                {
                    seller_arrary.map((s) => {
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
                            >
                                <div style={{ width: "50px" }} >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={s}
                                    ></input>
                                </div>
                                <div style={{ color: "#757575", width: "260px" }}  >{s}</div>
                                <div style={{ color: "#757575", width: "260px" }}  ></div>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default SellerTable