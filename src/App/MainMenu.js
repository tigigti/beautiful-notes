import React, { useEffect, useState } from "react";
import posed from "react-pose";
import { Link } from "react-router-dom";
import { clearStorage } from "../localStorage";
import { connect } from "react-redux";
import { resetState } from "./state";

const ItemContainer = posed.div({
    start: {},
    end: {
        staggerChildren: 75,
    },
});

const RouterItem = posed(Link)({
    start: {
        y: -10,
        opacity: 0,
    },
    end: {
        y: 0,
        opacity: 1,
    },
});

const Item = posed.a({
    start: {
        y: -10,
        opacity: 0,
    },
    end: {
        y: 0,
        opacity: 1,
    },
});

function MainMenu({ resetState }) {
    const [menuState, setMenuState] = useState("start");

    useEffect(() => {
        setMenuState("end");
    }, []);

    const clearCache = () => {
        clearStorage();
        resetState();
    };

    return (
        <ItemContainer pose={[menuState]} className="main-menu">
            <RouterItem className="menu-item" to="/notes">
                Start
            </RouterItem>
            <Item className="menu-item" href="#" onClick={() => clearCache()}>
                Clear Cache
            </Item>
            <Item className="menu-item" href="https://github.com/tigigti/beautiful-notes" target="_blank">
                GitHub
            </Item>
        </ItemContainer>
    );
}

const mapState = (state) => ({});

const mapDispatch = {
    resetState,
};

export default connect(mapState, mapDispatch)(MainMenu);
