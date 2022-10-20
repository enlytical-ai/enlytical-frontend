// import { useCallback, useState } from "react";
// import "./GridAccordianComponent.css";
// import AccordianComponent from "../AccordianComponent/AccordianComponent";
// const GridAccordianComponent = (props) => {
//     const { headerArray, rowArray, tableHeight, tableMinHeight, tableMaxHeight, internalHorizontalScrollWidth, accordianBodyArray } = props;
//     let sumOfAllColumnWidth = 0;
//     let sumOfAllColumnMinWidth = 0;
//     let sumOfAllColumnMaxWidth = 0;
//     headerArray.map(h => {
//         sumOfAllColumnWidth = sumOfAllColumnWidth + h.width;
//         sumOfAllColumnMinWidth = sumOfAllColumnMinWidth + h.minWidth;
//         sumOfAllColumnMaxWidth = sumOfAllColumnMaxWidth + h.maxWidth;
//     })


//     return (
//         <div className="grid_component_container" >
//             <div className="grid_component" style={{ height: tableHeight, minHeight: tableMinHeight, maxHeight: tableMaxHeight }} >
//                 <div className="table_header_container" style={{ width: sumOfAllColumnWidth, minWidth: sumOfAllColumnMinWidth, maxWidth: sumOfAllColumnMaxWidth }} >

//                     {
//                         headerArray.length > 0 && headerArray.map(header => {
//                             return (<div key={header.headerName} style={{ width: header.width, minWidth: header.minWidth }} className="table_header_element" >
//                                 {header.headerName}
//                             </div>)
//                         })
//                     }
//                 </div>
//                 <div className="table_row_container" style={{ width: sumOfAllColumnWidth, minWidth: sumOfAllColumnMinWidth, maxWidth: sumOfAllColumnMaxWidth }}>

//                     <div class="accordion" id="accordionExample">
//                         {
//                             rowArray.length > 0 && rowArray.map((row) => {
//                                 const dataObj = { ...row };
//                                 delete dataObj.cellComponent;
//                                 return (
//                                     < div className="table_row" style={{ width: sumOfAllColumnWidth, minWidth: sumOfAllColumnMinWidth, maxWidth: sumOfAllColumnMaxWidth }} >
//                                         {/* {
//                                         headerArray.length > 0 && headerArray.map(header => {
//                                             return (
//                                                 <div style={{ width: header.width, maxWidth: "100%" }} className="table_row_element" >
//                                                     {
//                                                         header.cellComponent ? <header.cellComponent value={row[header.field]} data={dataObj} /> : row[header.field]
//                                                     }
//                                                 </div>
//                                             )
//                                         })
//                                     } */}
//                                         <AccordianComponent
//                                             headerArray={headerArray}
//                                             row={row}
//                                             dataObj={dataObj}
//                                             accordianBodyArray={accordianBodyArray}

//                                         />

//                                     </div>
//                                 )
//                             })
//                         }
//                     </div>
//                 </div>
//             </div >
//         </div>
//     )
// }

// export default GridAccordianComponent;

import { useCallback, useState } from "react";
import "./GridAccordianComponent.css";
import AccordianComponent from "../AccordianComponent/AccordianComponent";
const GridAccordianComponent = (props) => {
    const { headerArray, rowArray, tableHeight, tableMinHeight, tableMaxHeight, internalHorizontalScrollWidth, accordianBodyArray } = props;
    let sumOfAllColumnWidth = 0;
    let sumOfAllColumnMinWidth = 0;
    let sumOfAllColumnMaxWidth = 0;
    headerArray.map(h => {
        sumOfAllColumnWidth = sumOfAllColumnWidth + h.width;
        sumOfAllColumnMinWidth = sumOfAllColumnMinWidth + h.minWidth;
        sumOfAllColumnMaxWidth = sumOfAllColumnMaxWidth + h.maxWidth;
    })


    return (
        <div className="grid_component_container" >
            <div className="grid_component" style={{ height: tableHeight, minHeight: tableMinHeight, maxHeight: tableMaxHeight }} >

                <div className="table_header_container" style={{ width: sumOfAllColumnWidth, minWidth: sumOfAllColumnMinWidth, maxWidth: sumOfAllColumnMaxWidth }} >
                    {
                        headerArray.length > 0 && headerArray.map(header => {
                            return (<div key={header.headerName} style={{ width: header.width, minWidth: header.minWidth }} className="table_header_element" >
                                {header.headerName}
                            </div>)
                        })
                    }
                </div>

                <div className="table_row_container" style={{ width: sumOfAllColumnWidth, minWidth: sumOfAllColumnMinWidth, maxWidth: sumOfAllColumnMaxWidth }}  >
                    {
                        rowArray.length > 0 && rowArray.map(row => {
                            const dataObj = { ...row };
                            delete dataObj.cellComponent;
                            return (
                                <div className="table_row" style={{ width: sumOfAllColumnWidth, minWidth: sumOfAllColumnMinWidth, maxWidth: sumOfAllColumnMaxWidth }}  >
                                    {/* {
                                        headerArray.length > 0 && headerArray.map(header => {
                                            return (
                                                <div style={{ width: header.width, minWidth: header.minWidth }} className="table_row_element" >
                                                    {
                                                        header.cellComponent ? <header.cellComponent value={row[header.field]} data={dataObj} /> : row[header.field]
                                                    }
                                                </div>
                                            )
                                        })
                                    } */}
                                    <AccordianComponent
                                        headerArray={headerArray}
                                        row={row}
                                        dataObj={dataObj}
                                        accordianBodyArray={accordianBodyArray}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div >
        </div>
    )
}

export default GridAccordianComponent;