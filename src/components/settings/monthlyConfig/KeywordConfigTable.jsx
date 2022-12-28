import React from "react";
import "./KeywordConfigTable.css";
import { useState, useRef } from "react";
import Dnd from "../../Dnd/Dnd";
import { useDrop } from "react-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Loader from "../../commonComponent/Loader/Loader";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useEffect } from "react";

const KeywordConfigTable = () => {
  const [categoryArray, setCategoryArray] = useState([
    {
      category: "Face Wash",
      brand: ["Nykaa", "nykaa"],
      core: ["n", "N"],
      generic: ["R", "r"],
      competition: ["Lacme"]
    }
  ]);
  const [currentCategory, setCurrentCategory] = useState();
  useEffect(() => {
    setCurrentCategory({ ...categoryArray[0] });
  }, []);

  const onDrag = (newObj) => {
    const { category } = newObj;
    let finalObj = {
      category: category
    };
    for (let el in newObj) {
      let miniObj = newObj[el];
      let key = miniObj.name;
      if (el !== "category") {
        finalObj[key.toLowerCase()] = miniObj.items
      }

    }

    const brand = finalObj.brand.map(el => {
      return el.content
    })
    const core = finalObj.core.map(el => {
      return el.content
    })
    const competition = finalObj.competition.map(el => {
      return el.content
    })
    const generic = finalObj.generic.map(el => {
      return el.content
    })
    finalObj.brand = brand;
    finalObj.core = core;
    finalObj.competition = competition;
    finalObj.generic = generic;
  
  const categoryArrayUpdated =  categoryArray.map(cat => {
      if (cat.category === finalObj.category) {
        return finalObj;
      }
      return cat
    })
    setCategoryArray(categoryArrayUpdated);
  }
  console.log(categoryArray);



  
  return (
    <>
      <div>
        {currentCategory && <Dnd onDrag={onDrag} currentCategory={currentCategory} />}
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
