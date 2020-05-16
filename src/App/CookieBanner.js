import React from "react";

// Spread each prop to child, assign onClick manualy to button
export default function CookieBanner({ onClick, ...props }) {
    return (
        <div className="cookie-banner" {...props}>
            This site stores the tasks you provide
            <button className="banner-button" onClick={onClick}>
                Accept
            </button>
        </div>
    );
}
