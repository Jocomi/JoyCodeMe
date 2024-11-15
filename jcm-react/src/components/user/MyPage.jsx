import React, { useContext, useEffect, useState } from 'react';
import { LoginUser } from '../../App';
import { Link } from 'react-router-dom';
import '../../css/user/MyPage.css';
import instance from '../../shared/axios';

const MyPage = () => {
    useEffect(() => {
        instance.get(`http://${window.location.hostname}:3000/`);
      }, []);

    const { data: loginUser } = useContext(LoginUser);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [SocialLogin, setSocialLogin] = useState(false);

    useEffect(() => {
        if (loginUser) {
            setProfileImage(loginUser.pImg ? `http://${window.location.hostname}:7777${loginUser.pImg}` : `/img/TEST.JPG`);
            setName(loginUser.memberName || '');
            setEmail(loginUser.email || '');
            setSocialLogin(loginUser.SocialLogin);
        }
    }, [loginUser]);

    return (
        <div className="mypage-container">
            <div className="mypage-main">
                <h1>My Page</h1>

                <div className="mypage-profile-section">
                    {profileImage ? (
                        <img src={profileImage} alt="프로필 사진" className="mypage-profile-picture" />
                    ) : (
                        <div className="mypage-profile-picture-placeholder"></div>
                    )}
                    <h2>이름 : {name}</h2>
                    <p>등급 : VIP</p>
                    <p>이메일: {email}</p>
                </div>

                <div className="mypage-button-container">
                    <Link to='/projectHistory'><button>사용 기록</button></Link>
                    <Link to='/EditProfile'><button>프로필 수정</button></Link>
                    {/* 소셜 로그인이 아닌 경우에만 비밀번호 변경 버튼 표시 */}
                    {!SocialLogin && <Link to='/ChangePwd'><button>비밀번호 변경</button></Link>}
                </div>
            </div>
        </div>
    );
};

export default MyPage;
