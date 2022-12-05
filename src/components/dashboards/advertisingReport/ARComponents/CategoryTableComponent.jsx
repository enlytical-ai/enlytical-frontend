
import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo } from "react";
import { getFlowColor } from "../../../../commonFunction/commomFunction";
import Grid from "../../../Grids/newGrid/MasterGrid";
const CategoryTableComponent = (props) => {
    const { category_table_data_array } = props;
    const defaultColDef = useMemo(() => ({ sortable: true }
    ), [])

    //Table Cell Component
    const SalesCellComponent = (props) => {
        const { sales_flow } = props.data
        //  console.log(props.data)
        return (
            <div style={{ color: getFlowColor(sales_flow) }} >₹{props.value} </div>
        )
    }

    const AcosCellComponent = (props) => {
        const { acos_flow } = props.data
        return (
            <div style={{ color: getFlowColor(acos_flow) }} >{props.value}%</div>
        )
    }
    const CostCellComponent = (props) => {
        const { cost_flow } = props.data

        return (
            <div style={{ color: getFlowColor(cost_flow) }} >₹{props.value} </div>
        )
    }
    const ImpressionsCellComponent = (props) => {
        const { impressions_flow } = props.data

        return (
            <div style={{ color: getFlowColor(impressions_flow) }} >{props.value} </div>
        )
    }
    const CPCCellComponent = (props) => {
        const { cpc_flow
        } = props.data
        //  console.log(props.data)
        return (
            <div style={{ color: getFlowColor(cpc_flow) }} >₹{props.value} </div>
        )
    }

    const CTRCellComponent = (props) => {
        const { ctr_flow } = props.data
        //  console.log(props.data)
        return (
            <div style={{ color: getFlowColor(ctr_flow) }} >{props.value}% </div>
        )
    }

    const ClicksCellComponent = (props) => {
        const { clicks_flow } = props.data
        //  console.log(props.data)
        return (
            <div style={{ color: getFlowColor(clicks_flow) }} >{props.value} </div>
        )
    }

    const headerArray = [
        { headerName: "Category", field: 'category', width: 200, resizable: true },
        { headerName: "Sales", field: 'yesterdays_sales', cellComponent: SalesCellComponent, width: 100, resizable: true },
        { headerName: "L7D sales", field: 'from_day_before_yesterday_pre_seven_days_avg_sales', width: 100, resizable: true },
        { headerName: "ACOS", field: "yesterdays_acos", cellComponent: AcosCellComponent, width: 80, resizable: true },
        { headerName: "L7D ACOS", field: "from_day_before_yesterday_pre_seven_days_avg_acos", width: 100, resizable: true },
        { headerName: "Cost", field: "yesterdays_cost", cellComponent: CostCellComponent, width: 100, resizable: true },
        { headerName: "L7D cost", field: "from_day_before_yesterday_pre_seven_days_avg_cost", width: 120, resizable: true },
        { headerName: "Imp.", field: "yesterdays_impressions", cellComponent: ImpressionsCellComponent, width: 80, resizable: true },
        { headerName: "L7D Imp.", field: "from_day_before_yesterday_pre_seven_days_avg_impressions", width: 100, resizable: true },
        { headerName: "CPC", field: "yesterdays_cpc", cellComponent: CPCCellComponent, width: 80, resizable: true },
        { headerName: "L7D CPC", field: "from_day_before_yesterday_pre_seven_days_avg_cpc", width: 100, resizable: true },
        { headerName: "CTR", field: "yesterdays_ctr", cellComponent: CTRCellComponent, width: 80, resizable: true },
        { headerName: "L7D CTR", field: "from_day_before_yesterday_pre_seven_days_avg_ctr", width: 100, resizable: true },
        { headerName: "Clicks", field: "yesterdays_clicks", cellComponent: ClicksCellComponent, width: 100, resizable: true },
        { headerName: "L7D Clicks", field: "from_day_before_yesterday_pre_seven_days_avg_clicks", width: 120, resizable: true },

        // { field: "L7DImp" },
        // { field: "CPC" },
        // { field: "L7Dcpc" },
        // { field: "CTR" },
        // { field: "L7Dctr" },
        // { field: "Clicks" },
        // { field: "L7Dclic" }
    ]
    const firstChildHeaderArray = [
        { headerName: "ASIN", field: 'ad_asin', width: 200, resizable: true },
        { headerName: "Sales", field: 'yesterdays_sales', cellComponent: SalesCellComponent, width: 100, resizable: true },
        { headerName: "L7D sales", field: 'from_day_before_yesterday_pre_seven_days_avg_sales', width: 100, resizable: true },
        { headerName: "ACOS", field: "yesterdays_acos", cellComponent: AcosCellComponent, width: 80, resizable: true },
        { headerName: "L7D ACOS", field: "from_day_before_yesterday_pre_seven_days_avg_acos", width: 100, resizable: true },
        { headerName: "Cost", field: "yesterdays_cost", cellComponent: CostCellComponent, width: 100, resizable: true },
        { headerName: "L7D cost", field: "from_day_before_yesterday_pre_seven_days_avg_cost", width: 120, resizable: true },
        { headerName: "Imp.", field: "yesterdays_impressions", cellComponent: ImpressionsCellComponent, width: 80, resizable: true },
        { headerName: "L7D Imp.", field: "from_day_before_yesterday_pre_seven_days_avg_impressions", width: 100, resizable: true },
        { headerName: "CPC", field: "yesterdays_cpc", cellComponent: CPCCellComponent, width: 80, resizable: true },
        { headerName: "L7D CPC", field: "from_day_before_yesterday_pre_seven_days_avg_cpc", width: 100, resizable: true },
        { headerName: "CTR", field: "yesterdays_ctr", cellComponent: CTRCellComponent, width: 80, resizable: true },
        { headerName: "L7D CTR", field: "from_day_before_yesterday_pre_seven_days_avg_ctr", width: 100, resizable: true },
        { headerName: "Clicks", field: "yesterdays_clicks", cellComponent: ClicksCellComponent, width: 100, resizable: true },
        { headerName: "L7D Clicks", field: "from_day_before_yesterday_pre_seven_days_avg_clicks", width: 120, resizable: true },

        // { field: "L7DImp" },
        // { field: "CPC" },
        // { field: "L7Dcpc" },
        // { field: "CTR" },
        // { field: "L7Dctr" },
        // { field: "Clicks" },
        // { field: "L7Dclic" }
    ]

    return (

        <Grid
            accordianBodyHeight={280}
            rowArray={category_table_data_array}
            headerArray={headerArray}
            rowHeight={30}
            headerHeight={30}
            firstChileConfig={{
                accordianBodyHeight: 200,
                headerArray: firstChildHeaderArray,
                field: "asin",
            }}
        />

    );
}

export default CategoryTableComponent;