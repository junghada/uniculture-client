import {Link, useNavigate} from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import styles from './Profile.module.css'
import Layout from "../../components/Layout";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";

const Profile = () => {
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용
    const [userInfo, setUserInfo] = useState(null);
    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

    // 로그인 후 저장된 토큰 가져오는 함수
    const getToken = () => {
    return localStorage.getItem('accessToken'); // 쿠키 또는 로컬 스토리지에서 토큰을 가져옴
    };

    const logInWarning = () => {
        Swal.fire({
            icon: "warning",
            title: "주의",
            text: "로그인 후 이용해주세요!",
            confirmButtonColor: "#8BC765",
            confirmButtonText: "확인",
        });
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
            if(error.response.status === 500) {
                console.log('500 start');
                logInWarning();
                navigate("/sign-in", {}) // 로그인하지 않은 사용자가 프로필 조회 시 로그인 페이지로 이동
                console.log('500 end');
            }
            console.error('Error fetching user info:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [])

    return (
        <Layout>
            <div className={styles.profile}>
                <img className={styles.left} src={Image}/>
                <div className={styles.right}>
                    <div className={styles.name}>{userInfo?.nickname}</div>
                    <div className={styles.edit}><Link to="/accounts/edit"><IoIosSettings size={20} color="gray"/></Link></div>
                    {userInfo?.introduce && ( 
                        <div className={styles.intro}>{userInfo.introduce}</div>
                    )}
                    <div>
                        <div className={styles.post}>게시글</div>
                        <div className={styles.postNum}>{userInfo?.postnum}</div>
                        <div className={styles.friend}>친구</div>
                        <div className={styles.friendNum}>{userInfo?.friendnum}</div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Profile;