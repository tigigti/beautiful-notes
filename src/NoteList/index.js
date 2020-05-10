import React, { useState, useEffect } from "react";
import { getTodos, addTodo } from "./state";
import { connect } from "react-redux";
import "./style.css";
import posed from "react-pose";
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

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

function NoteList({ todos, addTodo }) {
    const [todoAnim, setTodoAnim] = useState("start");

    useEffect(() => {
        setTodoAnim("end");
    }, []);

    return (
        <TodoList pose={todoAnim} className="todo-list">
            {todos.map((todo, i) => (
                <div className="todo-item" key={todo}>
                    <TodoLogo className="todo-logo flex-center">{i+1}</TodoLogo>
                    <div className="todo-text">
                        {todo}
                        <TodoVeil className="todo-veil" />
                    </div>
                </div>
            ))}
        </TodoList>
    );
}

const mapState = (state) => ({
    todos: getTodos(state),
});

const mapDispatch = {
    addTodo,
};

export default connect(mapState, mapDispatch)(NoteList);
