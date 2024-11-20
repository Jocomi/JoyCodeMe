import React, { useContext, useEffect, useState } from 'react';
import { LoginUser } from '../../App';
import { Link } from 'react-router-dom';
import '../../css/user/MyPage.css';
import instance from '../../shared/axios';

const MyPage = () => {
    // 초기 데이터 상태 설정
    const { data: loginUser } = useContext(LoginUser);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [SocialLogin, setSocialLogin] = useState(false);
    const [latestPayProduct, setLatestPayProduct] = useState('Nomal'); // 기본값으로 'Nomal'

    // 사용자 로그인 정보를 기반으로 상태 초기화
    useEffect(() => {
        if (loginUser) {
            setProfileImage(
                loginUser.pImg
                    ? `http://${window.location.hostname}:7777${loginUser.pImg}`
                    : `/img/TEST.JPG`
            );
            setName(loginUser.memberName || '');
            setEmail(loginUser.email || '');
            setSocialLogin(loginUser.SocialLogin);

            // 최신 결제 내역 가져오기
            instance
                .get(`http://${window.location.hostname}:7777/latestPayProduct?memberId=${loginUser.memberId}`)
                .then((response) => {
                    // API 응답 데이터를 'latestPayProduct'로 설정
                    setLatestPayProduct(response.data?.data?.payProduct || 'Nomal'); // 데이터 없으면 기본값 유지
                })
                .catch((error) => {
                    console.error('결제 내역 가져오기 실패:', error);
                });
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
                    {/* 소셜 로그인이 아닌 경우에만 비밀번호 변경 버튼 표시 */}
                    {!SocialLogin && (
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
