import React from 'react'
import {useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const activePage = (link) => {
        return location.pathname === link ? "nav-link active" : "nav-link link-dark";
    };

    const NavItem = ({ to, text, activePage }) => (
        <li>
            <a href={to} class={`${activePage(to)}`}>{text}</a>
        </li>
    );
    
    return (
        <div className="col-md-3 col-lg-2 d-flex flex-column flex-shrink-0 p-3" style={{ backgroundColor: "#FBFBF3" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span className="fs-4" onClick={()=> {navigate(-1)}}>←</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <NavItem to="/accounts/edit" text="프로필 편집" activePage={activePage} />
                <NavItem to="/accounts/personal-info" text="개인정보" activePage={activePage} />
                <NavItem to="/accounts/delete" text="계정 탈퇴" activePage={activePage} />
            </ul>
        </div>
    );
};

export default Sidebar;