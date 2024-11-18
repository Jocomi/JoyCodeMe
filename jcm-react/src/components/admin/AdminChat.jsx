import AdminSideBar from "./AdminSideBar";
import '../../css/admin/Chat.css';

const AdminChat = () => {
    const handleButtonClick = () => {
        window.open("https://desk.channel.io/#/channels/183715/team_chats/groups/417412", "_blank");
    };

    return (
        <>
            <div className="chat-main">
                <AdminSideBar />
                <div className="main-content">
                    <h1>Chat</h1>
                    <hr />
                    <section className="chat">
                        <h2>채팅 관리</h2>
                        <button className="chat-button" onClick={handleButtonClick}>
                            채팅 관리 페이지
                        </button>
                    </section>
                </div>
            </div>
        </>
    );
};

export default AdminChat;
