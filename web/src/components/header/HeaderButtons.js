import React from "react";
import { Link } from "react-router-dom";

const HeaderButtons = () => {
    return (
        <div className="header-buttons"><Link className="button-link-transparent" to="/user/login">log in</Link>
            or
            <Link className="button-link-green" to="/user/signup">create account</Link>
        </div>
    )
};

export default HeaderButtons;