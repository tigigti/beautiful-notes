import { v4 } from "uuid";
import { loadState } from "../localStorage";

const name = "notelist";

// Constants
const ADD_TODO = `${name}/ADD_TODO`;
const UPDATE_TODO = `${name}/UPDATE_TODO`;
const MOVE_TODO = `${name}/MOVE_TODO`;
const DELETE_TODO = `${name}/DELETE_TODO`;
const RESET_TODO = `${name}/RESET_TODO`;

// Reducer

const initialState = {
    todos: [],
};

const reducer = (state = loadState() === undefined ? initialState : loadState()[name], action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        text: action.payload,
                        id: v4(),
                    },
                ],
            };

        case UPDATE_TODO:
            const updatedTodos = state.todos.map((todo, i) => {
                if (i !== action.payload.index) return todo;
                return {
                    ...todo,
                    text: action.payload.text,
                };
            });
            return {
                ...state,
                todos: updatedTodos,
            };

        case MOVE_TODO:
            const newOrder = Array.from(state.todos);
            const updatedTodo = newOrder.splice(action.payload.oldIndex, 1)[0];
            newOrder.splice(action.payload.newIndex, 0, updatedTodo);

            return {
                ...state,
                todos: newOrder,
            };

        case DELETE_TODO:
            const updatedList = [];
            state.todos.forEach((todo) => {
                if (todo.id !== action.payload) return updatedList.push(todo);
            });

            return {
                ...state,
                todos: updatedList,
            };

        case RESET_TODO:
            return initialState;

        default:
            return state;
    }
};

// Action Creator
export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload,
});

export const updateTodo = (payload) => ({
    type: UPDATE_TODO,
    payload,
});

export const moveTodo = (payload) => ({
    type: MOVE_TODO,
    payload,
});

export const deleteTodo = (payload) => ({
    type: DELETE_TODO,
    payload,
});

export const resetTodo = () => ({
    type: RESET_TODO,
});

// Selector
export const getTodos = (state) => state[name].todos || initialState.todos;

export default {
    name,
    reducer,
};
