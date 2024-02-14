import Layout from "../../components/Layout";
import { Link, useLocation } from "react-router-dom";

const ProfileInfo = () => {
    const location = useLocation();

    const activePage = (link) => {
        return location.pathname === link ? "nav-link active" : "nav-link link-dark";
    };

    const NavItem = ({ to, text, activePage }) => (
        <li>
            <a href={to} class={`${activePage(to)}`}>{text}</a>
        </li>
    );

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-lg-2 d-flex flex-column flex-shrink-0 p-3" style={{ backgroundColor: "#FBFBF3" }}>
                        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                            <span className="fs-4">뒤로가기버튼</span>
                        </a>
                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto">
                            <NavItem to="/accounts/edit" text="프로필 편집" activePage={activePage} />
                            <NavItem to="/accounts/personal-info" text="개인정보" activePage={activePage} />
                            <NavItem to="/accounts/delete" text="계정 탈퇴" activePage={activePage} />
                        </ul>
                    </div>

                    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ overflowY: "auto" }}>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h4 className="h4">개인정보 수정</h4>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileInfo;
