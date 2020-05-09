const name = "global";

// Constants
const ACTION = `${name}/ACTION`;

// Reducer
const initialState = {
    someKey: "some Value"
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};

// Action Creator
export const commitAction = payload => ({
    type: ACTION,
    payload
});

// Selector
export const getSomeKey = state => state[name].someKey || initialState.someKey;

export default {
    reducer,
    name
};