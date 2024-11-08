import React, { useContext, useEffect, useState } from 'react';
import { LoginUser } from '../../App';
import { Link } from 'react-router-dom';
import '../../css/user/MyPage.css';

const MyPage = () => {
    const { data: loginUser } = useContext(LoginUser);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        if (loginUser) {
            setName(loginUser.memberName);
            setEmail(loginUser.email);

            // DB에서 가져온 파일명을 사용하여 경로 설정
            setProfileImage(loginUser.pImg);
        }
    }, [loginUser]);

    return (
        <div className="mypage-container">
            <div className='mypage-main'>
                <h1>My Page</h1>

                <div className="profile-section">
                    {profileImage ? (
                        <img src={profileImage} alt="프로필 사진" className="profile-picture" />
                    ) : (
                        <div className="profile-picture-placeholder"></div>
                    )}

                    <h2>이름 : {name}</h2><br />
                    <p>등급 : VIP</p>
                    <p>이메일: {email}</p>
                </div>

                <Link to='/projectHistory'><button>사용 기록</button></Link>
                <Link to='/EditProfile'><button>프로필 수정</button></Link>
                <Link to='/ChangePwd'><button>비밀번호 변경</button></Link>
            </div>
        </div>
    );
}

export default MyPage;
