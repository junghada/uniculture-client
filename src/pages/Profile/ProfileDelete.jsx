import Layout from "../../components/Layout";
import Sidebar from "../../components/ProfileSidebar/Sidebar";
import { useState } from 'react';
import axios from 'axios';

const ProfileDelete = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isModalOpened, setIsModalOpened] = useState(false);

    const handleModal = () => {
        setIsModalOpened(!isModalOpened);
    };

    // 로그인 후 저장된 토큰 가져오는 함수
    const getToken = () => {
    return localStorage.getItem('token'); // 쿠키 또는 로컬 스토리지에서 토큰을 가져옴
    };

    // 서버에 정보를 요청하는 함수
    const fetchUserInfo = async () => {
        console.log('myPage');
        try {
            const token = getToken(); // 토큰 가져오기
            const response = await axios.get('/api/member/myPage/editProfile', {
            headers: {
                Authorization: `Bearer ${token}` // 헤더에 토큰 추가
            }
            });
            if(response.status === 200) {
                setUserInfo(response.data); // 서버에서 받은 사용자 정보 반환
            }
            else if(response.status === 400) {
                console.log('클라이언트 에러(입력 형식 불량)');
            }
            else if(response.status === 500) {
                console.log('서버에러');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            throw error;
        }
    };

    // useEffect(() => {
    //     fetchUserInfo();
    // }, [])

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ overflowY: "auto" }}>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h4 className="h4">계정 탈퇴</h4>
                        </div>
                        <div className="mb-3 row" style={{ textAlign: "center" }}>
                            {/* 탈퇴하기 버튼에 모달 열기 함수 연결 */}
                            <button type="button" className="btn btn-primary btn-sm" style={{ width: "100px" }} onClick={handleModal}>탈퇴하기</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 모달 */}
            {isModalOpened && (
                <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">탈퇴하기</h5>
                            </div>
                            <div className="modal-body">
                                탈퇴하기 입력 후 '탈퇴'버튼을 클릭하면 탈퇴됩니다.
                                <div style={{textAlign:"center", marginTop:"20px"}}><input placeholder="탈퇴하기"></input></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleModal}>닫기</button>
                                <button type="button" className="btn btn-primary">탈퇴</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ProfileDelete;
