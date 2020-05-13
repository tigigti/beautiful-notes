import React from "react";
import { FiArrowLeft } from "react-icons/fi";
// import { Link } from "react-router-dom";

export default function HomeButton() {
    return (
        // <Link className="home-button flex-center" to="/">
        //     <FiArrowLeft />
        // </Link>
        <div className="home-button flex-center" onClick={() => window.history.back()}>
            <FiArrowLeft />
        </div>
    );
}
