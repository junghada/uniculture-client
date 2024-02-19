import Layout from "../../components/Layout";
import Sidebar from "../../components/ProfileSidebar/Sidebar";
import { useState} from 'react';

const ProfileDelete = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ overflowY: "auto" }}>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h4 className="h4">계정 탈퇴</h4>
                        </div>
                        <div className="mb-3 row">
                            <button>탈퇴하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileDelete;
