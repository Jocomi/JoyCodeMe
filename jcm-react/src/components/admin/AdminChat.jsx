import AdminSideBar from "./AdminSideBar";
import '../../css/admin/Chat.css';


const AdminChat = () =>{
    return(
    <>
        <div className="chat-main">
            <AdminSideBar/>
            <div className="main-content">
                <h1>Chat</h1>
                <hr />
                <section className="chat">
                    <h2>Chat with Customers</h2>
                    <p>No new messages at the moment.</p>
                </section>
            </div>
        </div>
    </>
    )
}

export default AdminChat;