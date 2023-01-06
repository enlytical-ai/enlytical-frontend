import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    // padding: grid * 2,
    display: "inline-flex",
    // padding: "10px",

    background: isDragging ? "lightgreen" : "#BCEAD5",
    display: "inline-flex",
    // padding: "10px",
    marginBottom: "5px",
    borderRadius: "5px",
    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "#FBF8F1",
    padding: grid,
    // margin: "10px 0"
});

export default class ServiceCommandUnit extends React.Component {
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <Droppable droppableId={this.props.type} type={`child`}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {this.props.parent_asin_array.map((item, index) => (
                            <Draggable key={item._id} draggableId={item._id} index={index}>
                                {(provided, snapshot) => (
                                    <div style={{ display: "flex", justifyContent: 'space-around' }}>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.child_asin}
                                            <span
                                                {...provided.dragHandleProps}
                                                style={{
                                                    display: "block",
                                                    margin: "0 10px",
                                                    fontSize: "10px"
                                                }}
                                            >
                                                <i class="bi bi-arrows-move"></i>
                                            </span>
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
        );
    }
}