import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../App';
import AddressModal from './AddressModal';
import '../../css/user/EditProfile.css';

const EditProfile = () => {
    const profilePictureContainerRef = useRef(null);
    const profilePictureInputRef = useRef(null);
    const profilePictureRef = useRef(null);
    const navigate = useNavigate();
    const { data: loginUser, setData: setLoginUser } = useContext(LoginUser);

    const [profileData, setProfileData] = useState({
        memberId: loginUser?.memberId || '',
        email: loginUser?.email || '',
        address: loginUser?.address || '',
        phone: loginUser?.phone || '',
        pImg: loginUser?.pImg || '/img/TEST.JPG',
    });

    const [popup, setPopup] = useState(false); // 주소 모달 상태
    const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태

    useEffect(() => {
        // 기존 이미지를 프로필 데이터에 설정
        if (loginUser) {
            setProfileData((prevData) => ({
                ...prevData,
                pImg: loginUser.pImg || '/img/TEST.JPG',
            }));
        }
    }, [loginUser]);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('memberId', profileData.memberId);
    
        try {
            const response = await fetch(`http://${window.location.hostname}/uploadProfileImage`, {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const fileName = await response.json();
                setProfileData((prevData) => ({
                    ...prevData,
                    pImg: `/img/${fileName}`, // 반환된 파일명을 경로와 결합
                }));
                setLoginUser((prevData) => ({
                    ...prevData,
                    pImg: `/img/${fileName}`, // LoginUser 상태도 업데이트
                }));
            } else {
                alert('이미지 업로드 실패');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('이미지 업로드 중 오류 발생');
        }
    };
    

    const previewImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file); // 이미지 파일 설정
            const reader = new FileReader();
            reader.onload = () => {
                if (profilePictureRef.current) {
                    profilePictureRef.current.style.backgroundImage = `url(${reader.result})`;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleComplete = () => {
        setPopup(!popup); // 모달 열고 닫기
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 이미지 업로드가 완료된 후 데이터베이스 업데이트
        if (imageFile) {
            await uploadImage(imageFile); // 이미지 업로드 후 경로 설정
        }
    
        try {
            const response = await fetch(`http://${window.location.hostname}/editProfile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData),
            });
    
            if (response.ok) {
                const updatedUser = await response.json();
                setLoginUser(updatedUser); // 상태 업데이트
                alert('프로필이 성공적으로 변경되었습니다.');
                navigate('/myPage');
            } else {
                alert('프로필 변경에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-main">
                <h1>Edit Profile</h1>

                <form onSubmit={handleSubmit}>
                    {/* 프로필 사진 */}
                    <div
                        className="profile-picture-container"
                        id="profile-picture-container"
                        onClick={() => profilePictureInputRef.current.click()}
                        ref={profilePictureContainerRef}
                    >
                        <div
                            id="edit-profile-picture"
                            className="profile-picture"
                            ref={profilePictureRef}
                            style={{
                                backgroundImage: `url(${profileData.pImg})`,
                            }}
                        ></div>
                    </div>
                    <label className="upload-label" htmlFor="profile-picture-input">
                        프로필 사진 변경
                    </label>
                    <input
                        type="file"
                        id="profile-picture-input"
                        accept="image/*"
                        onChange={previewImage}
                        ref={profilePictureInputRef}
                        style={{ display: 'none' }}
                    />

                    {/* 이메일 */}
                    <div className="edit-form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            placeholder="honggildong@example.com"
                        />
                    </div>

                    {/* 주소 */}
                    <div className="edit-form-group">
                        <label htmlFor="address">주소</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={profileData.address}
                            onChange={handleInputChange}
                            placeholder="주소를 입력하거나 버튼을 클릭하세요"
                        />
                        <button type="button" className="address-btn" onClick={handleComplete}>
                            주소 찾기
                        </button>
                    </div>

                    {/* 전화번호 */}
                    <div className="edit-form-group">
                        <label htmlFor="phone">전화번호</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit">저장</button>
                    <button type="button" onClick={() => navigate(-1)}>
                        취소
                    </button>
                </form>
            </div>

            {/* 주소 모달 */}
            {popup && (
                <>
                    <div className="addressmodal-overlay" onClick={handleComplete}></div>
                    <AddressModal
                        company={{ address: profileData.address }}
                        setcompany={(data) =>
                            setProfileData((prevData) => ({
                                ...prevData,
                                address: data.address,
                            }))
                        }
                    />
                </>
            )}
        </div>
    );
};

export default EditProfile;
