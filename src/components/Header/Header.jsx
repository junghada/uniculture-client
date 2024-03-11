import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import axios from "axios";
import "../PageLayout/PageLayout.css"

const Header = () => {
    const [isNavOpen, setNavOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false); // 로그인 상태 저장

    useEffect(() => {
        loginCheck(); // 컴포넌트가 마운트될 때 로그인 상태 확인
    }, []);

    const location = useLocation();

    const getToken = () => {
        return localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져옴
    };

    const removeToken = () => {
        localStorage.removeItem('accessToken'); // 로컬 스토리지에서 토큰 가져옴
        setIsLogin(false);
    };
    const loginCheck = async () => {
        console.log('loginCheck');
        try {
            const token = getToken(); // 토큰 가져오기
            if (token) {
                const response = await axios.get('/api/auth/sec/home', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setIsLogin(true); // 로그인 상태 업데이트
                }
                else {
                    setIsLogin(false);
                }
            } else {
                setIsLogin(false); // 토큰이 없을 경우
            }
        } catch (error) {
            console.error('Login Error:', error);
            setIsLogin(false);
        }
    };

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
                <div className="container-fluid" style={{paddingLeft: "100px", paddingRight: "100px"}}>
                    <div className="d-flex align-items-center">
                        <Link to="/" className={`navbar-brand ${activePage('/')}`} aria-current="page" style={{ fontFamily: "SuezOne"}}>
                            <img src={logoImg} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
                            UniCulture
                        </Link>
                    </div>

                    {isLogin ? (
                        <button className={`btn nav-link ms-auto order-lg-last`} onClick={removeToken} style={{ backgroundColor: "#B3C693", padding: "5px 15px", marginRight: "10px"}}>
                            로그아웃
                        </button>
                    ) : (
                        <>
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
                        </>
                    )}

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
                            <NavItem to={`/profile/${myNickname}`} text="프로필" activePage={activePage} />
                        </ul>
                    </div>
                </div>
            </nav>

    );
};

export default Header;