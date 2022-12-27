import React from "react";
import "./KeywordConfigTable.css";
import DragAndDrop from "../../Dnd/DragAndDrop.tsx";
import { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Loader from "../../commonComponent/Loader/Loader";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const KeywordConfigTable = () => {
  // const [brands, setBrands] = useState([
  //   { id: "a", name: "Keyword 1" },
  //   { id: "b", name: "Keyword 2" },
  //   { id: "c", name: "Keyword 3" },
  // ]);
  // const [core, setCore] = useState([]);
  // const [generic, setGeneric] = useState([]);
  // const [competition, setCompetition] = useState([]);

  // function handleOnDragEnd(result) {
  //   if (!result.destination) return;
  //   const items = Array.from(brands);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   setBrands(items);
  // }
  return (
    <>
      <div>
        <h3 style={{ fontSize: "20px", color: "#1565C0" }}>
          Please Confirm System recognized Non-negotiable KeyWords
        </h3>
      </div>
      <div>
        <DragAndDrop />
      </div>
    </>
    // <div className="keywordConfigTableContainer">
    //   <div className="tableSubContainer">
    //     <h3>Brand</h3>
    //     <div className="tableContent">
    //       <ul className="tableContentItem">
    //         {brands.map((e, i) => {
    //           return <li>{e.name}</li>;
    //         })}
    //       </ul>
    //     </div>
    //   </div>
    //   <div className="tableSubContainer">
    //     <h3>Core</h3>
    //     <DragDropContext onDragEnd={handleOnDragEnd}>
    //       <div className="tableContent">
    //         <Droppable droppableId="brands">
    //           {(provided) => (
    //             <ul
    //               className="tableContentItem"
    //               {...provided.droppableProps}
    //               ref={provided.innerRef}
    //             >
    //               {brands.map(({ id, name }, index) => {
    //                 return (
    //                   <Draggable key={id} draggableId={id} index={index}>
    //                     {(provided) => (
    //                       <li
    //                         ref={provided.innerRef}
    //                         {...provided.draggableProps}
    //                         {...provided.dragHandleProps}
    //                       >
    //                         {name}
    //                       </li>
    //                     )}
    //                   </Draggable>
    //                 );
    //               })}
    //             </ul>
    //           )}
    //         </Droppable>
    //       </div>
    //     </DragDropContext>
    //   </div>
    //   <div className="tableSubContainer">
    //     <h3>Generic</h3>
    //     <div className="tableContent">
    //       <ul className="tableContentItem">
    //         <li>Keyword1</li>
    //         <li>Keyword2</li>
    //         <li>Keyword3</li>
    //       </ul>
    //     </div>
    //   </div>
    //   <div className="tableSubContainer">
    //     <h3>Competition</h3>
    //     <div className="tableContent">
    //       <ul className="tableContentItem">
    //         <li>Keyword1</li>
    //         <li>Keyword2</li>
    //         <li>Keyword3</li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default KeywordConfigTable;
