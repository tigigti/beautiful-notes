const name = "notelist";

// Constants
const ADD_TODO = `${name}/ADD_TODO`;

// Reducer
const initialState = {
    todos: ["display todos", "style them", "animate them", "implement 'add todo' functionality"],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };

        default:
            return state;
    }
};

// Action Creator
export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload,
});

// Selector
export const getTodos = (state) => state[name].todos || initialState.todos;

export default {
    reducer,
    name,
};
