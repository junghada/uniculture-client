import Layout from "../../components/Layout";
import Sidebar from "../../components/ProfileSidebar/Sidebar";
import axios from 'axios';
import { useState, useEffect } from 'react';

const ProfileInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [originalNickname, setOriginalNickname] = useState(null);

    const [nickNameValid, setNickNameValid] = useState(null);
    const [showNickNameValid, setShowNickNameValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);

    const [exPassword, setExPassword] = useState(''); //현재 비밀번호
    const [showExPassword, setShowExPassword] = useState(false) //현재 비밀번호 보기

    const [newPassword, setNewPassword] = useState(''); //새 비밀번호
    const [showNewPassword, setShowNewPassword] = useState(false) //새 비밀번호 보기

    const [checkPassword, setCheckPassword] = useState(''); //확인 비밀번호
    const [showCheckPassword, setShowCheckPassword] = useState(false) //확인 비밀번호 보기

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
            const response = await axios.get('/api/auth/member/editInformation', {
                headers: {
                    Authorization: `Bearer ${token}` // 헤더에 토큰 추가
                }
            });
            if(response.status === 200) {
                setUserInfo(response.data); // 서버에서 받은 사용자 정보 반환
                setOriginalNickname(response.data.nickname); 
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
        fetchUserInfo();
    }, []);

    //정보 수정
    const changeInfo = async () => {
        console.log('changeInfo');
        try {
            // 수정할 데이터를 담을 객체 생성
            const requestData = {
                age: userInfo.age,
                gender: userInfo.gender,
            };

            // 닉네임이 변경되었을 경우에만 requestData에 추가
            if (userInfo.nickname !== originalNickname) {
                if(nickNameValid==null){
                    alert("닉네임 중복 확인을 해주세요.")
                    return;
                } 
                else if(!nickNameValid){
                    alert("닉네임이 유효하지 않습니다.")
                    return;
                }
                alert(userInfo.nickname + ", " + originalNickname);
                requestData.nickname = userInfo.nickname;
            }

            // 새 비밀번호가 비어있지 않을 경우에만 requestData에 추가
            if (newPassword) {
                //새 비밀번호와 확인 비밀번호가 다르면 경고 후 함수 종료
                if(newPassword != checkPassword) {
                    alert("비밀번호를 다시 입력해주세요.");
                    return;
                }
                requestData.newPassword = newPassword;
                requestData.exPassword = exPassword;
            }

            const token = getToken(); // 토큰 가져오기
            const response = await axios.patch(
                '/api/auth/member/editInformation',
                requestData,
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
            if (response.status === 200) {
                alert("수정 완료");
                window.location.reload();
            }
            else if (response.status === 400) {
                console.error("클라이언트에러");
            }
            else if (response.status === 400){
                console.error("서버에러");
            }
            else alert(response);
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

    // 토글 함수
    const toggleShowPassword = (type) => {
        switch(type) {
            case 'ex': //현재 비밀번호
                setShowExPassword(!showExPassword);
                break;
            case 'new': //새 비밀번호
                setShowNewPassword(!showNewPassword);
                break;
            case 'check': //확인 비밀번호
                setShowCheckPassword(!showCheckPassword);
                break;
            default:
                break;
        }
    };

    // 비밀번호 정규표현식 검사
    const handlePw = (pw) => {
        const regex =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(pw)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
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

                            {nickNameValid!== null && (
                                <div className="mt-2 row">
                                    <label className="col-sm-3 col-form-label"></label>
                                    <div className="col-sm-6" style={{fontWeight: "550", fontSize: "13px"}}>
                                        {nickNameValid && (
                                            <div style={{color: "green"}}>사용 가능한 닉네임입니다.</div>
                                        )}
                                        {!nickNameValid && showNickNameValid && userInfo?.nickname.length > 0 && (
                                            <div style={{color: "red"}}>사용 불가능한 닉네임입니다.</div>
                                        )}
                                    </div>
                                </div>            
                            )}
                        </div>

                        <div className="mb-2 row">
                            <label className="col-sm-3 col-form-label">Password</label>
                            <input 
                                className="col-sm-3 col-form-label" 
                                type={showExPassword ? "text" : "password"}
                                placeholder="현재 비밀번호 입력" 
                                onChange={(e) => {setExPassword(e.target.value)}}
                            />
                            <label className="col-sm-3">
                                <input type='checkbox' className="custom-checkbox" onChange={() => toggleShowPassword('ex')} />
                                <span className="pwCheck">비밀번호 보기</span>
                            </label>
                        </div>
                        
                        <div className="mb-2 row">
                            <label className="col-sm-3 col-form-label"></label>
                            <input 
                                className="col-sm-3 col-form-label" 
                                type={showNewPassword ? "text" : "password"}
                                placeholder="새 비밀번호 입력"
                                onChange={(e) => {setNewPassword(e.target.value); handlePw(e.target.value);}}
                            />
                            <label className="col-sm-3">
                                <input type='checkbox' className="custom-checkbox" onChange={() => toggleShowPassword('new')} />
                                <span className="pwCheck">비밀번호 보기</span>
                            </label>
                        </div>

                        {!pwValid && newPassword.length > 0 && (
                            <div className="mb-2 row">
                                <label className="col-sm-3 col-form-label"></label>
                                <div className="col-sm-6" style={{fontWeight: "550", fontSize: "13px"}}>
                                    <div style={{color:"red"}}>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                                </div>
                            </div>
                        )}

                        <div className="mb-4 row">
                            <label className="col-sm-3 col-form-label"></label>
                            <input 
                                className="col-sm-3 col-form-label" 
                                type={showCheckPassword ? "text" : "password"}
                                placeholder="새 비밀번호 확인" 
                                onChange={(e) => {setCheckPassword(e.target.value)}}
                            />
                            <label className="col-sm-3">
                                <input type='checkbox' className="custom-checkbox" onChange={() => toggleShowPassword('check')} />
                                <span className="pwCheck">비밀번호 보기</span>
                            </label>
                        </div>

                        <div className="mb-4 row">
                            <label className="col-sm-3 col-form-label">Gender</label>
                            <div className="col-sm-3 col-form-label btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="radio1"
                                    checked={userInfo?.gender === "MAN"}
                                    onChange={() => setUserInfo({...userInfo, gender: "MAN"})}
                                />
                                <label for="btnradio1" style={{marginLeft: "5px", marginRight: "20px"}}>MAN</label>

                                <input
                                    type="radio"
                                    name="gender"
                                    id="radio2"
                                    checked={userInfo?.gender === "WOMAN"}
                                    onChange={() => setUserInfo({...userInfo, gender: "WOMAN"})}
                                />
                                <label for="btnradio2" style={{marginLeft: "5px"}}>WOMAN</label>
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
