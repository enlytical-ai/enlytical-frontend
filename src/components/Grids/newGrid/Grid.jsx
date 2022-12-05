
import { useEffect } from "react";
import { useState } from "react";
import "./Grid.css"
const Grid = props => {
    const {
        //headerArray,
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
        gridRowSelectedColour
    } = props;
    const [headerArray, setHeaderArray] = useState([]);



    useEffect(() => {
        let rootEl = document.querySelector(":root");
        if (gridHeaderBackgroundColour) rootEl.style.setProperty("--gbysp_grid_header_background_colour", gridHeaderBackgroundColour);
        if (borderColour) rootEl.style.setProperty("--gbysp_border_colour", borderColour);
        if (rowBorderBottomColour) rootEl.style.setProperty("--gbysp_row_border_bottom_colour", rowBorderBottomColour);
        if (gridRowHoverColour) rootEl.style.setProperty("--gbysp_grid_row_hover_colour", gridRowHoverColour);
        if (gridRowElementHoverColour) rootEl.style.setProperty("--gbysp_grid_row_element_hover_colour", gridRowElementHoverColour);
        if (gridRowSelectedColour) rootEl.style.setProperty("--gbysp_grid_row_selected_colour", gridRowSelectedColour);
        const { headerArray } = props;
        if (headerArray) {
            const arr = headerArray.map((h, i) => {
                return {
                    ...h,
                    id: i
                }
            });
            setHeaderArray(arr);
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

    const scrollRow = e => {
        const el = e.target;
        const herdar = document.getElementById("gbysp_grid_header_body");
        console.log(el.scrollLeft);
        herdar.scrollTo(el.scrollLeft, 0)
        if (el.scrollHeight !== el.clientHeight) {
            herdar.style.paddingRight = "17px";
        }
    }

    const scrollHeader = e => {
        const el = e.target;
        const row = document.getElementById("gbysp_grid_row_body");
        row.scrollTo(el.scrollLeft, 0);
    }

    const reSizeHeaderElement = (e, id) => {
        const el = document.getElementsByClassName(`gbysp_grid_header_and_row_with_${id}`);
        const hEl = document.getElementById(`gbysp_grid_header_with_${id}`)
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        var prevX = e.clientX;
        var prevL = hEl.getBoundingClientRect().width;
        function mousemove(e) {
            var newX = e.clientX - prevX;
            var totalL = newX + prevL - 10;
            if (totalL > 50) {
                for (let i = 0; i < el.length; i++) {
                    el[i].style.setProperty("width", `${totalL}px`);
                }
                // el.style.setProperty("width", `${totalL}px`)
            }


        }

        function mouseup(e) {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
        }
    }

    return (
        <div className="gbysp_grid_container" style={{ height: tableHeight ? tableHeight - 2 : 400 }} >
            <div className="gbysp_grid_header_body" id="gbysp_grid_header_body" style={{ height: headerHeight ? headerHeight - 1 : 29 }} onScroll={(e) => scrollHeader(e)} >
                <div className="gbysp_grid_header" id="gbysp_grid_header" >
                    {
                        checkBox && (
                            <div className="gbysp_checkbox_container" key={0} >
                                <input type="checkbox" onChange={(e) => checkBoxClicked(e.target.checked, "all")} checked={s}   ></input>
                            </div>
                        )
                    }
                    {
                        headerArray.length > 0 && headerArray.map((header, i) => {
                            return (
                                <div key={i + 1} style={{ width: header.width }} id={`gbysp_grid_header_with_${header.id}`} className={`gbysp_grid_header_element gbysp_grid_header_and_row_with_${header.id}`} >
                                    <div className="gbysp_grid_header_element_one">
                                        {header.headerName}
                                    </div>
                                    <div onMouseDown={(e) => reSizeHeaderElement(e, header.id)} className="gbysp_grid_header_element_two" >

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="gbysp_grid_row_body" id="gbysp_grid_row_body" onScroll={(e) => scrollRow(e)} >
                {
                    rowArray.length > 0 && rowArray.map((row, i) => {
                        const dataObj = { ...row };
                        delete dataObj.cellComponent;
                        return (
                            <div
                                style={{ height: rowHeight ? rowHeight - 1 : 29 }}
                                key={i}
                                className={`${checkBox && dataObj[checkBox.field] ? "gbysp_grid_row_selected_colour" : ""} gbysp_grid_row`}
                                onClick={() => rowClicked ? rowClicked(dataObj) : ""}
                            >
                                {
                                    checkBox && (
                                        <div className="gbysp_checkbox_container" >
                                            <input type="checkbox" onChange={(e) => checkBoxClicked(e.target.checked, dataObj)} checked={dataObj[checkBox.field]}   ></input>
                                        </div>
                                    )
                                }
                                {
                                    headerArray.length > 0 && headerArray.map((header, i) => {
                                        return (
                                            <div key={i} style={{ width: header.width }} className={`gbysp_grid_row_element gbysp_grid_header_and_row_with_${header.id}`} >
                                                {
                                                    header.cellComponent ? <header.cellComponent value={row[header.field]} data={dataObj} /> : row[header.field]
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Grid;