import Layout from "../../components/Layout";
import Sidebar from "../../components/ProfileSidebar/Sidebar";
import axios from 'axios';
import { useState, useEffect } from 'react';

const ProfileInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [nickNameValid, setNickNameValid] = useState(false);
    const [showNickNameValid, setShowNickNameValid] = useState(false);

    const [show, setShow] = useState(); // 모달창
    const handleShow = () => setShow(true);

    // 로그인 후 저장된 토큰 가져오는 함수
    const getToken = () => {
        return localStorage.getItem('accessToken'); // 쿠키 또는 로컬 스토리지에서 토큰을 가져옴
    };
    
    // 서버에 정보를 요청하는 함수
    const fetchUserInfo = async () => {
        console.log('myPage');
        try {
            const token = getToken(); // 토큰 가져오기
            const response = await axios.get('/api/auth/member/editInformation', {
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
    }, []);

    const changeInfo = async () => {
        console.log('changeInfo');
        try {
            const token = getToken(); // 토큰 가져오기
            const response = await axios.patch(
                '/api/auth/member/editInformation',
                {
                    nickname: userInfo.nickname,
                    age: userInfo.age,
                    gender: userInfo.gender,
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

    // 닉네임 중복 검사
    const handleNickName = async (e) => {
        console.log(`handleNickName: ${userInfo.nickname}`);

        try {
            let response = await axios({
                method: 'get',
                url: `/api/sec/check?nickname=${userInfo.nickname}`,
                headers: {'Content-Type': 'application/json'},
            });
            if (response.status === 200) {
                console.log(`api 요청 후: ${userInfo.nickname}`);
                setNickNameValid(true); // 닉네임이 유효하다는 것을 나타냄
            } else {
                setNickNameValid(false); // 닉네임이 유효하지 않다는 것을 나타냄
                setShowNickNameValid(true);
                handleShow();
            }
        } catch (err) {
            console.error(err);
        }

        console.log('끝');
    };

    const changeNickName = (e) => {
        setUserInfo({...userInfo, nickname : e.target.value});
    };

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
                            <label className="col-sm-3 col-form-label">{userInfo?.email}</label>
                        </div>

                        <div className="mb-4 row">
                            <label className="col-sm-3 col-form-label">NickName</label>
                            <input
                                className="col-sm-3 col-form-label"
                                type="text"
                                name="nickname"
                                placeholder="닉네임 입력"
                                value={userInfo?.nickname}
                                onChange={changeNickName}
                            />
                            <button className="col-sm-2" onClick={handleNickName}>중복확인</button>
                        </div>
                        <div className="mb-4 row">
                            <div className="nickNameMessageWrap">
                                {nickNameValid && (
                                    <div style={{color: "green"}}>사용 가능한 닉네임입니다.</div>
                                )}
                                {!nickNameValid && showNickNameValid && userInfo?.nickname.length > 0 && (
                                    <div style={{color: "red"}}>사용 불가능한 닉네임입니다.</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-2 row">
                            <label className="col-sm-3 col-form-label">Password</label>
                            <input className="col-sm-3 col-form-label" type="password" placeholder="현재 비밀번호 입력" />
                        </div>
                        <div className="mb-1 row">
                            <label className="col-sm-3 col-form-label"></label>
                            <input className="col-sm-3 col-form-label" type="password" placeholder="새 비밀번호 입력" />
                        </div>
                        <div className="mb-4 row">
                            <label className="col-sm-3 col-form-label"></label>
                            <input className="col-sm-3 col-form-label" type="password" placeholder="새 비밀번호 확인" />
                        </div>

                        <div className="mb-4 row">
                            <label className="col-sm-3 col-form-label">Gender</label>
                            <div className="col-sm-3 col-form-label btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="radio1"
                                    checked={userInfo?.gender == "man"}
                                    onChange={() => setUserInfo({...userInfo, gender: "man"})}
                                />
                                <label for="btnradio1" style={{marginLeft: "5px", marginRight: "20px"}}>Male</label>

                                <input
                                    type="radio"
                                    name="gender"
                                    id="radio2"
                                    checked={userInfo?.gender == "woman"}
                                    onChange={() => setUserInfo({...userInfo, gender: "woman"})}
                                />
                                <label for="btnradio2" style={{marginLeft: "5px"}}>Female</label>
                            </div>
                        </div>

                        <div className="mb-4 row">
                            <label className="col-sm-3 col-form-label">Age</label>
                            <input
                                className="col-sm-3 col-form-label"
                                type="text"
                                name="age"
                                placeholder="나이 입력"
                                value={userInfo?.age}
                                onChange={(e) => setUserInfo({...userInfo, age: parseInt(e.target.value)})}
                            />
                        </div>

                        <div className="mb-4 row justify-content-center">
                            <button type="button" className="col-sm-1 col-form-label btn btn-outline-secondary" style={{marginRight:"15px"}} onClick={()=>{alert(JSON.stringify(userInfo));}}>취소</button>
                            <button type="button" className="col-sm-1 col-form-label btn btn-outline-success" onClick={changeInfo}>수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileInfo;
