import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CategoryTableComponent from "./ARComponents/CategoryTableComponent";
import CategoryAndASINOfTwoRangeTableComponent from "./ARComponents/CategoryAndASINOfTwoRangeTableComponent";
import TargetsTableComponent from "./ARComponents/TargetsTableComponent"
import Grid from "../../Grids/Grid"
import "./AdvertisingReportContainer.css"
import LineGraphComponent from "./ARComponents/LineGraphComponent";
import Tile from "./ARComponents/Tile";
import CategoryTile from "./ARComponents/CategoryTile";
import DateRangeSlider from "../../commonComponent/DateRangeSlider";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../appConstants";
import Loader from "./../../commonComponent/Loader/Loader";
const AdvertisingReportContainer = (props) => {
    const scollToRef = useRef();
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
    const [filter2, setFilter2] = useState([

        { name: "Sales", status: true },
        { name: "L7D Sales", status: true },
        { name: "ACOS", status: true },
        { name: "L7D ACOS", status: true },
        { name: "Cost", status: true },
        { name: "L7D Cost", status: true },
        { name: "Imp.", status: true },
        { name: "L7D Imp.", status: true },
        { name: "CPC", status: false },
        { name: "L7D CPC", status: false },
        { name: "CTR", status: false },
        { name: "L7D CTR", status: false },
        { name: "Clicks", status: false },
        { name: "L7D Clicks", status: false }
    ]);

    const [loader, setLoader] = useState({
        getTwoAreaDataToggle: false,
    })
    const [dateFilter, setDateFilter] = useState({
        start_date: null,
        end_date: null
    })
    const [graphDataType, setGraphDataType] = useState("daily");
    const [state, setState] = useState({
        tile_array: [],
        category_table_data_array: [],
        targets_table_data_array: [],
        category_and_ASIN_of_two_range: []

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
    const filterClicked2 = (e) => {
        const id = e.target.id;
        const newFilter = filter2.map(el => {
            return {
                name: el.name,
                status: id === el.name ? !el.status : el.status,
            }
        })
        setFilter2(newFilter);
        // setGraphDataType(`${id}`.toLowerCase())
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

    const graphAreaSelectFn = (e) => {
        const { startDateArray, endDateArray } = e;
        if (startDateArray.length === 2 && endDateArray.length === 2) {
            setLoader(prevState => ({ ...prevState, getTwoAreaDataToggle: true }));
            let campaign_type_array = [];
            filter.forEach(e => {
                if (e.status) {
                    campaign_type_array.push(e.name);
                }
            })
            if (campaign_type_array.length === 0) {
                campaign_type_array = ["sb", "sbvc", "sd", "sp"]
            }

            axios.post(`${BASE_URL}dashboard/advertisingReport/getCategoryAndASINOfTwoRange?brandId=${current_brand}`, {
                time_range_one: {
                    "start_time": `${startDateArray[0]}T00:00:00.000+00:00`,
                    "end_time": `${endDateArray[0]}T00:00:00.000+00:00`
                },
                time_range_two: {
                    "start_time": `${startDateArray[1]}T00:00:00.000+00:00`,
                    "end_time": `${endDateArray[1]}T00:00:00.000+00:00`
                },
                campaign_type_array,
                category_array: [

                ]
            }).then(function (response) {
                const { category_and_ASIN_of_two_range } = response.data.data;
                console.log("category_and_ASIN_of_two_range=>", category_and_ASIN_of_two_range);
                setState(prevState => ({ ...prevState, category_and_ASIN_of_two_range }));
                setLoader(prevState => ({ ...prevState, getTwoAreaDataToggle: false }));


            

            }).catch(function (error) {
                console.log(error);
                setLoader(prevState => ({ ...prevState, getTwoAreaDataToggle: false }));
            });
        } else {
            setState(prevState => ({ ...prevState, category_and_ASIN_of_two_range: [] }));
        }
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
                {
                    loader.getTwoAreaDataToggle && (
                        <div style={{ position: "absolute", display: "flex", width: "100%", justifyContent: "center", top: "30%" }} >
                            <Loader />
                        </div>
                    )

                }
                <LineGraphComponent
                    clickedTile={clickedTile}
                    filter={filter}
                    graphDataType={graphDataType}
                    tileGraphIconClicked={tileGraphIconClicked}
                    dateFilter={dateFilter}
                    graphAreaSelectFn={graphAreaSelectFn}
                />
            </div>
            {/* <div className="advertisingReportContainerRow_8" >
                <h3>Yesterdays Sales Category Wise.</h3>
                <div>
                    <CategoryTile />
                </div>
            </div> */}

            {/* Grid */}
            {/* <div className="advertisingReportContainerRow_8" >
                <div className="row_8Filter" >
                    {
                        filter2.map((e) => {
                            return (
                                <p
                                    className={e.status ? "filterClicked2 filter2" : "filter2"}
                                    style={{ width: "60px", fontSize: "12px" }}
                                    key={e.name}
                                    id={e.name}
                                    onClick={filterClicked2}
                                >{e.name}</p>
                            )
                        })
                    }

                </div>
            </div> */}
            <div  className="advertisingReportContainerRow_6" >
                <h1>Percentage Difference</h1>
                {
                    // state.category_table_data_array.length ? <CategoryTableComponent filter2={filter2} category_table_data_array={state.category_table_data_array} /> : <p>Loading...</p>
                    (state.category_and_ASIN_of_two_range.length > 0) && <CategoryAndASINOfTwoRangeTableComponent category_and_ASIN_of_two_range={state.category_and_ASIN_of_two_range} />

                }

            </div>

            <div  className="advertisingReportContainerRow_7" >
                {/* {
                    state.targets_table_data_array.length ? <>
                        <h3>Targets</h3>
                        <TargetsTableComponent targets_table_data_array={state.targets_table_data_array} />
                    </> : <p>Loading...</p>
                } */}
            </div>

        </div>
    )
}

export default AdvertisingReportContainer;