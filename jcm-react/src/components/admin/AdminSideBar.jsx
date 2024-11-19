import { NavLink } from "react-router-dom";
import '../../css/admin/AdminSideBar.css';

const AdminSideBar = () => {
    return(
        <>
                {/* 사이드바 */}
            <nav className="admin-sidebar">
                <h2>ADMIN</h2>
                <ul>
                <li><NavLink to="/Admin/AdminDashboard">Dashboard</NavLink></li>
                <li><NavLink to="/Admin/Subscribe">Subscribe</NavLink></li>
                <li><NavLink to="/Admin/Customer">Customer</NavLink></li>
                <li><NavLink to="/Admin/Posts" state={{ boardType: "project" }}>Posts</NavLink></li>
                <li><NavLink to="/Admin/AdminChat">Chat</NavLink></li>
                <li><NavLink to="/Admin/qna">Q & A</NavLink></li>
                </ul>
            </nav>
        </>
    )
}
export default AdminSideBar;