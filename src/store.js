import { createStore, combineReducers } from "redux";

// Get State
import AppState from "./App/state";
import NoteListState from "./NoteList/state";
import { saveState } from "./localStorage";

// Create root
const rootReducer = combineReducers({
    [AppState.name]: AppState.reducer,
    [NoteListState.name]: NoteListState.reducer,
});

// Create Store
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    saveState(store.getState());
    console.log("state saved");
});

export default store;
