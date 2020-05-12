import React, { useEffect, useState } from "react";
import posed from "react-pose";
import { Link } from "react-router-dom";

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

export default function MainMenu() {
    const [menuState, setMenuState] = useState("start");

    useEffect(() => {
        setMenuState("end");
    }, []);

    return (
        <ItemContainer pose={[menuState]} className="main-menu">
            <RouterItem className="menu-item" to="/notes">
                Start
            </RouterItem>
            <Item className="menu-item" href="#todo">
                Clear Cache
            </Item>
            <Item className="menu-item" href="https://github.com/tigigti/beautiful-notes">
                GitHub
            </Item>
        </ItemContainer>
    );
}
