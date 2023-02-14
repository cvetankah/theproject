import React from "react";
import { Link } from 'react-router-dom';

const HeaderUserNavigation = () => {
    return (
        <div className="header-user-nav">
            <div className="header-user-nav-link"><Link className="green" to="/user/recipes">my recipes</Link></div>
            <div className="header-user-nav-point"></div>
            <div className="header-user-nav-link"><Link className="orange" to="/user/profile">my profile</Link></div>
            <div className="header-user-nav-point"></div>
            <div className="header-user-nav-link"><Link className="midgrey" to="/user/logout">log out</Link></div>
        </div>
    )
};

export default HeaderUserNavigation;