import React from 'react';

export default function FriendList({action, userInfo, deleteFriend, cancelSentFriendRequest, acceptReceivedRequest, rejectReceivedRequest}) {

    //친구 삭제
    const handleDeleteFriend = () => {
        if (window.confirm("정말 이 친구를 삭제하시겠어요?\n삭제 시 해당 친구가 친구 목록에서 사라집니다.")) {
            deleteFriend(userInfo);   
        }
    }

    //친구 신청 취소
    const handleCancelRequest = () => {
        cancelSentFriendRequest(userInfo);
    };

    //친구 신청 수락
    const handleAcceptRequest = () => {
        acceptReceivedRequest(userInfo);
    }

    //친구 신청 거절
    const handleRejectRequest = () => {
        rejectReceivedRequest(userInfo);
    }

    return (
        <div style={{ display: 'flex', width: "280px", justifyContent: 'space-between', borderBottom: '1px solid #E0E0E0', padding: '10px 0' }}>
            <div>
                {userInfo?.nickname}
            </div>

            {/* 친구 목록 */}
            {action == 'friends' && 
                <div>
                    <button 
                        onClick={handleDeleteFriend}
                        style={{ 
                            backgroundColor: 'white', 
                            color: 'black', 
                            border: 'none', 
                            borderRadius:"15px",
                            padding: '5px 10px', 
                            marginRight: '10px', 
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#B7DAA1'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                    >❌</button>

                    <button 
                        style={{ 
                            backgroundColor: 'white', 
                            color: 'black', 
                            border: 'none', 
                            borderRadius:"15px",
                            padding: '5px 10px', 
                            marginRight: '10px', 
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#B7DAA1'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                    >💌</button>
                </div>
            }

            {/* 보낸 친구 신청 */}
            {action == 'sentRequests' && 
                <div>
                    <button 
                        onClick= {handleCancelRequest}
                        style={{ 
                            backgroundColor: 'white', 
                            color: 'black', 
                            border: 'none', 
                            borderRadius:"15px",
                            padding: '5px 10px', 
                            marginRight: '10px', 
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#B7DAA1'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                    >❌</button>
                </div>
            }

            {/* 받은 친구 신청 */}
            {action == 'receivedRequests' && 
                <div>
                    <button 
                        onClick={handleRejectRequest}
                        style={{ 
                            backgroundColor: 'white', 
                            color: 'black', 
                            border: 'none', 
                            borderRadius:"15px",
                            padding: '5px 10px', 
                            marginRight: '10px', 
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#B7DAA1'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                    >❌</button>

                    <button 
                        onClick={handleAcceptRequest}
                        style={{ 
                            backgroundColor: 'white', 
                            color: 'black', 
                            border: 'none',
                            borderRadius:"15px",
                            padding: '5px 10px', 
                            cursor: 'pointer' 
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#B7DAA1'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                    >⭕️</button>
                </div>
            }

        </div>
    );
};
