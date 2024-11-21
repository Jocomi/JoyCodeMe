import { NavLink } from "react-router-dom";
import '../../css/admin/AdminSideBar.css';

const AdminSideBar = () => {
    return(
        <>
                {/* 사이드바 */}
            <nav className="admin-sidebar">
                <h2>ADMIN</h2>
                <ul>
                <li><NavLink to="/adminDashboard">Dashboard</NavLink></li>
                <li><NavLink to="/subscribe">Subscribe</NavLink></li>
                <li><NavLink to="/customer">Customer</NavLink></li>
                <li><NavLink to="/adminChat">Chat</NavLink></li>
                <li><NavLink to="/posts" state={{ boardType: "project" }}>Posts</NavLink></li>
                <li><NavLink to="/qna">Q & A</NavLink></li>
                <li><NavLink to="/report">Report</NavLink></li>
                </ul>
            </nav>
        </>
    )
}
export default AdminSideBar;