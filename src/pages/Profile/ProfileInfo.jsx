import Layout from "../../components/Layout";
import Sidebar from "../../components/ProfileSidebar/Sidebar";
import axios from 'axios';
import { useState, useEffect } from 'react';

const ProfileInfo = () => {
    const [userInfo, setUserInfo] = useState(null);

    // 로그인 후 저장된 토큰 가져오는 함수
    const getToken = () => {
        return localStorage.getItem('accessToken'); // 쿠키 또는 로컬 스토리지에서 토큰을 가져옴
    };
    
    // 서버에 정보를 요청하는 함수
    const fetchUserInfo = async () => {
        console.log('myPage');
        try {
            const token = getToken(); // 토큰 가져오기
            const response = await axios.get('/api/member/myPage', {
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
    
    useEffect(() => {
        fetchUserInfo();  
    }, [])

    const changeInfo = async () => {
        console.log('sing-up');
        const request_data = {password: userInfo.password, gender: userInfo.gender, age: userInfo.age };
        console.log('req_data: ', request_data);
        try{
            const token = getToken(); // 토큰 가져오기
            let response = await axios({
                method: 'post',
                url: '/api/member/myPage',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: JSON.stringify(request_data)
            });
            console.log('서버 응답: ', response);
            console.log('response.status: ', response.status);
            if(response.status === 200) {
                console.log('회원정보 수정');
            }
            else if(response.status === 400) {
                console.log('클라이언트 에러');
            }
            else {
                console.log('서버 에러');
            }
        } catch (err) {
        }
    }

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar/>
                    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ overflowY: "auto" }}>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h4 className="h4">개인정보 수정</h4>
                        </div>
                        <div className="mb-4 row">
                            <label className="col-sm-3 col-form-label">Email</label>
                            <label className="col-sm-2 col-form-label">{userInfo?.email}</label>
                        </div>

                        <div className="mb-4 row">
                            <label className="col-sm-3 col-form-label">NickName</label>
                            <label className="col-sm-2 col-form-label">{userInfo?.nickname}</label>
                        </div>

                        <div className="mb-4 row">
                            <label className="col-sm-3 col-form-label">Password</label>
                            <button className="col-sm-2 col-form-label">비밀번호 변경</button>
                        </div>

                        <div className="mb-4 row">
                            <label className="col-sm-3 col-form-label">Gender</label>
                            <div className="col-sm-3 col-form-label btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" name="btnradio" id="radio1" checked={userInfo?.gender === "man"}/>
                                <label for="btnradio1" style={{marginLeft: "5px", marginRight: "20px"}}  >Male</label>

                                <input type="radio" name="btnradio" id="radio2" checked={userInfo?.gender === "woman"}/>
                                <label for="btnradio2" style={{marginLeft: "5px"}}>Female</label>
                            </div>
                        </div>

                        <div className="mb-4 row">
                            <label className="col-sm-3 col-form-label">Age</label>
                            <label className="col-sm-2 col-form-label">{userInfo?.age}</label>
                        </div>


                        <div className="mb-4 row justify-content-center">
                            <button type="button" class="col-sm-1 col-form-label btn btn-outline-secondary" style={{marginRight:"15px"}}>취소</button>
                            <button type="button" class="col-sm-1 col-form-label btn btn-outline-success">수정</button>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileInfo;
