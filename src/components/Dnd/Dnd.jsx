import React, { useState } from "react";
import { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Dnd(props) {
  const { currentCategory } = props;
  const { category } = currentCategory;
  const [columns, setColumns] = useState();

  useEffect(() => {
    const brand = currentCategory.brand.map((el) => {
      return {
        id: uuid(),
        content: el,
      };
    });
    const core = currentCategory.core.map((el) => {
      return {
        id: uuid(),
        content: el,
      };
    });

    const generic = currentCategory.generic.map((el) => {
      return {
        id: uuid(),
        content: el,
      };
    });

    const competitor = currentCategory.competitor.map((el) => {
      return {
        id: uuid(),
        content: el,
      };
    });

    const columnsFromBackend = {
      [uuid()]: {
        name: "Brand",
        items: brand,
      },
      [uuid()]: {
        name: "Core",
        items: core,
      },
      [uuid()]: {
        name: "Generic",
        items: generic,
      },
      [uuid()]: {
        name: "Competitor",
        items: competitor,
      },
    };
    setColumns(columnsFromBackend);
  }, [currentCategory]);

  useEffect(() => {
    if (columns && category) {
      props.onDrag({
        ...columns,
        category,
      });
    }
  }, [columns]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {columns && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <div key={columnId}>
                      <h3
                        style={{
                          marginLeft: "12px",
                          width: 170,
                          backgroundColor: "#13122e",
                          color: "white",
                          borderRadius: "5px",
                          // padding: 10,
                        }}
                      >
                        {column.name}
                      </h3>
                      <div style={{ margin: "12px" }}>
                        <Droppable droppableId={columnId} key={columnId}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  // display: "flex",
                                  // flexDirection: "column",

                                  background: snapshot.isDraggingOver
                                    ? "lightblue"
                                    : "lightgrey",
                                  padding: 8,
                                  width: 170,
                                  height: "60vh",
                                  borderRadius: "5px",
                                  overflowY: "scroll",
                                }}
                              >
                                {column.items.map((item, index) => {
                                  return (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => {
                                        return (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              textAlign: "center",
                                              padding: 5,
                                              margin: "0 0 8px 0",
                                              borderRadius: "5px",
                                              backgroundColor:
                                                snapshot.isDragging
                                                  ? "#263B4A"
                                                  : "#456C86",
                                              color: "white",
                                              ...provided.draggableProps.style,
                                            }}
                                          >
                                            {item.content}
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    </div>
                  </div>
                );
              })}
            </DragDropContext>
          </div>
        )}
      </div>
    </>
  );
}

export default Dnd;
