import { useState, useEffect } from "react";
import axios from "axios";
import CategoryTableComponent from "./ARComponents/CategoryTableComponent";
import TargetsTableComponent from "./ARComponents/TargetsTableComponent"
import Grid from "../../Grids/Grid"
import "./AdvertisingReportContainer.css"
import LineGraphComponent from "./ARComponents/LineGraphComponent";
import Tile from "./ARComponents/Tile";
import CategoryTile from "./ARComponents/CategoryTile";
import DateRangeSlider from "../../commonComponent/DateRangeSlider";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../appConstants";
const AdvertisingReportContainer = (props) => {
    const appParams = useSelector(state => state.appParams);
    const { current_brand } = appParams;
    const [filter, setFilter] = useState([
        { name: "sb", status: false },
        { name: "sbvc", status: false },
        { name: "sd", status: false },
        { name: "sp", status: false }
    ]);
    const [filter1, setFilter1] = useState([
        { name: "Daily", status: true },
        { name: "Weekly", status: false },
        { name: "Monthly", status: false },
    ]);
    const [dateFilter, setDateFilter] = useState({
        start_date: null,
        end_date: null
    })
    const [graphDataType, setGraphDataType] = useState("daily");
    const [state, setState] = useState({
        tile_array: [],
        category_table_data_array: [],
        targets_table_data_array: []

    })
    const [clickedTile, setClickedTile] = useState(["sales"]);
    const [tileGraphIconClicked, setTileGraphIconClicked] = useState();
    const [lineGraphErrorToggle, setLineGraphErrorToggle] = useState(false);
    useEffect(() => {
        let campaign_type_array = [];
        filter.forEach(e => {
            if (e.status) {
                campaign_type_array.push(e.name);
            }
        })
        if (campaign_type_array.length === 0) {
            campaign_type_array = ["sb", "sbvc", "sd", "sp"]
        }
        axios.post(`${BASE_URL}dashboard/advertisingReport/getTileData?brandId=${current_brand}`, {
            time_stamp: "2022-11-20T00:00:00.000+00:00",
            campaign_type_array
        }).then(function (response) {
            const { tile_array } = response.data.data;
            console.log("tile_array=>", tile_array)
            setState(prevState => ({ ...prevState, tile_array }))
        }).catch(function (error) {
            console.log(error);
        });

        axios.post(`${BASE_URL}dashboard/advertisingReport/getCategoryTableData?brandId=${current_brand}`, {
            time_stamp: "2022-11-20T00:00:00.000+00:00",
            campaign_type_array,
            category_array: [
                "Coffee Maker",
                "Cold Brew",
                "Cold Coffee",
                "Filter coffee",
                "Ground Coffee",
                "Hampers & Gourmet Gifts",
                "Hot Brew",
                "Instant Coffee",
                "Roasted coffee beans"
            ]
        }).then(function (response) {
            const { category_table_data_array } = response.data.data;
            console.log("category_table_data_array=>", category_table_data_array)
            setState(prevState => ({ ...prevState, category_table_data_array }))
        }).catch(function (error) {
            console.log(error);
        });
        axios.post(`${BASE_URL}dashboard/advertisingReport/getTargetsTableData?brandId=${current_brand}`, {
            time_stamp: "2022-07-31T00:00:00.000+00:00",
            campaign_type_array,
            category_array: [
                "Coffee Maker",
                "Cold Brew",
                "Cold Coffee",
                "Filter coffee",
                "Ground Coffee",
                "Hampers & Gourmet Gifts",
                "Hot Brew",
                "Instant Coffee",
                "Roasted coffee beans"
            ]
        }).then(function (response) {
            const { targets_table_data_array } = response.data.data;
            console.log("targets_table_data_array=>", targets_table_data_array)
            setState(prevState => ({ ...prevState, targets_table_data_array }))
        }).catch(function (error) {
            console.log(error);
        });


    }, [filter])


    const filterClicked = (e) => {
        const id = e.target.id;
        const newFilter = filter.map(el => {
            return {
                name: el.name,
                status: id === el.name ? !el.status : el.status,
            }
        })
        setFilter(newFilter);
    }
    const filterClicked1 = (e) => {
        const id = e.target.id;
        const newFilter = filter1.map(el => {
            return {
                name: el.name,
                status: id === el.name ? true : false,
            }
        })
        setFilter1(newFilter);
        setGraphDataType(`${id}`.toLowerCase())
    }


    const tileClickedFn = (id) => {
        const arr = [...clickedTile];
        const index = arr.indexOf(id);

        if (index === -1) {
            if (arr.length < 2) {
                arr.push(id);
            } else {
                setLineGraphErrorToggle(true);
                setTimeout(() => {
                    setLineGraphErrorToggle(false);
                }, 2000)
            }
        } else {
            arr.splice(index, 1);
        }
        setClickedTile(arr);


    }

    const tileGraphIconClickedFn = (id) => {
        setTileGraphIconClicked(id);
    }
    let timeOut;
    const getSelectedStartEndDate = (startDate, endDate) => {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            console.log(startDate, endDate)
            setDateFilter({
                start_date: startDate,
                end_date: endDate
            })
        }, 1000)
    }

    return (
        <div className="advertisingReportContainer" >
            <div className="advertisingReportContainerRow_1" >
                <h1>Advertising Report</h1>
            </div>
            <div className="advertisingReportContainerRow_2" >
                <div className="row_2Filter" >
                    {
                        filter.map((e) => {
                            return (
                                <p
                                    className={e.status ? "filterClicked filter" : "filter"}
                                    key={e.name}
                                    id={e.name}
                                    onClick={filterClicked}
                                >{e.name}</p>
                            )
                        })
                    }

                </div>
                <div>
                    <DateRangeSlider
                        startDate={"2022-11-05T00:00:00.000+00:00"}
                        endDate={"2022-11-25T00:00:00.000+00:00"}
                        getSelectedStartEndDate={getSelectedStartEndDate}
                    />
                </div>
            </div>
            <div className="advertisingReportContainerRow_3" >
                {
                    state.tile_array.length ? state.tile_array.map(tile => {
                        let obj
                        const status = clickedTile.includes(tile.name);
                        return <Tile
                            clicked={status}
                            tileClickedFn={tileClickedFn}
                            tileGraphIconClickedFn={tileGraphIconClickedFn}
                            tileGraphIconClicked={tileGraphIconClicked}
                            key={tile.name}
                            tile={tile}
                        />
                    }) : <p>Loading...</p>
                }

            </div>
            {/* Graph */}
            <div className="advertisingReportContainerRow_4" >
                <div className="row_4Filter" >
                    {
                        filter1.map((e) => {
                            return (
                                <p
                                    className={e.status ? "filterClicked filter" : "filter"}
                                    key={e.name}
                                    id={e.name}
                                    onClick={filterClicked1}
                                >{e.name}</p>
                            )
                        })
                    }

                </div>
            </div>
            <div className="advertisingReportContainerRow_5" >
                {
                    lineGraphErrorToggle && <div className="lineGraphComponentError"  >   <p>You cannot select more than two data sets.</p></div>
                }
                <LineGraphComponent
                    clickedTile={clickedTile}
                    filter={filter}
                    graphDataType={graphDataType}
                    tileGraphIconClicked={tileGraphIconClicked}
                    dateFilter={dateFilter}
                />
            </div>
            {/* <div className="advertisingReportContainerRow_8" >
                <h3>Yesterdays Sales Category Wise.</h3>
                <div>
                    <CategoryTile />
                </div>
            </div> */}

            {/* Grid */}
            <div className="advertisingReportContainerRow_6" >
                {
                    state.category_table_data_array.length ? <CategoryTableComponent category_table_data_array={state.category_table_data_array} /> : <p>Loading...</p>
                }
            </div>
            <div className="advertisingReportContainerRow_7" >

                {
                    state.targets_table_data_array.length ? <>
                        <h3>Targets</h3>
                        <TargetsTableComponent targets_table_data_array={state.targets_table_data_array} />
                    </> : <p>Loading...</p>
                }
            </div>

        </div>
    )
}

export default AdvertisingReportContainer;