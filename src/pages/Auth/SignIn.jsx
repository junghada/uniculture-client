//회원 가입 페이지
import React, {useEffect, useState} from "react"
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import './Auth.css';
const SignIn = () => {
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 비밀번호를 텍스트 형태로 보여줄지 여부 결정
    const [notAllow, setNotAllow] = useState(true);
    const resetInput = () => {
        setEmail('');
        setPw('');
    }
    const handleLogin = async () => {
        console.log('Login start');
        try {
            const response = await axios.post(
                'api/auth/login',
                {
                    email: email,
                    password: pw,
                },
            );
            console.log('서버 응답: ', response);
            console.log('response.status: ', response.status);
            // 로그인 성공
            if (response.status === 200) {
                if(response.data.accessToken){ // null인 경우 실행되지 않음
                    localStorage.setItem('accessToken', response.data.accessToken);
                }
                navigate("/", {}); // 로그인 성공 후 메인 페이지로 이동
            }
            // 로그인 실패
            else {
                alert(response.data.message); // 에러 메시지
                resetInput();
            }
        } catch (error) { // 네트워크 오류 등 예외 처리
            resetInput();
            console.error(error);
        }
    };

    // 이메일 정규표현식 검사
    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };

    // 비밀번호 정규표현식 검사
    const handlePw = (e) => {
        setPw(e.target.value);
        const regex =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
    };

    useEffect(() => {
        if(emailValid && pwValid) {
            setNotAllow(false); // 버튼 비활성화 해제
            return;
        }
        setNotAllow(true); // 기본적인 상황: 비활성화
    }, [emailValid, pwValid]); // 이메일, 비밀번호 state 값이 변경될 때마다 useEffect 실행
    // 비밀번호 토글 함수

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{ backgroundColor: '#FBFBF3', minHeight: '100vh' }}>
            <div className="auth-layout">
                <div className="title">로그인</div>
                <div className="inputTitle">✉️ 이메일</div>
                <div className="inputWrap">
                    <input className="input" type="email" placeholder="test@example.com" value={email} onChange={handleEmail}/>
                </div>
                <div className="errorMessageWrap">
                    {!emailValid && email.length > 0 && (
                        <div>이메일 형식이 올바르지 않습니다.</div>
                    )}
                </div>
                <div className="inputTitle">🔒 비밀번호</div>
                <div className="inputWrap">
                    <input className="input" type={showPassword ? "text" : "password"} placeholder="영문, 숫자, 특수문자 포함 8자 이상" value={pw} onChange={handlePw}/>
                </div>
                <div className="errorMessageWrap">
                    {!pwValid && pw.length > 0 && (
                        <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                    )}
                </div>
                <label>
                    <input type='checkbox' className="custom-checkbox" onChange={toggleShowPassword} />
                    <span className="pwCheck">비밀번호 보기</span>
                </label>
                <button disabled={notAllow} className="authButton" onClick={handleLogin} style={{marginBottom: '7px', marginTop: '35px'}}>로그인</button>
                <div className="signUpText">
                    <Link to={"/sign-up"} style={{ textDecoration: "none"}}>
                        <div style={{color: "dimgrey"}}>회원가입</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default SignIn;