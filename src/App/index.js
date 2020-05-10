import React from "react";
import "./App.css";
import MainMenu from "./MainMenu";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NoteList from "../NoteList";

const StandardMenu = () => (
  <>
    <h1 className="animated-headline">A Beautiful Note App</h1>
    <MainMenu />
  </>
);

function App() {
  return (
    <Router>
      <div className="container flex-center">
        <Route path="/" exact component={StandardMenu} />
        <Route path="/notes" component={NoteList} />
      </div>
    </Router>
  );
}

export default App;
