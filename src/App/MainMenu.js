import React, { useEffect, useState } from "react";
import posed from "react-pose";

const ItemContainer = posed.div({
    start: {},
    end: {
        staggerChildren: 75,
    },
});

const Item = posed.div({
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
            {["Start", "Clear Cache", "GitHub"].map((item, i) => (
                <Item className="menu-item" key={i}>
                    {item}
                </Item>
            ))}
        </ItemContainer>
    );
}
