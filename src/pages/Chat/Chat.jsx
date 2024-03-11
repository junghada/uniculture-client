import React from "react";
import Header from "../../components/Header/Header";
import ChatList from "../../components/Chat/ChatList";
import ChatMain from "../../components/Chat/ChatMain";
import "../../components/PageLayout/PageLayout.css"

const Chat = () => {
    return (
        <div style={{backgroundColor: '#FBFBF3', height:'100vh'}}>
            <Header />
            <div className="page-layout">
                <section className="box">
                    <aside>
                        <ChatList />
                    </aside>
                    <div>
                        <ChatMain />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Chat;