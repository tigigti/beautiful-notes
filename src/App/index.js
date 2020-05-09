import React from "react";
import "./App.css";
import MainMenu from "./MainMenu";

function App() {
    return (
        <div className="container flex-center">
            <h1 className="animated-headline">A Beautiful Note App</h1>
            <MainMenu />
        </div>
    );
}

export default App;
