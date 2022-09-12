import { useState, useEffect } from "react";
import axios from "axios";
import CategoryTableComponent from "./ARComponents/CategoryTableComponent";
import "./AdvertisingReportContainer.css"
import LineGraphComponent from "./ARComponents/LineGraphComponent";
import Tile from "./ARComponents/Tile";
const AdvertisingReportContainer = (props) => {
    const [filter, setFilter] = useState([
        { name: "SB", status: false },
        { name: "SBVC", status: false },
        { name: "SD", status: false },
        { name: "SP", status: false }
    ]);
    const [filter1, setFilter1] = useState([
        { name: "Daily", status: true },
        { name: "Weekly", status: false },
        { name: "Monthly", status: false },
    ]);
    const [graphDataType, setGraphDataType] = useState("daily");
    const [state, setState] = useState({})
    const [clickedTile, setClickedTile] = useState([
        { name: "sales", status: false },
        { name: "cost", status: false },
        { name: "acos", status: false },
        { name: "orders", status: false },
        { name: "clicks", status: false },
        { name: "cpc", status: false },
        { name: "impressions", status: false },
        { name: "ctr", status: false }
    ])
    const [tileGraphIconClicked, setTileGraphIconClicked] = useState();
    useEffect(() => {
        let campaign_type_array = [];
        filter.forEach(e => {
            if (e.status) {
                campaign_type_array.push(e.name);
            }
        })
        if (campaign_type_array.length === 0) {
            campaign_type_array = ["SB", "SBVC", "SD", "SP"]
        }
        axios.post('http://localhost:5000/dashboard/advertisingReport/getTileData', {
            time_stamp: "2022-09-05T00:00:00.000+00:00",
            campaign_type_array
        }).then(function (response) {
            const { tile_array } = response.data.data;

            setState(prevState => ({ ...prevState, tile_array }))
        }).catch(function (error) {
            console.log(error);
        });

        axios.post('http://localhost:5000/dashboard/advertisingReport/getCategoryTableData', {
            time_stamp: "2022-09-05T00:00:00.000+00:00",
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
            const { category_tabel_data_array } = response.data.data;
            setState(prevState => ({ ...prevState, category_tabel_data_array }))
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


    const tileClicked = (id) => {
        const newFilter = clickedTile.map(el => {
            return {
                name: el.name,
                status: id === el.name ? !el.status : el.status,
            }
        })
        setClickedTile(newFilter);
    }

    const tileGraphIconClickedFn = (id) => {
        setTileGraphIconClicked(id);
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
                <div><input type="range" className="form-range" min="0" max="5" id="customRange2"></input></div>
            </div>
            <div className="advertisingReportContainerRow_3" >
                {
                    state.tile_array && state.tile_array.map(tile => {
                        let obj
                        clickedTile.forEach(e => {
                            if (e.name === tile.name) {
                                obj = e;
                            }
                        });
                        return <Tile
                            clicked={obj.status}
                            tileClicked={tileClicked}
                            tileGraphIconClickedFn={tileGraphIconClickedFn}
                            tileGraphIconClicked={tileGraphIconClicked}
                            key={tile.name}
                            tile={tile}
                        />
                    })
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
                <LineGraphComponent
                    clickedTile={clickedTile}
                    filter={filter}
                    graphDataType={graphDataType}
                    tileGraphIconClicked={tileGraphIconClicked}
                />
            </div>
            {/* Grid */}
            <div className="advertisingReportContainerRow_6" >
                <CategoryTableComponent category_tabel_data_array={state.category_tabel_data_array} />
            </div>

        </div>
    )
}

export default AdvertisingReportContainer;