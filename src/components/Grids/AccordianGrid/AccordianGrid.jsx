
import { useEffect } from "react";
import { useState } from "react";
import Accordian from "./accordian/Accordian";
import "./AccordianGrid.css"
const Grid = props => {
    const {
        headerArray,
        rowArray,
        accordianBodyArray,
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
        accordianBodyHeight,
    } = props;
    const [accordianWidth, setAccordianWidth] = useState();
    useEffect(() => {
        let rootEl = document.querySelector(":root");
        if (gridHeaderBackgroundColour) rootEl.style.setProperty("--agbysp_grid_header_background_colour", gridHeaderBackgroundColour);
        if (borderColour) rootEl.style.setProperty("--agbysp_border_colour", borderColour);
        if (rowBorderBottomColour) rootEl.style.setProperty("--agbysp_row_border_bottom_colour", rowBorderBottomColour);
        if (gridRowHoverColour) rootEl.style.setProperty("--agbysp_grid_row_hover_colour", gridRowHoverColour);
        if (gridRowElementHoverColour) rootEl.style.setProperty("--agbysp_grid_row_element_hover_colour", gridRowElementHoverColour);
        if (gridRowSelectedColour) rootEl.style.setProperty("--agbysp_grid_row_selected_colour", gridRowSelectedColour);
        if (headerArray) {
            let width = 26;
            for (let el of headerArray) {
                width += el.width
            }
            setAccordianWidth(width);
        }
    }, [])
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

    const scrollRowMaster = e => {
        const el = e.target;
        const herdar = document.getElementById("agbysp_grid_header_body");
        console.log(el.scrollLeft);
        herdar.scrollTo(el.scrollLeft, 0)
        if (el.scrollHeight !== el.clientHeight) {
            herdar.style.paddingRight = "17px";
        }
    }

    const scrollHeaderMaster = e => {
        const el = e.target;
        const row = document.getElementById("agbysp_grid_row_body");
        row.scrollTo(el.scrollLeft, 0);
    }

    return (
        <div className="agbysp_grid_container" style={{ height: tableHeight ? tableHeight - 2 : 400 }} >
            <div className="agbysp_grid_header_body" id="agbysp_grid_header_body" style={{ height: headerHeight ? headerHeight - 1 : 29 }} onScroll={(e) => scrollHeaderMaster(e)} >
                <div className="agbysp_grid_header" id="agbysp_grid_header" >
                    <div style={{ width: 16 }} >

                    </div>
                    {
                        checkBox && (
                            <div className="agbysp_checkbox_container" key={0} >
                                <input type="checkbox" onChange={(e) => checkBoxClicked(e.target.checked, "all")} checked={s}   ></input>
                            </div>
                        )
                    }
                    {
                        headerArray.length > 0 && headerArray.map((header, i) => {
                            return (
                                <div key={i + 1} style={{ width: header.width }} className="agbysp_grid_header_element" >
                                    {header.headerName}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="agbysp_grid_row_body" id="agbysp_grid_row_body" onScroll={(e) => scrollRowMaster(e)} >
                {
                    rowArray.length > 0 && rowArray.map((row, i) => {
                        const dataObj = { ...row };
                        delete dataObj.cellComponent;
                        return (
                            <Accordian
                                accordianWidth={accordianWidth}
                                accordianBodyHeight={accordianBodyHeight ? accordianBodyHeight : 400}
                                key={i}
                                accordianHeaderComponent={() =>
                                    <div
                                        style={{ height: rowHeight ? rowHeight - 1 : 29 }}
                                        className={`${checkBox && dataObj[checkBox.field] ? "agbysp_grid_row_selected" : ""} agbysp_grid_row`}
                                        onClick={() => rowClicked ? rowClicked(dataObj) : ""}
                                    >
                                        {
                                            checkBox && (
                                                <div className="agbysp_checkbox_container" >
                                                    <input type="checkbox" onChange={(e) => checkBoxClicked(e.target.checked, dataObj)} checked={dataObj[checkBox.field]}   ></input>
                                                </div>
                                            )
                                        }
                                        {
                                            headerArray.length > 0 && headerArray.map((header, i) => {
                                                return (
                                                    <div key={i} style={{ width: header.width }} className="agbysp_grid_row_element" >
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
                                        < div style={{
                                            border: "1px solid #9e9e9e",
                                            margin: "10px",
                                            borderRadius: "5px",
                                            display: "flex",
                                            alignItems: "center"
                                        }} >
                                            <div>
                                                {
                                                    accordianBodyArray.length > 0 ? accordianBodyArray.map(obj => {
                                                        return (<div style={{ margin: 10 }} >
                                                            <div><span><b>{obj.headerName}</b>: {row[obj.field]}</span></div>
                                                        </div>)
                                                    }) : ""
                                                }
                                            </div>
                                            <div>
                                                <img src={row.image_url} style={{ height: "180px" }} ></img>
                                            </div>

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