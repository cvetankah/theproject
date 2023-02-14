import './Footer.css';
import React from 'react';
import logo from "../../logo_white.svg";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <Link to="/recipes">
                    <img className="footer-logo-img" src={logo} alt="Baby's Food Place"/>
                    </Link>
                </div>
                <div className="footer-nav">
                    <div className="footer-nav-link"><Link to="/recipes/breakfast">breakfast</Link></div>
                    <div className="footer-nav-point"></div>
                    <div className="footer-nav-link"><Link to="/recipes/brunch">brunch</Link></div>
                    <div className="footer-nav-point"></div>
                    <div className="footer-nav-link"><Link to="/recipes/lunch">lunch</Link></div>
                    <div className="footer-nav-point"></div>
                    <div className="footer-nav-link"><Link to="/recipes/dinner">dinner</Link></div>
                </div>
                <div className="footer-info">
                    <span>Baby's Food Place</span> <br />
                    <span>copyright &copy; 2021</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;