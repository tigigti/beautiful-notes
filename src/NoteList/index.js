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
    end: { staggerChildren: 25 },
});

const TodoLogo = posed.div({
    start: { rotate: 0, opacity: 0 },
    end: { rotate: 360, opacity: 1 },
});

const TodoVeil = posed.div({
    start: { width: "100%" },
    end: { width: "0%", display: "none" },
});

const TodoDeleteIcon = posed.div({
    start: { opacity: 0 },
    end: { opacity: 1 },
});

function NoteList({ todos, addTodo, updateTodo, moveTodo, deleteTodo }) {
    const [todoAnim, setTodoAnim] = useState("start");
    const [newTodo, setNewTodo] = useState("");
    const [todoLength, setTodoLength] = useState(todos.length);

    // Used to keep the list to scroll to the end on first render
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        setTodoAnim("end");
    }, []);

    // scroll the newly created todo into view
    useEffect(() => {
        if (firstRender) return setFirstRender(false);
        const todoList = document.querySelector(".todo-list");
        todoList.scrollIntoView({ block: "end" });
    }, [todoLength]);

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
        setTodoLength(todoLength + 1);
    };

    const deleteTodoAction = (id) => {
        deleteTodo(id);
    };

    return (
        <DragDropContext onDragEnd={dragEnd}>
            <HomeButton />
            <div className="flex-column todo-list-container">
                <form onSubmit={submitTodo} className="flex-column todo-input-form">
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
                        <div className="todo-list-wrapper">
                            <TodoList
                                pose={todoAnim}
                                className="todo-list"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {todos.map((todo, i) => (
                                    <Draggable draggableId={`todo-${todo.id}`} index={i} key={`todo-${todo.id}`}>
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
                                                    {i % 2 === 0 && <TodoVeil className="todo-veil" />}
                                                    {i % 2 === 1 && <TodoVeil className="todo-veil dark" />}
                                                </div>
                                                <TodoDeleteIcon
                                                    className="delete-todo flex-center"
                                                    onClick={() => deleteTodoAction(todo.id)}
                                                >
                                                    <FiTrash2 />
                                                </TodoDeleteIcon>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </TodoList>
                        </div>
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
