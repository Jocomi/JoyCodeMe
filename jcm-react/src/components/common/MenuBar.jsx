// MenuBar.jsx
import { Link } from 'react-router-dom';
import '../../css/common/MenuBar.css';

const MenuBar = ({ isLoggedIn, userInfo, onLogout }) => {
    console.log(userInfo); // userInfo에 status가 포함되어 있는지 확인

    return (
        <div className="navbar">
            <div className="logo">
                <img src="/logoImg/menubar_logo(none).jpg" alt="로고" className="logoImg" />
                <Link to="/">JCM</Link>
            </div>
            <ul>
                <li><Link to="introduce">회사소개</Link></li>
                <li><Link to="techIntro">기술소개</Link></li>
                <li><Link to="webSetUp">웹 제작</Link></li>
                <li><Link to="paymentMethod">결제관리</Link></li>
                <li><Link to="notice">고객지원</Link></li>
                <li><Link to="guide">가이드</Link></li>
                {isLoggedIn && userInfo && userInfo.status === 'A' && (
                    <li><Link to="admin/AdminDashboard">관리자</Link></li>
                )}
            </ul>
            <div className="user-options">
                {isLoggedIn ? (
                    <>
                        <Link to="/myPage">MyPage</Link>
                        &nbsp;
                        <span onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</span>
                    </>
                ) : (
                    <Link to="signIn">SIGN IN</Link>
                )}
            </div>
        </div>
    );
}

export default MenuBar;
