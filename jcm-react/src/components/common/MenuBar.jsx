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
            <li><Link to="introduce">회사소개</Link></li>
            <li><Link to="#">기술소개</Link></li>
            <li><Link to="#">웹 제작</Link></li>
            <li><Link to="paymentMethod">결제관리</Link></li>
            <li><Link to="support">고객지원</Link></li>
            <li><Link to="guide">가이드</Link></li>
            </ul>
            <div className="user-options">
            <Link to="/myPage">MyPage</Link>
            &nbsp;
            <Link to="signIn">SIGN IN</Link>
            </div>
        </div>
    )
}
export default MenuBar;