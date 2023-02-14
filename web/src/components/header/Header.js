import './Header.css';
import logo from "../../logo_color.svg";
import { Link, useLocation} from 'react-router-dom';
import HeaderUserNavigation from './HeaderUserNavigation';
import HeaderButtons from './HeaderButtons';

function getHeaderNavLinkClass (pathName, category) {
    return pathName === '/recipes/' + category ? 'active' : 'inactive';
}

function jwtPresent() {
    return localStorage.getItem("jwt") !== null;
}

const Header = () => {
    const location = useLocation();
    return (
        <div className="header">
            <div className="header-logo">
                <Link to="/recipes">
                <img className="header-logo-img" src={logo} alt="Baby's Food Place"/>
                </Link>
            </div>
            <div className="header-nav">
                <div className="header-nav-link"><Link className={getHeaderNavLinkClass(location.pathname, 'breakfast')} to="/recipes/breakfast">breakfast</Link></div>
                <div className="header-nav-point"></div>
                <div className="header-nav-link"><Link className={getHeaderNavLinkClass(location.pathname, 'brunch')} to="/recipes/brunch">brunch</Link></div>
                <div className="header-nav-point"></div>
                <div className="header-nav-link"><Link className={getHeaderNavLinkClass(location.pathname, 'lunch')} to="/recipes/lunch">lunch</Link></div>
                <div className="header-nav-point"></div>
                <div className="header-nav-link"><Link className={getHeaderNavLinkClass(location.pathname, 'dinner')} to="/recipes/dinner">dinner</Link></div>
            </div>
            {jwtPresent() ? <HeaderUserNavigation /> : <HeaderButtons />}
        </div>
    )
};

export default Header;