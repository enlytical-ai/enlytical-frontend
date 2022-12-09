import { useEffect } from "react"
import axios from "axios"
import LineGraph from "../../../graphs/LineGraph"
import { useState } from "react"
import { BASE_URL } from "../../../../appConstants"
import { useSelector } from "react-redux";
const LineGraphComponent = (props) => {
    const appParams = useSelector(state => state.appParams);
    const { current_brand } = appParams;
    const { filter, graphDataType, tileGraphIconClicked, clickedTile, dateFilter } = props;
    const [state, setState] = useState({
        labels: [],
        sales: [],
        cost: [],
        acos: [],
        clicks: [],
        cpc: [],
        impressions: [],
        ctr: []
    })

    useEffect(() => {
        const { start_date, end_date } = dateFilter;
        let campaign_type_array = [];
        filter.forEach(e => {
            if (e.status) {
                campaign_type_array.push(e.name);
            }
        })
        if (campaign_type_array.length === 0) {
            campaign_type_array = ["sb", "sbvc", "sd", "sp"]
        }
        axios.post(`${BASE_URL}dashboard/advertisingReport/getGraphData?brandId=${current_brand}`, {
            start_date,
            end_date,
            campaign_type_array,
            graph_data_type: graphDataType
        }).then(function (response) {
            const { graph_data_array, graph_data_type } = response.data.data;
            const labelsArray = [];
            const salesArray = [];
            const costArray = [];
            const acosArray = [];
            const ordersArray = [];
            const clicksArray = [];
            const cpcArray = [];
            const impressionsArray = [];
            const ctrArray = [];
            if (graph_data_array.length > 0) {
                graph_data_array.forEach(e => {
                    const { time_stamp,
                        sales,
                        cost,
                        acos,
                        orders,
                        clicks,
                        cpc,
                        impressions,
                        ctr
                    } = e;
                    labelsArray.push(time_stamp.split("T")[0]);
                    salesArray.push(`${sales}`);
                    costArray.push(cost);
                    acosArray.push(acos);
                    ordersArray.push(orders);
                    clicksArray.push(clicks);
                    cpcArray.push(cpc);
                    impressionsArray.push(impressions);
                    ctrArray.push(ctr)
                })
            }
            setState(prevState => ({
                ...prevState,
                graph_data_type,
                labels: labelsArray,
                sales: salesArray,
                cost: costArray,
                acos: acosArray,
                orders: ordersArray,
                clicks: clicksArray,
                cpc: cpcArray,
                impressions: impressionsArray,
                ctr: ctrArray
            }))
        }).catch(function (error) {
            console.log(error);
        });
    }, [filter, graphDataType, dateFilter])

    // const { clickedTile } = props;
    // let clicked_tile_array = [];
    // clickedTile.forEach(e => {
    //     if (e.status) {
    //         clicked_tile_array.push(e.name);
    //     }
    // })
    // if (clicked_tile_array.length === 0) {
    //     clicked_tile_array = ["sales", "cost", "acos", "orders", "clicks", "cpc", "impressions", "ctr"]
    // }
    const getSunSatColorBackground = (index, defaultColor) => {
        const time_stamp = state.labels[index];
        if (state.graph_data_type === "daily") {
            const day = new Date(`${time_stamp}T00:00:00.000+00:00`).getDay();
            if (day === 0) return "rgba(255,140,0,0.5)";//orange sunday
            if (day === 6) return "rgba(255,255,0,0.5)";//yellow saturday
            return defaultColor
        } else {
            return defaultColor
        }
    }

    const getSunSatColorBorder = (index, defaultColor) => {
        const time_stamp = state.labels[index];
        if (state.graph_data_type === "daily") {
            const day = new Date(`${time_stamp}T00:00:00.000+00:00`).getDay();
            if (day === 0) return "rgba(255,140,0,1)";//orange sunday
            if (day === 6) return "rgba(255,255,0,1)";//yellow saturday
            return defaultColor
        } else {
            return defaultColor
        }
    }


    const graphDatasets = [
        {
            label: 'Sales',
            data: state.sales,
            // borderColor: 'rgba(255, 99, 132, 1)',
            borderColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "sales" ? getSunSatColorBorder(index, 'rgba(255, 99, 132, 1)') : 'rgba(255, 99, 132, 1)';
            },
            //  backgroundColor: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "sales" ? getSunSatColorBackground(index, 'rgba(255, 99, 132, 0.2)') : 'rgba(255, 99, 132, 0.2)';
            },
            axesColor: 'rgba(255, 99, 132, 1)'

        },
        {
            label: 'cost',
            data: state.cost,
            // borderColor: 'rgba(54, 162, 235, 1)',
            borderColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "cost" ? getSunSatColorBorder(index, 'rgba(54, 162, 235, 1)') : 'rgba(54, 162, 235, 1)';
            },
            // backgroundColor: 'rgba(54, 162, 235, 0.2)',
            backgroundColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "cost" ? getSunSatColorBackground(index, 'rgba(54, 162, 235, 0.2)') : 'rgba(54, 162, 235, 0.2)';
            },
            axesColor: "rgba(54, 162, 235, 1)"

        },
        {
            label: 'ACOS',
            data: state.acos,
            // borderColor: 'rgba(255, 206, 86, 1)',
            borderColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "acos" ? getSunSatColorBorder(index, 'rgba(255, 206, 86, 1)') : 'rgba(255, 206, 86, 1)';
            },
            // backgroundColor: 'rgba(255, 206, 86, 0.2)',
            backgroundColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "acos" ? getSunSatColorBackground(index, 'rgba(255, 206, 86, 0.2)') : 'rgba(255, 206, 86, 0.2)';
            },
            axesColor: 'rgba(255, 206, 86, 1)'

        },
        {
            label: 'Orders',
            data: state.orders,
            // borderColor: 'rgba(75, 192, 192, 1)',
            borderColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "orders" ? getSunSatColorBorder(index, 'rgba(75, 192, 192, 1)') : 'rgba(75, 192, 192, 1)';
            },
            // backgroundColor: 'rgba(75, 192, 192, 0.2)',
            backgroundColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "orders" ? getSunSatColorBackground(index, 'rgba(75, 192, 192, 0.2)') : 'rgba(75, 192, 192, 0.2)';
            },
            axesColor: 'rgba(75, 192, 192, 0.2)'
        },
        {
            label: 'Clicks',
            data: state.clicks,
            // borderColor: 'rgba(153, 102, 255, 1)',
            borderColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "clicks" ? getSunSatColorBorder(index, 'rgba(153, 102, 255, 1)') : 'rgba(153, 102, 255, 1)';
            },
            // backgroundColor: 'rgba(153, 102, 255, 0.2)',
            backgroundColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "clicks" ? getSunSatColorBackground(index, 'rgba(153, 102, 255, 0.2)') : 'rgba(153, 102, 255, 0.2)';
            },
            axesColor: 'rgba(153, 102, 255, 0.2)'

        },
        {
            label: 'CPC',
            data: state.cpc,
            // borderColor: 'rgba(255,20,147, 1)',
            borderColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "cpc" ? getSunSatColorBorder(index, 'rgba(255,20,147, 1)') : 'rgba(255,20,147, 1)';
            },
            // backgroundColor: 'rgba(255,20,147, 0.2)',
            backgroundColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "cpc" ? getSunSatColorBackground(index, 'rgba(255,20,147, 0.2)') : 'rgba(255,20,147, 0.2)';
            },
            axesColor: 'rgba(255,20,147, 1)'
        },
        {
            label: 'Impressions',
            data: state.impressions,
            // borderColor: 'rgba(50,205,50, 1)',
            borderColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "impressions" ? getSunSatColorBorder(index, 'rgba(50,205,50, 1)') : 'rgba(50,205,50, 1)';
            },
            // backgroundColor: 'rgba(50,205,50, 0.2)',
            backgroundColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "impressions" ? getSunSatColorBackground(index, 'rgba(50,205,50, 0.2)') : 'rgba(50,205,50, 0.2)';
            },
            axesColor: 'rgba(50,205,50, 0.2)'
        },
        {
            label: 'CTR',
            data: state.ctr,
            //  borderColor: 'rgba(205,92,92, 1)',
            borderColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "ctr" ? getSunSatColorBorder(index, 'rgba(25,25,112, 1)') : 'rgba(25,25,112, 1)';
            },
            //  backgroundColor: 'rgba(205,92,92, 0.2)',
            backgroundColor: function (e) {
                const { index } = e;
                return tileGraphIconClicked === "ctr" ? getSunSatColorBackground(index, 'rgba(25,25,112, 0.2)') : 'rgba(25,25,112, 0.2)';
            },
            axesColor: 'rgba(25,25,112, 0.2)'
        }
    ]

    const data_sets = [];
    const yAxesArray = [{ axes: "y", color: null }, { axes: "y1", color: null }];
    let yAxesArrayIndex = 0;
    graphDatasets.forEach(e => {
        const status = clickedTile.includes(e.label.toLowerCase());
        if (e.label.toLowerCase() === tileGraphIconClicked) {
            e.type = "bar"
        } else {
            e.type = "line"
        }
        if (status) {
            e.yAxisID = yAxesArray[yAxesArrayIndex].axes;
            yAxesArray[yAxesArrayIndex].color = e.axesColor;
            delete e.axesColor;
            data_sets.push(e)
            yAxesArrayIndex += 1;
        }
    })


    const graphAreaSelectFn = (e) => {
        props.graphAreaSelectFn(e);
    }
    return (
        < LineGraph
            data={{
                labels: state.labels,
                datasets: data_sets,
            }}
            yAxesColor={yAxesArray[0].color}
            y1AxesColor={yAxesArray[1].color}
            graphDataType={graphDataType}
            graphAreaSelectFn={graphAreaSelectFn}
        />
    )
}
export default LineGraphComponent