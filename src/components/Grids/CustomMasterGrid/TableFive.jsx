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


export default TableFive;
