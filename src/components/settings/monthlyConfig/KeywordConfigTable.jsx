import React from "react";
import "./KeywordConfigTable.css";
import { useState, useRef } from "react";
import Dnd from "../../Dnd/Dnd";
import Loader from "../../commonComponent/Loader/Loader";
import { HEADER } from "../../../appUiConatsnts";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../appConstants";
import { useSelector } from "react-redux";
import Title from "../Title";

const KeywordConfigTable = () => {
  const [categoryArray, setCategoryArray] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [state, setState] = useState(null);


  const appParams = useSelector((state) => state.appParams);
  const { current_brand } = appParams;
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${BASE_URL}keywords?brandId=${current_brand._id}`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        console.log(response.data.data.category_data_array.category_data_array);
        const { category_data_array, _id } =
          response.data.data.category_data_array;
        setCategoryArray(category_data_array);
        setCurrentCategory({ ...category_data_array[0] });
        setState({ _id });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



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
    const competitor = finalObj.competitor.map((el) => {
      return el.content;
    });
    const generic = finalObj.generic.map((el) => {
      return el.content;
    });
    finalObj.brand = brand;
    finalObj.core = core;
    finalObj.competitor = competitor;
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
    // const [current_category] = categoryArray.filter((c) => c.category === cat);
    setCurrentCategory(cat);
  };

  const saveData = () => {

    const token = localStorage.getItem("token");
    axios
      .put(
        `${BASE_URL}keywords/${state._id}?brandId=${current_brand._id}`,
        { category_data_array: categoryArray },
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data.category_data_array.category_data_array);
        const { category_data_array, _id } =
          response.data.data.category_data_array;

        setCategoryArray(category_data_array);
        setCurrentCategory({ ...category_data_array[0] });
        setState({ _id });
        NotificationManager.success(
          `${response.data.message}`,
          "Success",
          2000
        );
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(
          `${error.response.data.data.message} `,
          "Error",
          2000
        );
      });
  };

  //To get the height for grid
  const [containerHeight, setContainerHeight] = useState();
  useEffect(() => {
    const height = window.innerHeight
    const netHeight = height - (HEADER.height + 20 + 32 + 24 + 42);
    setContainerHeight(netHeight)
  }, [])
  window.addEventListener('resize', () => {
    const height = window.innerHeight
    const netHeight = height - (HEADER.height + 20 + 32 + 24 + 42);
    setContainerHeight(netHeight)
  });
  //
  return (
    <div className="keywordsConfigContainer" >
      <Title>Please Confirm System recognized Non-negotiable KeyWords</Title>
      <div className="keywordsConfigContainerLeftRightContainer" style={{ height: containerHeight }} >
        <aside className="category-sidebar">
          <h2
            style={{
              width: "100%",
              fontSize: "16px",
              textAlign: "left",
              borderRadius: "5px",
              paddingLeft: "10px"
            }}
          >
            Categories
          </h2>
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
                      className={`item ${currentCategory.category == cat.category ? "active" : ""
                        } `}
                    >
                      {cat.category}
                    </div>
                  </div>
                );
              })}
          </div>
        </aside>
        <div className="dndContainer" style={{ width: "100%" }} >
          {currentCategory && (
            <Dnd onDrag={onDrag} currentCategory={currentCategory} />
          )}
        </div>
      </div>
      <div className="nextButtonContainer" >
        <button onClick={saveData} type="button" className="btn btn-primary btn-sm">
          Save
        </button>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default KeywordConfigTable;
