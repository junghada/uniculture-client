import { Link, useNavigate } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import styles from './Profile.module.css';
import Layout from "../../components/Layout";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [friends, setFriends] = useState([]); //친구 목록
    const navigate = useNavigate();

    // 로그인 후 저장된 토큰 가져오는 함수
    const getToken = () => {
        return localStorage.getItem('accessToken'); // 쿠키 또는 로컬 스토리지에서 토큰을 가져옴
    };

    // 서버에 정보를 요청하는 함수
    const fetchUserInfo = async () => {
        try {
            const token = getToken(); // 토큰 가져오기
            if (!token) {
                // 토큰이 없으면 로그인 페이지로 이동
                navigate('/sign-in');
                return;
            }
            const response = await axios.get('/api/auth/member/myPage', {
                headers: {
                    Authorization: `Bearer ${token}` // 헤더에 토큰 추가
                }
            });
            if (response.status === 200) {
                setUserInfo(response.data); // 서버에서 받은 사용자 정보 저장
            } else {
                console.log('서버 응답 오류:', response.status);
            }
        } catch (error) {
            console.error('사용자 정보를 가져오는 도중 오류 발생:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    // 친구 목록 조회
    const friendList = async () => {
        try {
            const token = getToken(); // 토큰 가져오기
            if (!token) {
                // 토큰이 없으면 로그인 페이지로 이동
                alert("로그인 해주세요.")
                navigate('/sign-in');
                return;
            }
            const response = await axios.get('/api/auth/friend', {
                headers: {
                    Authorization: `Bearer ${token}` // 헤더에 토큰 추가
                }
            });
            if (response.status === 200) {
                setFriends(response.data);
            } else {
                console.log('서버 응답 오류:', response.status);
            }
        } catch (error) {
            console.error('사용자 정보를 가져오는 도중 오류 발생:', error);
        }
    };

    return (
        <Layout>
            <div className={styles.profile}>
                <div className={styles.left}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={userInfo?.profileImage ? userInfo.profileImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                            alt="profile"
                            className={styles.image}
                        />
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.name}>{userInfo?.nickname}</div>
                    <div className={styles.edit}>
                        <Link to="/accounts/edit">
                            <IoIosSettings size={20} color="gray" />
                        </Link>
                    </div>
                    {userInfo?.introduce && <div className={styles.intro}>{userInfo.introduce}</div>}
                    <div>
                        <div className={styles.post}>게시글</div>
                        <div className={styles.postNum}>{userInfo?.postnum}</div>
                        <div className={styles.friend} onClick={()=> {setShowModal(true)}}>친구</div>
                        <div className={styles.friendNum} onClick={()=> {setShowModal(true)}}>{userInfo?.friendnum}</div>
                    </div>
                </div>
            </div>

            {/* 모달 */}
            {showModal && (
                <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">친구리스트</h5>
                            </div>
                            <div className="modal-body">
                                친구리스트
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>닫기</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Profile;
