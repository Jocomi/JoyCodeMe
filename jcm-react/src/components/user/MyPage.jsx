import React, { useContext, useEffect, useState } from 'react';
import { LoginUser } from '../../App';
import { Link } from 'react-router-dom';
import '../../css/user/MyPage.css';
import instance from '../../shared/axios';

const MyPage = () => {
    useEffect(() => {
        instance.get(`http://${window.location.hostname}:3000/`);
      }, []);
      
    const { data: loginUser, setData: setLoginUser } = useContext(LoginUser);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [socialLogin, setSocialLogin] = useState(false);
    const [latestPayProduct, setLatestPayProduct] = useState('Nomal');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!loginUser) return;

            try {
                // 최신 사용자 데이터를 서버에서 가져오기
                const response = await instance.get(
                    `http://${window.location.hostname}:7777/profile?memberId=${loginUser.memberId}`
                );
                const userData = response.data;

                // Context와 상태 업데이트
                setLoginUser(userData);
                setName(userData.memberName || '');
                setEmail(userData.email || '');
                setProfileImage(
                    userData.pImg
                        ? `http://${window.location.hostname}:7777${userData.pImg}`
                        : `/img/TEST.JPG`
                );
                setSocialLogin(userData.socialLogin);

                // 최신 결제 내역 가져오기
                const payResponse = await instance.get(
                    `http://${window.location.hostname}:7777/latestPayProduct?memberId=${loginUser.memberId}`
                );
                setLatestPayProduct(payResponse.data?.data?.payProduct || 'Nomal');
            } catch (error) {
                console.error('사용자 데이터 또는 결제 내역 가져오기 실패:', error);
            }
        };

        fetchUserData();
    }, [loginUser]);

    return (
        <div className="mypage-container">
            <div className="mypage-main">
                <h1>My Page</h1>

                <div className="mypage-profile-section">
                    <img
                        src={profileImage}
                        alt="프로필 사진"
                        className="mypage-profile-picture"
                    />
                    <h2>이름 : {name}</h2>
                    <p>등급 : {latestPayProduct}</p>
                    <p>이메일: {email}</p>
                </div>

                <div className="mypage-button-container">
                    <Link to="/projectHistory">
                        <button>사용 기록</button>
                    </Link>
                    <Link to="/EditProfile">
                        <button>프로필 수정</button>
                    </Link>
                    {!socialLogin && (
                        <Link to="/ChangePwd">
                            <button>비밀번호 변경</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPage;
