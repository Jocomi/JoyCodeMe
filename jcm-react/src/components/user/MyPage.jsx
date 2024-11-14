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
            setProfileImage(loginUser.pImg ? `http://${window.location.hostname}:7777${loginUser.pImg}` : `/img/TEST.JPG`);
            setName(loginUser.memberName || '');
            setEmail(loginUser.email || '');
        }
    }, [loginUser]);

    return (
        <div className="mypage-container">
            <div className="mypage-main">
                <h1>My Page</h1>

                <div className="profile-section">
                    {profileImage ? (
                        <img src={profileImage} alt="프로필 사진" className="profile-picture" />
                    ) : (
                        <div className="profile-picture-placeholder"></div>
                    )}
                    <h2>이름 : {name}</h2>
                    <p>등급 : VIP</p>
                    <p>이메일: {email}</p>
                </div>

                <div className="button-container">
                    <Link to='/projectHistory'><button>사용 기록</button></Link>
                    <Link to='/EditProfile'><button>프로필 수정</button></Link>
                    <Link to='/ChangePwd'><button>비밀번호 변경</button></Link>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
