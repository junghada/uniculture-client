import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import styles from './Profile.module.css';
import PercentBar from "../../components/PercentBar/PercentBar";
import { FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PiPlusCircleBold, PiPlusCircleFill } from "react-icons/pi";
import LanguageList from './components/LanguageList';

export default function OtherProfile({myInformation, otherInformation}) {
    const [myInfo, setMyInfo] = useState(myInformation);
    const [otherInfo, setOtherInfo] = useState(otherInformation);
    const navigate = useNavigate();

    const [maxCanLanguage, setMaxCanLanguage] = useState(); // 능숙도가 가장 높은 사용 언어
    const [maxWantLanguage, setMaxWantLanguage] = useState(); // 능숙도가 가장 높은 학습 언어

    //언어 모달창
    const [onMouseSpan, setOnMouseSpan] = useState(false);
    const [showAllLanguage, setShowAllLanguage] = useState(false);
    const [activeTab, setActiveTab] = useState('can');
    const [canLanguages, setCanLanguages] = useState([]); //사용 언어 능숙도가 높은 순
    const [wantLanguages, setWantLanguages] = useState([]); //학습 언어 능숙도가 높은 순

    // 로그인 후 저장된 토큰 가져오는 함수
    const getToken = () => {
        return localStorage.getItem('accessToken'); // 쿠키 또는 로컬 스토리지에서 토큰을 가져옴
    };

    useEffect(() => {
        // 사용 언어 배열로 변환하여 업데이트한 후 능숙도가 높은 순으로 정렬
        const canLanguagesArray = Object.entries(otherInfo.canlanguages).map(([language, value]) => ({ language, value }));
        setCanLanguages(canLanguagesArray);
        setCanLanguages(prevCanLanguages => [...prevCanLanguages].sort((a, b) => b.value - a.value));

        // 학습 언어 배열로 변환하여 업데이트한 후 능숙도가 높은 순으로 정렬
        const wantLanguagesArray = Object.entries(otherInfo.wantlanguages).map(([language, value]) => ({ language, value }));
        setWantLanguages(wantLanguagesArray);
        setWantLanguages(prevWantLanguages => [...prevWantLanguages].sort((a, b) => b.value - a.value));  
    }, [otherInfo]);

    useEffect(() => {
        setMaxCanLanguage(canLanguages[0]);
    }, [canLanguages]);
    
    useEffect(() => {
        setMaxWantLanguage(wantLanguages[0]);
    }, [wantLanguages]);


    // 언어 모달창 : 선택된 탭에 따라 해당 목록을 표시하는 함수
    const renderTabContent = () => {
        switch (activeTab) {
            case 'can':
                return (
                    <div>
                        {canLanguages && canLanguages.map((language, index) => (
                            <LanguageList key={index} language={language.language} value={language.value} color={"blue"}/>
                        ))}
                    </div>
                );
            case 'want':
                return (
                    <div>
                        {wantLanguages && wantLanguages.map((language, index) => (
                            <LanguageList key={index} language={language.language} value={language.value} color={"red"}/>
                        ))}
                    </div>
                );
        }
    };

    //친구 신청
    const sendFriendRequest = async () => {
        try {
            const token = getToken(); // 토큰 가져오기

            if(token){ //로그인 O
                const response = await axios.post('/api/auth/friend', { 
                    targetId: otherInfo.id 
                }, {
                    headers: {
                        Authorization: `Bearer ${token}` // 헤더에 토큰 추가
                    }
                });
                if(response.status ==200){
                    alert("친구 신청 성공");
                }
                else if(response.status ==400){
                    console.log("친구 신청 클라이언트 에러");
                }
                else if(response.status == 500){
                    console.log("친구 신청 서버 에러");
                }
            }
            else {
                alert("로그인 해주세요.");
                navigate("/sign-in");
            }
        } catch (error) {
            console.error('친구 걸기 오류 발생:', error);
        }
    }

    //채팅 보내기
    const sendMessage = async () => {
        try {
            const token = getToken(); // 토큰 가져오기

            if(token){ //로그인 O
                const response = await axios.post('/api/auth/friend', { 
                    targetId: otherInfo.id 
                }, {
                    headers: {
                        Authorization: `Bearer ${token}` // 헤더에 토큰 추가
                    }
                });
                if(response.status ==200){
                    alert("친구 신청 성공");
                }
                else if(response.status ==400){
                    console.log("채팅 보내기 클라이언트 에러");
                }
                else if(response.status == 500){
                    console.log("채팅 보내기 서버 에러");
                }
            }
            else {
                alert("로그인 해주세요.");
                navigate("/sign-in");
            }
        } catch (error) {
            console.error('채팅 보내기 오류 발생:', error);
        }
    }
    

    return (
        <Layout>
            <div className={styles.profile}>
                {/* 프로필 사진 */}
                <div className={styles.left}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={otherInfo?.profileImage ? otherInfo.profileImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                            alt="profile"
                            className={styles.image}
                        />
                    </div>

                    <div style={{display:"flex"}}>
                        {/* 친구 걸기/채팅 보내기 */}
                    <button
                        style={{
                            borderRadius:"15px",
                            backgroundColor:"#B7DAA1", 
                            border:"0px",
                            marginLeft: "10px",
                            width:"200px",
                            height:"30px"
                        }}
                        onClick={sendFriendRequest}
                    >친구 걸기</button>

                    <button
                        style={{
                            borderRadius:"15px",
                            backgroundColor:"#B7DAA1", 
                            border:"0px",
                            marginLeft: "10px",
                            width:"200px",
                            height:"30px"
                        }}
                        onClick={sendMessage}
                    >채팅 보내기</button>
                    </div>
                </div>

                <div className={styles.right}>

                    {/* 닉네임 */}
                    <div className={styles.name}>{otherInfo?.nickname}</div>
                    
                    {/* 소개 */}
                    {otherInfo?.introduce && <div className={styles.intro}>{otherInfo.introduce}</div>}

                    {/* 게시글, 친구 */}
                    <div>
                        <div className={styles.post}>게시글</div>
                        <div className={styles.postNum}>{otherInfo?.postnum}</div>
                        <div className={styles.friend}>친구</div>
                        <div className={styles.friendNum}>{otherInfo?.friendnum}</div>
                    </div>

                    {/* 언어 */}
                    {(maxCanLanguage || maxWantLanguage) &&
                        <div style={{ display: "flex", marginTop:"20px"}}>
                            {maxCanLanguage && <div><PercentBar language={maxCanLanguage.language} percentage={maxCanLanguage.value} color={"blue"}/></div>}
                            {maxCanLanguage && maxWantLanguage && <div style={{ marginLeft : "20px", marginRight : "20px" }}><FaExchangeAlt /></div>}
                            {maxWantLanguage && <div><PercentBar language={maxWantLanguage.language} percentage={maxWantLanguage.value} color={"red"}/></div>}
                            <span
                                style={{marginLeft: "10px"}}
                                onClick={()=> setShowAllLanguage(true)}
                                onMouseEnter={()=> setOnMouseSpan(true)}
                                onMouseLeave={()=> setOnMouseSpan(false)}
                            >
                                {onMouseSpan ? <PiPlusCircleFill size={20}/> : <PiPlusCircleBold size={20}/>}
                            </span>
                        </div>
                    }

                    {/* 취미 */}
                    {otherInfo?.hobbies && 
                        <div style={{ display: "flex", marginTop:"20px"}}>
                            {otherInfo.hobbies && otherInfo.hobbies.map((hobby, index) => (
                                <div key={index} style={{ borderRadius:"15px", backgroundColor:"#C6CAC3", padding:"2px 15px", marginRight: "10px" }}>
                                    #{hobby}
                                </div>
                            ))}
                        </div>
                    }

                    {/* 전체 사용, 학습 언어 보기 모달창 */}
                    {showAllLanguage && (
                        <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content" style={{height:"450px"}}>
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item">
                                                <button 
                                                    className={`nav-link ${activeTab === 'can' ? 'active' : ''}`} 
                                                    style={{ width:"150px", backgroundColor: activeTab === 'can' ? '#B7DAA1' : 'white', color: "black"}}
                                                    onClick={() => setActiveTab('can')}
                                                >사용 언어</button>
                                            </li>
                                            <li className="nav-item">
                                                <button 
                                                    className={`nav-link ${activeTab === 'want' ? 'active' : ''}`} 
                                                    style={{ width:"150px", backgroundColor: activeTab === 'want' ? '#B7DAA1' : 'white', color: "black"}}
                                                    onClick={() => setActiveTab('want')}
                                                >학습 언어</button>
                                            </li>
                                        </ul>

                                    <div className="modal-body">
                                        {renderTabContent()}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {setShowAllLanguage(false); setActiveTab('can')}}>닫기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </Layout>
    );
};
