import '../../css/MyPage.css'
import {Link} from 'react-router-dom';

const MyPage =() => {
    return(
        <div class="mypage-container">
            <h1>My Page</h1>

            {/* <!-- 프로필 섹션 --> */}
            <div class="profile-section">
            <div class="profile-picture"></div> 
            {/* <!-- 여기에 프로필 사진을 넣을 수 있습니다 --> */}
            <h2>홍길동</h2>
            <p>등급 : VIP</p>
            <p>이메일: honggildong@example.com</p>
            </div>

            {/* <!-- 계정 설정 버튼 --> */}
            <button><Link to='/#'>사용 기록</Link></button>
            <button><Link to='/EditProfile'>프로필 수정</Link></button>
            <button><Link to='/ChangePwd'>비밀번호 변경</Link></button>
        </div>
    )
}
export default MyPage;