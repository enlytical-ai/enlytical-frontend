import { useState } from "react";
import { useEffect } from "react";
import "./AccordianComponent.css"
const AccordianComponent = (props) => {


    const AccordianElement = (pro) => {

        const { headerArray, row, dataObj, sumOfAllColumnWidth, accordianBodyArray } = pro;
        const [accordianToggle, setAccordianToggle] = useState(null);

        const toggle = e => {
            if (accordianToggle === false) {
                setAccordianToggle(true)
            } else if (accordianToggle === true) {
                setAccordianToggle(false)
            } else if (accordianToggle === null) {
                setAccordianToggle(true)
            }

        }
        return (
            <div className="accordian_element"   >
                <div className="accordian_element_header" >
                    <div style={{ display: "flex", flex: 1, alignItems: "center" }} >
                        {
                            headerArray.length > 0 && headerArray.map(header => {

                                return (
                                    <div style={{ width: header.width, minWidth: header.minWidth }} className="table_row_element" >
                                        {
                                            header.cellComponent ? <header.cellComponent value={row[header.field]} data={dataObj} /> : row[header.field]
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="openCloseBtn" >
                        <div onClick={() => toggle()} >
                            {
                                accordianToggle ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div id="accordian_element_body" className={`${accordianToggle === true ? "accordian_element_body_open" : accordianToggle === false ? "accordian_element_body_close" : "accordian_element_body"}`} >

                    {
                        accordianBodyArray.length > 0 && accordianBodyArray.map(header => {
                            return (
                                <div className="table_row_element" >
                                    {
                                        <>
                                            <div style={{ marginRight: "4px", color: "#757575" }}  >{header.headerName}<span>{":"}</span></div>  <div>{header.cellComponent ? <header.cellComponent value={row[header.field]} data={dataObj} /> : row[header.field]}</div>
                                        </>
                                    }
                                </div>
                            )
                        })
                    }

                </div>
            </div >
        )
    }
    return (
        <div className="accordian_container" >
            <AccordianElement
                headerArray={props.headerArray}
                row={props.row}
                dataObj={props.dataObj}
                accordianBodyArray={props.accordianBodyArray}
            />
        </div>
    )
}

export default AccordianComponent;