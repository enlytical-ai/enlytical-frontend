import { useState } from "react";

import "./Tile.css";
const Tiles = (props) => {
    const { tile, tileGraphIconClicked } = props;
    return (
        <div className="tileAndIconContainer" >
            <div
                className={props.clicked ? "tileClicked tileContainer" : "tileContainer"}
                onClick={() => props.tileClickedFn(tile.name)}
            >
                <p className="tileRow_1" >{`${tile.name}`.toUpperCase()}</p>
                <p className={tile.flow === "positive" ? "positive tileRow_2" : (tile.flow === "negative" ? "negative tileRow_2" : "zero tileRow_2")} >
                    {tile.name === "sales" && "₹"}
                    {tile.name === "cost" && "₹"}
                    {tile.yesterdays}
                    {tile.name === "acos" && "%"}
                    {tile.name === "cpc" && "%"}
                    {tile.name === "ctr" && "%"}
                    {tile.flow === "positive" && <i className="bi bi-arrow-up-short"></i>}
                    {tile.flow === "negative" && <i className="bi bi-arrow-down-short"></i>}
                    {tile.flow === "zero" && <i className="bi bi-dash"></i>}
                </p>
                <p className="tileRow_3"  >L7D Avg: {tile.from_day_before_yesterday_pre_seven_days_avg}</p>
                <p className="tileRow_4" >({tile.percentage_change}%)</p>
            </div>
            <div className={tileGraphIconClicked === tile.name ? "tileGraphIconContainer graphIconClicked" : "tileGraphIconContainer"}

            >
                {
                    tileGraphIconClicked === tile.name ? <i onClick={() => props.tileGraphIconClickedFn(null)} className="bi bi-bar-chart"></i> : <i onClick={() => props.tileGraphIconClickedFn(tile.name)} className="bi bi-bar-chart"></i>
                }
            </div>
        </div>
    )
}

export default Tiles;