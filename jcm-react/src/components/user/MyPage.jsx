import React, { useContext, useEffect, useState } from 'react';
import { LoginUser } from '../../App';
import { Link } from 'react-router-dom';
import '../../css/user/MyPage.css';

const MyPage = () => {
    const { data: loginUser } = useContext(LoginUser);
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        if (loginUser) {
            const updatedProfileImage = loginUser.pImg
                ? `${loginUser.pImg}?t=${new Date().getTime()}`
                : '/img/TEST.JPG';
            setProfileImage(updatedProfileImage);
        }
    }, [loginUser]);

    return (
        <div className="mypage-container">
            <div className='mypage-main'>
                <h1>My Page</h1>
                <div className="profile-section">
                    <img src={profileImage} alt="프로필 사진" className="profile-picture" />
                    <h2>이름 : {loginUser?.memberName || '이름이 설정되지 않았습니다'}</h2>
                    <p>등급 : VIP</p>
                    <p>이메일: {loginUser?.email || '이메일이 설정되지 않았습니다'}</p>
                </div>
                <Link to='/projectHistory'><button>사용 기록</button></Link>
                <Link to='/EditProfile'><button>프로필 수정</button></Link>
                <Link to='/ChangePwd'><button>비밀번호 변경</button></Link>
            </div>
        </div>
    );
};

export default MyPage;
