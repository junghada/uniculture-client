import Layout from "../../components/Layout";
import Sidebar from "../../components/ProfileSidebar/Sidebar";
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

const ProfileEdit = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const selectFile = useRef(null);

    // 로그인 후 저장된 토큰 가져오는 함수
    const getToken = () => {
        return localStorage.getItem('accessToken'); // 쿠키 또는 로컬 스토리지에서 토큰을 가져옴
        return localStorage.getItem('accessToken'); // 쿠키 또는 로컬 스토리지에서 토큰을 가져옴
    };
    
    // 서버에 정보를 요청하는 함수
    const fetchUserInfo = async () => {
        console.log('myPage');
        try {
            const token = getToken(); // 토큰 가져오기
            const response = await axios.get('/api/auth/member/editProfile', {
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
    
    useEffect(() => {
        fetchUserInfo();
    }, [])

    //회원정보 수정
    const changeInfo = async () => {
        console.log('changeInfo');
        try {
            const token = getToken(); // 토큰 가져오기
            const response = await axios.patch(
                '/api/auth/member/editProfile',
                {
                    introduce: userInfo.introduce
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // JSON 형식임을 명시
                        'Authorization': `Bearer ${token}` // 헤더에 토큰 추가
                    }
                }
            );
            alert(JSON.stringify(userInfo));
            console.log('서버 응답: ', response);
            console.log('response.status: ', response.status);
            if (response.status === 200) {
                alert("수정 완료");
                window.location.reload();
            }
            else if (response.status === 400) {
                console.error("클라이언트에러");
            }
            else {
                console.error("서버에러");
            }
        } catch (error) { // 네트워크 오류 등 예외 처리
            console.error(error);
        }
    };

    //소개 변경
    const changeIntroduce = (e) => {
        setUserInfo({...userInfo, introduce : e.target.value});
    };

    // 프로필 사진 변경
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setProfileImg(reader.result);
        };
    };
    
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
                            <div 
                                className="imageWrapper"
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    overflow: "hidden",
                                    borderRadius: "50%",
                                    padding: "0"
                                }}
                            >
                                <img
                                    src={profileImg ? profileImg : (userInfo?.profileurl ? userInfo.profileurl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")}
                                    alt="profile"
                                    style={{
                                        width:"100%",
                                        height: "100%",
                                        objectFit:"cover"
                                    }}                      
                                />
                            
                            </div>
                        </div>

                        <div className="mb-4 row justify-content-center">
                            <button type="button" style={{width:"80px", marginRight:"15px"}} onClick={()=>{setProfileImg(null); setUserInfo({...userInfo, profileurl: null})}}>삭제</button>
                            <button type="file" style={{width:"80px"}} accept='image/*' onClick={() => selectFile.current.click()} >변경</button>
                            <input 
                                type="file" 
                                accept='image/*'
                                style={{ display: "none" }}
                                ref={selectFile} //input에 접근 하기위해 useRef사용
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">소개</label>
                            <div className="col-sm-10">
                                <input 
                                    className="form-control" 
                                    placeholder="소개 입력" 
                                    value={userInfo?.introduce}
                                    onChange={changeIntroduce}
                                />
                            </div>
                        </div>

                        <div className="mb-5 row">
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

                        <div className="row justify-content-center">
                            <button type="button" style={{width:"80px", marginRight:"15px", borderRadius:"10%", backgroundColor:"rgb(176, 176, 176)", border:"1px solid"}} onClick={()=>{alert(JSON.stringify(userInfo));}}>취소</button>
                            <button type="button" style={{width:"80px", borderRadius:"10%", backgroundColor:"#B7DAA1", border:"1px solid"}} onClick={changeInfo}>수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileEdit;
