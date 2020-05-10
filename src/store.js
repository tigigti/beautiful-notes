import { createStore, combineReducers } from "redux";

// Get State
import AppState from "./App/state";
import MainState from "./Main/state";

// Create root
const rootReducer = combineReducers({
    [AppState.name]: AppState.reducer,
    [MainState.name]: MainState.reducer,
});

// Create Store
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
