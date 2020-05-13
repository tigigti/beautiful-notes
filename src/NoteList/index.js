import React, { useState, useEffect } from "react";
import { getTodos, addTodo, updateTodo } from "./state";
import { connect } from "react-redux";
import "./style.css";
import posed from "react-pose";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TextareaAutosize from "react-textarea-autosize";

const TodoList = posed.div({
    start: {},
    end: { staggerChildren: 150 },
});

const TodoLogo = posed.div({
    start: { rotate: 0, opacity: 0 },
    end: { rotate: 360, opacity: 1 },
});

const TodoVeil = posed.div({
    start: { width: "100%" },
    end: { width: "0%", display: "none" },
});

function NoteList({ todos, addTodo, updateTodo }) {
    const [todoAnim, setTodoAnim] = useState("start");

    useEffect(() => {
        setTodoAnim("end");
    }, []);

    const dragEnd = (result) => {
        console.log("Drag ended", result);
    };

    const todoChanged = (e, index) => {
        updateTodo({
            text: e.target.value,
            index,
        });
    };

    return (
        <DragDropContext onDragEnd={dragEnd}>
            <Droppable droppableId={"droppable"}>
                {(provided) => (
                    <TodoList
                        pose={todoAnim}
                        className="todo-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {todos.map((todo, i) => (
                            <Draggable draggableId={todo.text} index={i} key={`todo-${i}`}>
                                {(provided) => (
                                    <div
                                        className="todo-item"
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                        tabIndex={-1}
                                    >
                                        <TodoLogo className="todo-logo flex-center" tabIndex={-1}>
                                            {i + 1}
                                        </TodoLogo>
                                        <div className="todo-text">
                                            <TextareaAutosize
                                                className="todo-input"
                                                value={todo.text}
                                                spellCheck={false}
                                                onChange={(e) => todoChanged(e, i)}
                                            />
                                            <TodoVeil className="todo-veil" />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </TodoList>
                )}
            </Droppable>
        </DragDropContext>
    );
}

const mapState = (state) => ({
    todos: getTodos(state),
});

const mapDispatch = {
    addTodo,
    updateTodo,
};

export default connect(mapState, mapDispatch)(NoteList);
