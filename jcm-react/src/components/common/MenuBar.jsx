// MenuBar.jsx
import { Link } from 'react-router-dom';
import '../../css/common/MenuBar.css';
import { useContext } from 'react';
import { LoginUser } from '../../App';

const MenuBar = () => {
    const userCtx = useContext(LoginUser);
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser')); // loginUser 객체를 JSON.parse로 파싱
    const status = loginUser?.status || ''; // loginUser가 null일 경우 안전하게 status를 빈 문자열로 초기화

    const logout = () => {
        sessionStorage.removeItem('loginUser');
        window.location.href = '/'; // 메인 페이지로 이동
    }

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
                <li><Link to="announcementBoard">고객지원</Link></li>
                <li><Link to="guide">가이드</Link></li>
                {/* status가 'A'일 때만 관리자 메뉴를 보여줌 */}
                {status === 'A' && (
                    <li><Link to="admin/AdminDashboard">관리자</Link></li>
                )}
            </ul>
            <div className="user-options">
                {loginUser ? (
                    <>
                        <Link to="/myPage">MyPage</Link>
                        &nbsp;
                        <span onClick={logout} style={{ cursor: 'pointer' }}>Logout</span>
                    </>
                ) : (
                    <Link to="signIn">SIGN IN</Link>
                )}
            </div>
        </div>
    );
}

export default MenuBar;
