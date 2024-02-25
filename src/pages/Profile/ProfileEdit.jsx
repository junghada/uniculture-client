import Layout from "../../components/Layout";
import Sidebar from "../../components/ProfileSidebar/Sidebar";
import axios from 'axios';
import { useState, useEffect } from 'react';

const ProfileEdit = () => {
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
            const response = await axios.get('/api/auth/member/editProfile', {
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
                    <Sidebar/>

                    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ overflowY: "auto" }}>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h4 className="h4">프로필 편집</h4>
                        </div>
                        <div className="mb-3 row justify-content-center">
                            <div style={{width:"100px", height:"100px", backgroundColor:"black", color:"white"}}>이미지</div>
                            
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">소개</label>
                            <div className="col-sm-10">
                                <input className="form-control" placeholder="소개"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">취미</label>
                            <div className="col-sm-10">
                                <input type="checkbox" className="btn-check" id="btn-check-1" autocomplete="off"/>
                                <label className="btn btn-outline-primary" for="btn-check-1">요리</label>

                                <input type="checkbox" className="btn-check" id="btn-check-2" autocomplete="off"/>
                                <label className="btn btn-outline-primary" for="btn-check-2">산책</label>

                                <input type="checkbox" className="btn-check" id="btn-check-3" autocomplete="off"/>
                                <label className="btn btn-outline-primary" for="btn-check-3">쇼핑</label>

                                <input type="checkbox" className="btn-check" id="btn-check-4" autocomplete="off"/>
                                <label className="btn btn-outline-primary" for="btn-check-4">여행</label>

                                <input type="checkbox" className="btn-check" id="btn-check-5" autocomplete="off"/>
                                <label className="btn btn-outline-primary" for="btn-check-5">드라이브</label>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileEdit;
