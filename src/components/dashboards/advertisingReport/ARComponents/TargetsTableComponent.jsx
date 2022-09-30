
import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo } from "react";

const CategoryTableComponent = (props) => {
    const { targets_table_data_array } = props;
    const defaultColDef = useMemo(() => ({ sortable: true }
    ), [])

    //Table Cell Component
    // const SalesCellComponent = (props) => {
    //     const { sales_flow } = props.data
    //     console.log(props.data)
    //     return (
    //         <p style={{ color: sales_flow === "positive" ? "green" : "red" }} >₹{props.value} </p>
    //     )
    // }

    // const AcosCellComponent = (props) => {
    //     const { acos_flow } = props.data
    //     console.log(props.data)
    //     return (
    //         <p style={{ color: acos_flow === "positive" ? "green" : "red" }} >₹{props.value} </p>
    //     )
    // }
    // const CostCellComponent = (props) => {
    //     const { cost_flow } = props.data
    //     console.log(props.data)
    //     return (
    //         <p style={{ color: cost_flow === "positive" ? "green" : "red" }} >₹{props.value} </p>
    //     )
    // }
    // const ImpressionsCellComponent = (props) => {
    //     const { impressions_flow } = props.data
    //     console.log(props.data)
    //     return (
    //         <p style={{ color: impressions_flow === "positive" ? "green" : "red" }} >₹{props.value} </p>
    //     )
    // }


    const columnDefs = [
        { headerName: "Category", field: 'category', width: 200, resizable: true },
        { headerName: "Sales", field: 'sales',  width: 180, resizable: true },
        { headerName: "Target Sales", field: 'target_sales', width: 180, resizable: true },
        { headerName: "Cost", field: "cost", width: 160, resizable: true },
        { headerName: "Target Cost", field: "target_cost", width: 180, resizable: true },
        { headerName: "ACOS", field: "acos",  width: 180, resizable: true },
        { headerName: "Target ACOS", field: "target_acos", width: 180, resizable: true },
    ]

    return (
        <div className="ag-theme-alpine" style={{ height: 300 }}>
            <AgGridReact
                onRowClicked={(e) => { console.log(e) }}
                rowData={targets_table_data_array}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowHeight={30}
                headerHeight={30}
            />
        </div>
    );
}

export default CategoryTableComponent;