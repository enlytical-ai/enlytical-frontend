
import { useEffect } from "react";
import { useState } from "react";
import Accordian2 from "./accordian/Accordian2";
import "./ChildOfMasterGrid.css"

const Grid = props => {
    const {
        headerArray,
        rowArray,
        tableHeight,
        headerHeight,
        rowHeight,
        rowClicked,
        checkBox,
        checkBoxClicked,
        gridHeaderBackgroundColour,
        borderColour,
        rowBorderBottomColour,
        gridRowHoverColour,
        gridRowElementHoverColour,
        gridRowSelectedColour,
        secondChileConfig,
        firstChileConfig
    } = props;
    useEffect(() => {
        let rootEl = document.querySelector(":root");
        if (gridHeaderBackgroundColour) rootEl.style.setProperty("--cofmgbysp_grid_header_background_colour", gridHeaderBackgroundColour);
        if (borderColour) rootEl.style.setProperty("--cofmgbysp_border_colour", borderColour);
        if (rowBorderBottomColour) rootEl.style.setProperty("--cofmgbysp_row_border_bottom_colour", rowBorderBottomColour);
        if (gridRowHoverColour) rootEl.style.setProperty("--cofmgbysp_grid_row_hover_colour", gridRowHoverColour);
        if (gridRowElementHoverColour) rootEl.style.setProperty("--cofmgbysp_grid_row_element_hover_colour", gridRowElementHoverColour);
        if (gridRowSelectedColour) rootEl.style.setProperty("--cofmgbysp_grid_row_selected_colour", gridRowSelectedColour);
    },[])
    let s = true;
    if (checkBox && checkBox.field) {
        for (let obj of rowArray) {
            const status = obj[checkBox.field];
            if (!status) {
                s = status;
            }
            if (!status) break;
        }
    }

    const scrollRowChild = e => {
        const el = e.target;
        const herdar = document.getElementById("cofmgbysp_grid_header_body");
        console.log(el.scrollLeft);
        herdar.scrollTo(el.scrollLeft, 0)
        if (el.scrollHeight !== el.clientHeight) {
            herdar.style.paddingRight = "17px";
        }
    }

    const scrollHeader = e => {
        const el = e.target;
        const row = document.getElementById("cofmgbysp_grid_row_body");
        row.scrollTo(el.scrollLeft, 0);
    }

    return (
        <div className="cofmgbysp_grid_container" style={{ height: tableHeight ? tableHeight - 2 : 400 }} >
            <div className="cofmgbysp_grid_header_body" id="cofmgbysp_grid_header_body" style={{ height: headerHeight ? headerHeight - 1 : 29 }} onScroll={(e) => scrollHeader(e)} >
                <div className="cofmgbysp_grid_header" id="cofmgbysp_grid_header" >
                    <div style={{ width: 26 }} >

                    </div>
                    {
                        checkBox && (
                            <div className="cofmgbysp_checkbox_container" key={0} >
                                <input type="checkbox" onChange={(e) => checkBoxClicked(e.target.checked, "all")} checked={s}   ></input>
                            </div>
                        )
                    }
                    {
                        headerArray.length > 0 && headerArray.map((header, i) => {
                            return (
                                <div key={i + 1} style={{ width: header.width }} className="cofmgbysp_grid_header_element" >
                                    {header.headerName}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="cofmgbysp_grid_row_body" id="cofmgbysp_grid_row_body" onScroll={(e) => scrollRowChild(e)} >
                {
                    rowArray.length > 0 && rowArray.map((row, i) => {
                        const dataObj = { ...row };
                        delete dataObj.cellComponent;
                        return (
                            <Accordian2
                                key={i}
                                accordianBodyHeight={firstChileConfig.accordianBodyHeight ? firstChileConfig.accordianBodyHeight : 400}
                                accordianHeaderComponent={() =>
                                    <div
                                        style={{ height: rowHeight ? rowHeight - 1 : 29 }}
                                        className={`${checkBox && dataObj[checkBox.field] ? "cofmgbysp_grid_row_selected" : ""} cofmgbysp_grid_row`}
                                        onClick={() => rowClicked ? rowClicked(dataObj) : ""}
                                    >
                                        {
                                            checkBox && (
                                                <div className="cofmgbysp_checkbox_container" >
                                                    <input type="checkbox" onChange={(e) => checkBoxClicked(e.target.checked, dataObj)} checked={dataObj[checkBox.field]}   ></input>
                                                </div>
                                            )
                                        }
                                        {
                                            headerArray.length > 0 && headerArray.map((header, i) => {
                                                return (
                                                    <div key={i} style={{ width: header.width }} className="cofmgbysp_grid_row_element" >
                                                        {
                                                            header.cellComponent ? <header.cellComponent value={row[header.field]} data={dataObj} /> : row[header.field]
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                accordianBodyComponent={() => {
                                    return (
                                        <div style={{ margin: 5 }} >
                                         
                                        </div>
                                    )
                                }}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Grid;