import AdminSideBar from "./AdminSideBar";
import '../../css/admin/Chat.css';
import AdminTopBar from "./AdminTopBar";

const AdminChat = () =>{
    return(
    <>
        <div class="chat-main">
            <AdminSideBar/>
            <div class="main-content">
                <AdminTopBar/>
                <section class="chat">
                    <h1>Chat with Customers</h1>
                    <p>No new messages at the moment.</p>
                </section>
            </div>
        </div>
    </>
    )
}

export default AdminChat;