import { loadState } from "../localStorage";

const name = "global";

// Constants
export const RESET_STATE = `${name}/RESET_STATE`;
const ACCEPT_COOKIE = `${name}/ACCEPT_COOKIE`;

// Reducer
const initialState = {
    cookiesAccepted: false,
};

const reducer = (state = loadState() === undefined ? initialState : loadState()[name], action) => {
    switch (action.type) {
        case ACCEPT_COOKIE:
            return {
                ...state,
                cookiesAccepted: true,
            };

        case RESET_STATE:
            return initialState;

        default:
            return state;
    }
};

// Action Creator
export const acceptCookie = () => ({
    type: ACCEPT_COOKIE,
});

export const resetState = () => ({
    type: RESET_STATE,
});

// Selector
export const getCookieCompliance = (state) => state[name].cookiesAccepted || initialState.cookiesAccepted;

export default {
    name,
    reducer,
};
