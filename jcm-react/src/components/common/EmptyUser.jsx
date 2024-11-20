import '../../css/common/EmptyUser.css'
import { Link } from 'react-router-dom';

const EmptyUser = () => {
    return (
        <div className="emptyUser-container">
            <div className="emptyUser-main">
                <h1>※ Invalid Access ※</h1>
                <h1>로그인 후 사용 가능한 메뉴입니다!</h1>            
            <Link to="/signIn" className="login-link">로그인하러 가기</Link>
            </div>
        </div>
    )
}

export default EmptyUser;
