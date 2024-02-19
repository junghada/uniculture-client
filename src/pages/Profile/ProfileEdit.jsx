import Layout from "../../components/Layout";
import Sidebar from "../../components/ProfileSidebar/Sidebar";

const ProfileEdit = () => {
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar/>

                    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ overflowY: "auto" }}>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h4 className="h4">프로필 편집</h4>
                        </div>
                        <div class="mb-3 row justify-content-center">
                            <div style={{width:"100px", height:"100px", backgroundColor:"black", color:"white"}}>이미지</div>
                            
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">소개</label>
                            <div class="col-sm-10">
                                <input class="form-control" placeholder="소개"/>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">취미</label>
                            <div class="col-sm-10">
                                <input type="checkbox" class="btn-check" id="btn-check-1" autocomplete="off"/>
                                <label class="btn btn-outline-primary" for="btn-check-1">요리</label>

                                <input type="checkbox" class="btn-check" id="btn-check-2" autocomplete="off"/>
                                <label class="btn btn-outline-primary" for="btn-check-2">산책</label>

                                <input type="checkbox" class="btn-check" id="btn-check-3" autocomplete="off"/>
                                <label class="btn btn-outline-primary" for="btn-check-3">쇼핑</label>

                                <input type="checkbox" class="btn-check" id="btn-check-4" autocomplete="off"/>
                                <label class="btn btn-outline-primary" for="btn-check-4">여행</label>

                                <input type="checkbox" class="btn-check" id="btn-check-5" autocomplete="off"/>
                                <label class="btn btn-outline-primary" for="btn-check-5">드라이브</label>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileEdit;
