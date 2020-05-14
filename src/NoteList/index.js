import React, { useState, useEffect } from "react";
import { getTodos, addTodo, updateTodo, moveTodo, deleteTodo } from "./state";
import { connect } from "react-redux";
import "./style.css";
import posed from "react-pose";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TextareaAutosize from "react-textarea-autosize";
import HomeButton from "../App/HomeButton";
import { FiTrash2 } from "react-icons/fi";

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

function NoteList({ todos, addTodo, updateTodo, moveTodo, deleteTodo }) {
    const [todoAnim, setTodoAnim] = useState("start");
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        setTodoAnim("end");
    }, []);

    const dragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) return;

        // exit if it was dropped on the same spot
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        moveTodo({
            oldIndex: source.index,
            newIndex: destination.index,
        });
    };

    const todoChanged = (e, index) => {
        updateTodo({
            text: e.target.value,
            index,
        });
    };

    const submitTodo = (e) => {
        e.preventDefault();
        addTodo(newTodo);
        setNewTodo("");
    };

    const deleteTodoAction = (id) => {
        deleteTodo(id);
    };

    return (
        <DragDropContext onDragEnd={dragEnd}>
            <HomeButton />
            <div className="flex-column">
                <form onSubmit={submitTodo} className="flex-column">
                    <label htmlFor="new-todo-input">New Task:</label>
                    <input
                        type="text"
                        name="new-todo-input"
                        value={newTodo}
                        autoComplete={"off"}
                        spellCheck={false}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                </form>
                <Droppable droppableId={"droppable"}>
                    {(provided) => (
                        <TodoList
                            pose={todoAnim}
                            className="todo-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {todos.map((todo, i) => (
                                <Draggable draggableId={todo.text} index={i} key={`todo-${todo.id}`}>
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
                                            <div className="delete-todo" onClick={() => deleteTodoAction(todo.id)}>
                                                <FiTrash2 />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </TodoList>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}

const mapState = (state) => ({
    todos: getTodos(state),
});

const mapDispatch = {
    addTodo,
    updateTodo,
    moveTodo,
    deleteTodo,
};

export default connect(mapState, mapDispatch)(NoteList);
