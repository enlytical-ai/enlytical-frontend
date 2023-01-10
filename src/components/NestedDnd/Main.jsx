import React, { useEffect, useState } from "react";
import "./Main.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ServiceCommandUnit from "./ServiceCommandUnit";
import { static_items } from "./data";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import axios from "axios";
import { BASE_URL } from "../../appConstants";
import { useSelector } from "react-redux";
import { HEADER } from "../../../src/appUiConatsnts";
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "0 10px 10px 10px",

    background: isDragging ? "#a1d7fd" : "hsla(205.16129032258064, 63.26530612244897%, 48.03921568627451%, 0.733)",
    borderRadius: "5px",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "",
    // padding: grid,
    display: "flex",
    flexDirection: "row",
    height: "75vh"
});


function Main() {
    const [state, setState] = useState({ items: [], _id: "" });

    const appParams = useSelector((state) => state.appParams);
    const { current_brand } = appParams;
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`${BASE_URL}categoryAndParentChildASIN?brandId=${current_brand._id}`, {
            headers: {
                token,
            },
        })
            .then((res) => {

                const { category_array, _id } = res.data.data.category_and_parent_child_asin_array;
                // console.log("ParentChild_data=>", category_array, _id);
                setState({ items: category_array, _id: _id });

            }).catch((error) => {
                console.log(error);
            })
    }, [])

    const saveData = () => {
        const token = localStorage.getItem("token");
        axios.put(`${BASE_URL}categoryAndParentChildASIN/${state._id}?brandId=${current_brand._id}`, { category_array: state.items }, {
            headers: {
                token,
            },
        }).then((res) => {
            // console.log("ParentChild_data=>", res.data.data.category_and_parent_child_asin_array.category_array);
            const { category_array, _id } = res.data.data.category_and_parent_child_asin_array
            setState({ items: category_array, _id });

            NotificationManager.success(
                `${res.data.message}`,
                "Success",
                2000
            );

        }).catch((error) => {
            console.log(error);
            NotificationManager.error(
                `${error.response.data.data.message} `,
                "Error",
                2000
            );
        })
    }

    const onDragEnd = (result) => {
        // dropped outside the list
        console.log(result);
        console.log("innner drag");
        if (!result.destination) {
            return;
        }
        const sourceIndex = result.source.index;
        const destIndex = result.destination.index;
        if (result.type === "droppableItem") {
            const items = reorder(state.items, sourceIndex, destIndex);
            setState(prevState => ({
                ...prevState,
                items
            }));
        } else if (result.type === "droppableSubItem") {
            const itemSubItemMap = state.items.reduce((acc, item) => {
                acc[item._id] = item.parent_asin_array;
                return acc;
            }, {});

            const sourceParentId = result.source.droppableId;
            const destParentId = result.destination.droppableId;

            const sourceSubItems = itemSubItemMap[sourceParentId];
            const destSubItems = itemSubItemMap[destParentId];

            let newItems = [...state.items];

            /** In this case parent_asin_array are reOrdered inside same Parent */
            if (sourceParentId === destParentId) {
                const reorderedSubItems = reorder(
                    sourceSubItems,
                    sourceIndex,
                    destIndex
                );
                newItems = newItems.map(item => {
                    if (item._id === sourceParentId) {
                        item.parent_asin_array = reorderedSubItems;
                    }
                    return item;
                });
                setState(prevState => ({
                    ...prevState,
                    items: newItems
                }));
            } else {
                let newSourceSubItems = [...sourceSubItems];
                const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

                let newDestSubItems = [...destSubItems];
                newDestSubItems.splice(destIndex, 0, draggedItem);
                newItems = newItems.map(item => {
                    if (item._id === sourceParentId) {
                        item.parent_asin_array = newSourceSubItems;
                    } else if (item._id === destParentId) {
                        item.parent_asin_array = newDestSubItems;
                    }
                    return item;
                });
                setState(prevState => ({
                    ...prevState,
                    items: newItems
                }));
            }
        } else if (result.type === "child") {

            const itemSubItemChildMap = {}

            for (let el of state.items) {
                for (let subEl of el.parent_asin_array) {
                    itemSubItemChildMap[subEl._id] = subEl.child_asin_array;
                }
            }

            const sourceParentId = result.source.droppableId;
            const destParentId = result.destination.droppableId;
            const sourceSubItems = itemSubItemChildMap[sourceParentId];
            const destSubItems = itemSubItemChildMap[destParentId];

            console.log(sourceSubItems);

            let newItems = [...state.items];

            /** In this case parent_asin_array are reOrdered inside same Parent */
            if (sourceParentId === destParentId) {
                const reorderedSubItems = reorder(
                    sourceSubItems,
                    sourceIndex,
                    destIndex
                );
                console.log(reorderedSubItems);
                newItems.forEach(item => {
                    item.parent_asin_array.forEach(subItem => {
                        if (subItem._id === sourceParentId) {
                            subItem.child_asin_array = reorderedSubItems
                        }
                    })
                })
                setState(prevState => ({
                    ...prevState,
                    items: newItems
                }));
            }
            else {
                let newSourceSubItems = [...sourceSubItems];
                const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

                let newDestSubItems = [...destSubItems];
                newDestSubItems.splice(destIndex, 0, draggedItem);

                newItems.forEach(item => {
                    item.parent_asin_array.forEach(subItem => {
                        if (subItem._id === sourceParentId) {
                            subItem.child_asin_array = newSourceSubItems;
                        } else if (subItem._id === destParentId) {
                            subItem.child_asin_array = newDestSubItems;
                        }
                    })
                })
                setState(prevState => ({
                    ...prevState,
                    items: newItems
                }));
            }
        }
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity

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
        <>
            <div className="main" style={{ height: containerHeight, overflow: 'auto' }}>
                <DragDropContext onDragEnd={onDragEnd} >
                    <Droppable droppableId="droppable" type="droppableItem">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {state.items.map((item, index) => (
                                    <Draggable key={item._id} draggableId={item._id} index={index}>
                                        {(provided, snapshot) => (
                                            <div style={{ padding: 5 }} >
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    {item.category}
                                                    <span
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            display: "inline-block",
                                                            // margin: "0 10px",
                                                            fontSize: "20px",
                                                            paddingLeft: "85px"

                                                        }}
                                                    >
                                                        <i class="bi bi-arrows-move"></i>
                                                    </span>
                                                    <ServiceCommandUnit
                                                        parent_asin_array={item.parent_asin_array}
                                                        type={item._id}
                                                    />
                                                </div>
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div className="nextButtonContainer" >
                <button onClick={saveData} className="btn btn-primary btn-sm">
                    Save
                </button>
            </div>

            <NotificationContainer />
        </>
    );

}


export default Main;