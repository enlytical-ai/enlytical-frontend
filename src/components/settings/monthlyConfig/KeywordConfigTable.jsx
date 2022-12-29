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
import axios from "axios";
import { BASE_URL } from "../../../appConstants";

const KeywordConfigTable = () => {
  const [categoryArray, setCategoryArray] = useState([
    {
      category: "Face Wash",
      brand: ["Nykaa", "nykaa"],
      core: ["n", "N"],
      generic: ["R", "r"],
      competition: ["Lacme"],
    },
    {
      category: "Face cream",
      brand: ["mamaearth", "mamaearth"],
      core: ["x", "X"],
      generic: ["M", "m"],
      competition: ["nykaa"],
    },
    {
      category: "body wash",
      brand: ["Nivia"],
      core: ["x", "X"],
      generic: ["M", "m"],
      competition: ["nykaa"],
    },
  ]);
  const [currentCategory, setCurrentCategory] = useState();
  useEffect(() => {
    setCurrentCategory({ ...categoryArray[0] });
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .get(`${BASE_URL}keywords?brandId=63ac297622128d99e95bbf25`, {
  //       headers: {
  //         token,
  //       },
  //     })
  //     .than((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const onDrag = (newObj) => {
    const { category } = newObj;
    let finalObj = {
      category: category,
    };
    for (let el in newObj) {
      let miniObj = newObj[el];
      let key = miniObj.name;
      if (el !== "category") {
        finalObj[key.toLowerCase()] = miniObj.items;
      }
    }

    const brand = finalObj.brand.map((el) => {
      return el.content;
    });
    const core = finalObj.core.map((el) => {
      return el.content;
    });
    const competition = finalObj.competition.map((el) => {
      return el.content;
    });
    const generic = finalObj.generic.map((el) => {
      return el.content;
    });
    finalObj.brand = brand;
    finalObj.core = core;
    finalObj.competition = competition;
    finalObj.generic = generic;

    const categoryArrayUpdated = categoryArray.map((cat) => {
      if (cat.category === finalObj.category) {
        return finalObj;
      }
      return cat;
    });
    setCategoryArray(categoryArrayUpdated);
  };
  // console.log(categoryArray);
  const [active, setActive] = useState(false);
  const categoryChange = (cat) => {
    console.log(cat);
    setCurrentCategory(cat);
    setActive(!active);
    console.log(active);
  };

  return (
    <>
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "20px", color: "#1565C0" }}>
          Please Confirm System recognized Non-negotiable KeyWords
        </h3>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <aside className="category-sidebar">
          <h2
            style={{
              width: 220,
              textAlign: "center",
              borderRadius: "5px",
              padding: 5,
            }}
          >
            Categories
          </h2>
          <hr style={{ height: 3 }} />
          <div className="categoryContainer">
            {currentCategory &&
              categoryArray &&
              categoryArray.map((cat, i) => {
                return (
                  <div
                    className="categoryItem"
                    key={cat.category}
                    onClick={() => categoryChange(cat)}
                  >
                    <div
                      className={`item ${
                        currentCategory.category == cat.category ? "active" : ""
                      } `}
                    >
                      {cat.category}
                    </div>
                  </div>
                );
              })}
          </div>
        </aside>
        <div>
          {currentCategory && (
            <Dnd onDrag={onDrag} currentCategory={currentCategory} />
          )}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <button className="btn btn-primary">Save</button>
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
