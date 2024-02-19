import { Link } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import styles from './Profile.module.css'
import Layout from "../../components/Layout";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

    // 로그인 후 저장된 토큰 가져오는 함수
    const getToken = () => {
    return localStorage.getItem('token'); // 쿠키 또는 로컬 스토리지에서 토큰을 가져옴
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

    // useEffect(() => {
    //     fetchUserInfo();
    //         if(userInfo.profileImage != null)
    //             setImage(userInfo.profileImage)
    // }, [])

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