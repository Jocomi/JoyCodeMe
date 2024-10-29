import {Link} from 'react-router-dom';
import '../../css/MenuBar.css'

const MenuBar = () => {
    return(
        <div className="navbar">
            <div className="logo">
            <img src="../logoImg/menubar_logo(none).JPG" className="logoImg"/>
            <Link to="/">JCM</Link>
            </div>
            <ul>
            <li><Link to="Introduce">회사소개</Link></li>
            <li><Link to="#">기술소개</Link></li>
            <li><Link to="#">웹 제작</Link></li>
            <li><Link to="Support">고객 지원</Link></li>
            <li><Link to="#">가이드</Link></li>
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