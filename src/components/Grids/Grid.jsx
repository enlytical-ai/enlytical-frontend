
import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo } from "react";

const Grid = (props) => {
    const rowData = [
        { category: "Coffee Maker", sales: 1234, L7DSales: 5666, ACOS: 55 }

    ];
    const defaultColDef = useMemo(() => (
        {
            sortable: true
        }
    ), [])
    const columnDefs = [
        { field: 'category', width: 120, resizable: true },
        { field: 'sales' },
        { field: 'L7DSales' },
        { field: "ACOS" },
        { field: "spend" },
        { field: "L7DSpend" },
        { field: "Imp" },
        { field: "L7DImp" },
        { field: "CPC" },
        { field: "L7Dcpc" },
        { field: "CTR" },
        { field: "L7Dctr" },
        { field: "Clicks" },
        { field: "L7Dclic" }
    ]

    return (
        <div className="ag-theme-alpine" style={{ height: 300 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowHeight={30}
                headerHeight={30}
            />
        </div>
    );
}

export default Grid;