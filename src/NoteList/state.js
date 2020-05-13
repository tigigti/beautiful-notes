const name = "notelist";

// Constants
const ADD_TODO = `${name}/ADD_TODO`;

// Reducer
const initialState = {
  todos: [
    {
      text: "display todos",
      index: 1
    },
    {
      text: "style them",
      index: 2
    },
    {
      text: "animate them",
      index: 3
    },
    {
      text: "implement 'add todo' functionality",
      index: 4
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    default:
      return state;
  }
};

// Action Creator
export const addTodo = payload => ({
  type: ADD_TODO,
  payload
});

// Selector
export const getTodos = state => state[name].todos || initialState.todos;

export default {
  reducer,
  name
};
