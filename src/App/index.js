import React from "react";
import "./App.css";
import MainMenu from "./MainMenu";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NoteList from "../NoteList";
import { connect } from "react-redux";
import { getCookieCompliance, acceptCookie } from "./state";
import CookieBanner from "./CookieBanner";

const StandardMenu = () => (
    <div className="container flex-center animated-bg">
        <h1 className="animated-headline">A Beautiful Note App</h1>
        <MainMenu />
    </div>
);

function App({ cookieCompliance, acceptCookie }) {
    return (
        <Router>
            <Route path="/" exact component={StandardMenu} />
            <Route path="/notes" component={NoteList} />
            {!cookieCompliance && <CookieBanner onClick={() => acceptCookie()} />}
        </Router>
    );
}

const mapState = (state) => ({
    cookieCompliance: getCookieCompliance(state),
});

const mapDispatch = {
    acceptCookie,
};

export default connect(mapState, mapDispatch)(App);
