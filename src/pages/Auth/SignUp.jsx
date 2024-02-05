//회원 가입 페이지
import React, {useEffect, useState} from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Auth.css';

const SignUp = () => {
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [nickName, setNickName] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 비밀번호를 텍스트 형태로 보여줄지 여부 결정
    const [showPassword2, setShowPassword2] = useState(false); // 비밀번호2를 텍스트 형태로 보여줄지 여부 결정
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [nickNameValid, setNickNameValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const resetInput = () => {
        setEmail('');
        setPw('');
        setPw2('');
        setNickName('');
    }

    const handleInputClick = async (e) => {
        console.log('sing-up');
        const request_data = { email: email, password: pw, nickname: nickName };
        console.log('req_data: ', request_data);
        try{
            let response = await axios({
                method: 'post',
                url: '/api/auth/signup',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(request_data)
            });
            console.log('서버 응답: ', response);
            console.log('response.status: ', response.status);
            if(response.status === 200) {
                alert("회원가입이 완료되었습니다!")
                //navigate("/", {});
            }
            else if(response.status === 400) {
                alert("이미 가입한 이메일입니다.")
                resetInput();
            }
            else {
                alert("회원가입에 실패하였습니다.")
                resetInput();
            }
        } catch (err) {
            resetInput();
        }
    }

    // 닉네임 중복 검사
    const handleNickName = async (e) => {
        console.log(`handleNickName: ${nickName}`);

        try {
            let response = await axios({
                method: 'get',
                url: `/api/auth/check?nickname=${nickName}`,
                headers: {'Content-Type': 'application/json'},
            });
            console.log(`api 요청 후: ${nickName}`);
            if (response.status === 200) {
                alert("사용 가능한 닉네임 입니다")
                setNickNameValid(true); // 닉네임이 유효하다는 것을 나타냄
            } else {
                setNickNameValid(false); // 닉네임이 유효하지 않다는 것을 나타냄
            }
        } catch (err) {
            console.error(err);
        }

        console.log('끝');
    };

    const changeNickName = (e) => {
        setNickName(e.target.value);
        console.log(`e.tartget.value: ${e.target.value}`);
        console.log(`nickName: ${nickName}`);
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
    const handlePw2 = (e) => {
        setPw2(e.target.value);
        if (e.target.value === pw) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    };

    useEffect(() => {
        if(emailValid && pwValid && nickNameValid) {
            setNotAllow(false); // 버튼 비활성화 해제
            return;
        }
        setNotAllow(true); // 기본적인 상황: 비활성화
    }, [emailValid, pwValid, nickNameValid]); // 이메일, 비밀번호 state 값이 변경될 때마다 useEffect 실행

    // 비밀번호 토글 함수
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };


    return (
        <div style={{ backgroundColor: '#FBFBF3', minHeight: '100vh' }}>
            <div className="auth-page">
                <div className="title">회원가입</div>
                <div className="sub-title">너와 나의 언어교류
                    <span style={{color: '#8BC765'}}> UniCulture</span></div>

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

                <div className="inputTitle">⚠️ 비밀번호 확인</div>
                <div className="inputWrap">
                    <input className="input" type={showPassword2 ? "text" : "password"} placeholder="영문, 숫자, 특수문자 포함 8자 이상" value={pw2} onChange={handlePw2}/>
                </div>
                <div className="errorMessageWrap">
                    {!passwordsMatch && pw2.length > 0 && (
                        <div>비밀번호가 일치하지 않습니다.</div>
                    )}
                </div>
                <label>
                    <input type='checkbox' className="custom-checkbox" onChange={toggleShowPassword2} />
                    <span className="pwCheck">비밀번호 보기</span>
                </label>

                <div className="inputTitle">🌏 닉네임</div>
                <div className="inputWrap" style={{padding: '10px'}}>
                    <input className="input" type="text" placeholder="닉네임을 입력하세요" style={{width: '80%', marginTop: '9px'}} value={nickName} onChange={changeNickName}/>
                    <button className='nickNameButton' onClick={handleNickName}>중복확인</button>
                </div>
                <div className="errorMessageWrap">
                    {nickNameValid && nickName.length > 0 && (
                        <div>이미 사용 중인 닉네임입니다.</div>
                    )}
                </div>

                <button disabled={notAllow} className="authButton" onClick={handleInputClick}>가입하기</button>
            </div>
        </div>
    )
}

export default SignUp;
