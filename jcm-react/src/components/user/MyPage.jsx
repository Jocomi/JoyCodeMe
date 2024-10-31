import '../../css/user/MyPage.css'
import {Link} from 'react-router-dom';

const MyPage =() => {
    return(
        <div className="mypage-container">
            <div className='mypage-main'>
            <h1>My Page</h1>

            {/* <!-- 프로필 섹션 --> */}
            <div className="profile-section">
            <div className="profile-picture"></div> 
            {/* <!-- 여기에 프로필 사진을 넣을 수 있습니다 --> */}
            <h2>홍길동</h2>
            <p>등급 : VIP</p>
            <p>이메일: honggildong@example.com</p>
            </div>

            {/* <!-- 계정 설정 버튼 --> */}
            <Link to='/projectHistory'><button>사용 기록</button></Link>
            <Link to='/EditProfile'><button>프로필 수정</button></Link>
            <Link to='/ChangePwd'><button>비밀번호 변경</button></Link>
            </div>
        </div>
    )
}
export default MyPage;