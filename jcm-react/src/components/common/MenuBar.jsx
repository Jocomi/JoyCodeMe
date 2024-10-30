import {Link} from 'react-router-dom';
import '../../css/common/MenuBar.css';

const MenuBar = () => {
    return(
        <div className="navbar">
            <div className="logo">
            <img src="/logoImg/menubar_logo(none).jpg" alt="로고" className="logoImg"/>
            <Link to="/">JCM</Link>
            </div>
            <ul>
            <li><Link to="Introduce">회사소개</Link></li>
            <li><Link to="#">기술소개</Link></li>
            <li><Link to="#">웹 제작</Link></li>
            <li><Link to="#">결제관리</Link></li>
            <li><Link to="Support">고객지원</Link></li>
            <li><Link to="#">가이드</Link></li>
            <li><Link to="/Admin/AdminDashboard">관리자페이지</Link></li>
            </ul>
            <div className="user-options">
            <Link to="/MyPage">MyPage</Link>
            &nbsp;
            <Link to="SignIn">SIGN IN</Link>
            </div>
        </div>
    )
}
export default MenuBar;