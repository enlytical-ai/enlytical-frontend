import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ServiceCommandUnit2 from "./ServiceCommandUnit2";
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    padding: "10px",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#9ED5C5",
    padding: "10px",
    marginBottom: '5px',
    borderRadius: "5px",
    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "#FBF8F1",
    padding: grid,
    // margin: "10px 0",

});

export default class ServiceCommandUnit extends React.Component {
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <Droppable droppableId={this.props.type} type={`droppableSubItem`}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {this.props.parent_asin_array.map((item, index) => (
                            <Draggable key={item._id} draggableId={item._id} index={index}>
                                {(provided, snapshot) => (
                                    <div >
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.parent_asin}
                                            <span
                                                {...provided.dragHandleProps}
                                                style={{
                                                    display: "inline-block",
                                                    margin: "0 10px",
                                                    fontSize: "15px",
                                                    paddingLeft: "15px"
                                                }}
                                            >
                                                <i class="bi bi-arrows-move"></i>
                                            </span>
                                            <ServiceCommandUnit2
                                                parent_asin_array={item.child_asin_array}
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
        );
    }
}