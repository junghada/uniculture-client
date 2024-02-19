import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../../assets/logo.png";

const Header = () => {
    const [isNavOpen, setNavOpen] = useState(false);
    const location = useLocation();

    const handleToggle = () => {
        setNavOpen(!isNavOpen);
    };

    const activePage = (link) => {
        return location.pathname === link ? 'active' : '';
    };

    const NavItem = ({ to, text, activePage }) => (
        <li className={`nav-item ${activePage(to)}`}>
            <Link to={to} className={`nav-link ${activePage(to)}`}>{text}</Link>
        </li>
    );

    return (
        <nav className={`navbar navbar-expand-lg`} style={{ backgroundColor: '#C8DCA0' }}>
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <Link to="/" className={`navbar-brand ${activePage('/')}`} aria-current="page" style={{ fontFamily: "SuezOne"}}>
                        <img src={logoImg} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
                        UniCulture
                    </Link>
                </div>

                <div className={`ms-auto order-lg-last`}>
                    <Link to="/sign-in" className={`btn nav-link`} style={{ backgroundColor: "#B3C693", padding: "5px 15px", marginRight: "10px" }}>
                        로그인
                    </Link>
                </div>

                <div className={`order-lg-last`}>
                    <Link to="/sign-up" className={`btn nav-link`} style={{ backgroundColor: "#B3C693", padding: "5px 15px", marginRight: "10px" }}>
                        회원가입
                    </Link>
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={handleToggle}
                    aria-expanded={isNavOpen ? 'true' : 'false'}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav">
                        <NavItem to="/" text="홈" activePage={activePage} />
                        <NavItem to="/friends" text="친구" activePage={activePage} />
                        <NavItem to="/study" text="스터디" activePage={activePage} />
                        <NavItem to="/chatting" text="채팅" activePage={activePage} />
                        <NavItem to="/profile" text="프로필" activePage={activePage} />
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
