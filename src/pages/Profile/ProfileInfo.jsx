import Layout from "../../components/Layout";
import Sidebar from "../../components/ProfileSidebar/Sidebar";

const ProfileInfo = () => {
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar/>
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
