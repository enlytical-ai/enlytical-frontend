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
  const [categories, setCategories] = useState([
    {
      category: "facewash",
      brand: [],
      core: ["Keyword 1", "Keyword 2"],
      generic: [],
      competition: ["Keyword 3", "Keyword 4"],
    },
    {
      category: "facecream",
      brand: [],
      core: ["Keyword 1", "Keyword 2"],
      generic: ["Keyword 3", "Keyword 4"],
      competition: [],
    },
    {
      category: "soap",
      brand: ["Keyword 3", "Keyword 4", "keyword 5"],
      core: [],
      generic: [],
      competition: ["Keyword 1", "Keyword 2"],
    },
    {
      category: "bodyWash",
      brand: [],
      core: [],
      generic: ["Keyword 3", "Keyword 4", "keyword 5"],
      competition: ["Keyword 1", "Keyword 2"],
    },
  ]);

  const [currentCat, setCurrentCat] = useState({
    ...categories[0],
  });
  const [active, setActive] = useState(true);
  // const toggleState = () => {
  //   setActive(!active);
  // };
  const categoryChange = (cat) => {
    // console.log(e.target);
    // setCategories(e.target.value);
    // setCategories(categories);
    // console.log(cat);
    setCurrentCat(cat);
    setActive(!active);
  };

  return (
    <>
      <div>
        <h3 style={{ fontSize: "20px", color: "#1565C0" }}>
          Please Confirm System recognized Non-negotiable KeyWords
        </h3>
      </div>
      <div style={{ display: "flex" }}>
        <aside>
          <h2>Categories</h2>
          <div className="categoryContainer">
            {categories.map((cat, i) => {
              return (
                <div
                  className="categoryItem"
                  key={cat.category}
                  onClick={() => categoryChange(cat)}
                >
                  <div className={`item ${active ? "active" : ""}`}>
                    {cat.category}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
        <div>
          <DragAndDrop catObj={currentCat} />
        </div>
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
