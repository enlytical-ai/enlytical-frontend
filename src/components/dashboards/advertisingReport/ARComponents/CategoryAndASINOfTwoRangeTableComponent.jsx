
import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo } from "react";
import { getFlowColor } from "../../../../commonFunction/commomFunction";
import Grid from "../../../Grids/newGrid/MasterGrid";
import { useEffect } from "react";
const CategoryTableComponent = (props) => {
    const { category_and_ASIN_of_two_range, filter2 } = props;



    //Table Cell Component
    const SalesCellComponent = (props) => {
        const { sales_flow, range_one_sales, range_two_sales } = props.data
        //  console.log(props.data)
        return (
            <abbr title={`T1 Sales ${range_one_sales} - T2 Sales ${range_two_sales}`} style={{ color: getFlowColor(sales_flow), overflow: "hidden", whiteSpace: "nowrap", textDecoration: "none", width: "100%" }} >{props.value}%</abbr>
        )
    }

    const AcosCellComponent = (props) => {
        const { acos_flow, range_one_acos, range_two_acos } = props.data
        return (
            <abbr title={`T1 ACOS ${range_one_acos} - T2 ACOS ${range_two_acos}`} style={{ color: getFlowColor(acos_flow), overflow: "hidden", whiteSpace: "nowrap", textDecoration: "none", width: "100%" }} >{props.value}%</abbr>
        )
    }
    const CostCellComponent = (props) => {
        const { cost_flow, range_one_cost, range_two_cost } = props.data

        return (
            <abbr title={`T1 Cost ${range_one_cost} - T2 Cost ${range_two_cost}`} style={{ color: getFlowColor(cost_flow), overflow: "hidden", whiteSpace: "nowrap", textDecoration: "none", width: "100%" }} >{props.value}%</abbr>

        )
    }
    const ImpressionsCellComponent = (props) => {
        const { impressions_flow, range_one_impressions, range_two_impressions } = props.data

        return (
            <abbr title={`T1 Impressions${range_one_impressions} - T2 Impressions${range_two_impressions}`} style={{ color: getFlowColor(impressions_flow), overflow: "hidden", whiteSpace: "nowrap", textDecoration: "none", width: "100%" }} >{props.value}%</abbr>
        )
    }
    const CPCCellComponent = (props) => {
        const { cpc_flow,
            range_one_cpc,
            range_two_cpc
        } = props.data
        //  console.log(props.data)
        return (

            <abbr title={`T1 CPC ${range_one_cpc} - T2 CPC ${range_one_cpc}`} style={{ color: getFlowColor(cpc_flow), overflow: "hidden", whiteSpace: "nowrap", textDecoration: "none", width: "100%" }} >{props.value}%</abbr>

        )
    }

    const CTRCellComponent = (props) => {
        const { ctr_flow, range_one_ctr, range_two_ctr } = props.data
        //  console.log(props.data)
        return (
            <abbr title={`T1 CTR ${range_one_ctr} - T2 CTR${range_two_ctr}`} style={{ color: getFlowColor(ctr_flow), overflow: "hidden", whiteSpace: "nowrap", textDecoration: "none", width: "100%" }} >{props.value}%</abbr>

        )
    }

    const ClicksCellComponent = (props) => {
        const { clicks_flow, range_one_clicks, range_two_clicks } = props.data
        //  console.log(props.data)
        return (
            <abbr title={`T1 Clicks ${range_one_clicks} - T2 Clicks${range_two_clicks}`} style={{ color: getFlowColor(clicks_flow), overflow: "hidden", whiteSpace: "nowrap", textDecoration: "none", width: "100%" }} >{props.value}%</abbr>

        )
    }

    const MHeaderArray = [
        { headerName: "Category", field: 'category', width: 200 },
        { headerName: "Sales % diff", field: 'sales_percentage_change', cellComponent: SalesCellComponent, width: 156 },
        { headerName: "ACOS % diff", field: "acos_percentage_change", cellComponent: AcosCellComponent, width: 136 },
        { headerName: "Cost % diff", field: "cost_percentage_change", cellComponent: CostCellComponent, width: 156 },
        { headerName: "Imp. % diff", field: "impressions_percentage_change", cellComponent: ImpressionsCellComponent, width: 136 },
        { headerName: "CPC % diff", field: "cpc_percentage_change", cellComponent: CPCCellComponent, width: 136 },
        { headerName: "CTR % diff", field: "ctr_percentage_change", cellComponent: CTRCellComponent, width: 136 },
        { headerName: "Clicks % diff", field: "clicks_percentage_change", cellComponent: ClicksCellComponent, width: 156 },
    ]
    const FCHeaderArray = [
        { headerName: "ASIN", field: 'ad_asin', width: 200 },
        { headerName: "Sales % diff", field: 'sales_percentage_change', cellComponent: SalesCellComponent, width: 156 },
        { headerName: "ACOS % diff", field: "acos_percentage_change", cellComponent: AcosCellComponent, width: 136 },
        { headerName: "Cost % diff", field: "cost_percentage_change", cellComponent: CostCellComponent, width: 156 },
        { headerName: "Imp. % diff", field: "impressions_percentage_change", cellComponent: ImpressionsCellComponent, width: 136 },
        { headerName: "CPC % diff", field: "cpc_percentage_change", cellComponent: CPCCellComponent, width: 136 },
        { headerName: "CTR % diff", field: "ctr_percentage_change", cellComponent: CTRCellComponent, width: 136 },
        { headerName: "Clicks % diff", field: "clicks_percentage_change", cellComponent: ClicksCellComponent, width: 156 },
    ]


    return (

        <Grid
            accordianBodyHeight={280}
            rowArray={category_and_ASIN_of_two_range}
            headerArray={MHeaderArray}
            rowHeight={30}
            headerHeight={30}
            tableHeight={440}
            firstChileConfig={{
                accordianBodyHeight: 240,
                headerArray: FCHeaderArray,
                field: "asin",
            }}
        />

    );
}

export default CategoryTableComponent;