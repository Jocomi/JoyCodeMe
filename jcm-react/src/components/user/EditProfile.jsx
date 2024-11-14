import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../App';
import AddressModal from './AddressModal';
import '../../css/user/EditProfile.css';

const EditProfile = () => {
    const profilePictureInputRef = useRef(null);
    const navigate = useNavigate();
    const { data: loginUser, setData: setLoginUser } = useContext(LoginUser);

    const [profileData, setProfileData] = useState({
        memberId: loginUser?.memberId || '',
        email: loginUser?.email || '',
        address: loginUser?.address || '',
        phone: loginUser?.phone || '',
        pImg: loginUser?.pImg || '/img/TEST.JPG',  // 기본 이미지 경로
    });

    const [popup, setPopup] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(profileData.pImg);  // 기본 프로필 이미지

    // 로그인 시 기존 이미지 설정
    useEffect(() => {
        if (loginUser) {
            setProfileData((prevData) => ({
                ...prevData,
                pImg: loginUser.pImg || '/img/TEST.JPG',
            }));
            setPreviewImageUrl(loginUser.pImg ? `http://${window.location.hostname}:7777${loginUser.pImg}` : '/img/TEST.JPG');
        }
    }, [loginUser]);

    // 이미지 업로드
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("memberId", profileData.memberId);
    
        try {
            const response = await fetch(`http://${window.location.hostname}:7777/uploadProfileImage`, {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                const fileName = await response.text(); 
                setProfileData((prevData) => ({
                    ...prevData,
                    pImg: `/img/${fileName}`,  // 업로드된 이미지 경로로 설정
                }));
                setLoginUser((prevData) => ({
                    ...prevData,
                    pImg: `/img/${fileName}`,  // 로그인 사용자 데이터 업데이트
                }));
                setPreviewImageUrl(`/img/${fileName}`);  // 미리보기 이미지 업데이트
            } else {
                alert("이미지 업로드 실패");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("이미지 업로드 중 오류 발생");
        }
    };

    // 이미지 미리보기
    const previewImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImageUrl(reader.result);  // 새 이미지를 미리보기로 업데이트
            };
            reader.readAsDataURL(file);
        }
    };

    const handleComplete = () => {
        setPopup(!popup);
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
    
        if (imageFile) {
            await uploadImage(imageFile);
        }
    
        try {
            const response = await fetch(`http://${window.location.hostname}:7777/editProfile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData),
            });
    
            if (response.ok) {
                const updatedUser = await response.json();
                setLoginUser(updatedUser);
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
                    <div className="profile-picture-container" >
                        <div
                            className="profile-picture"
                            onClick={() => profilePictureInputRef.current && profilePictureInputRef.current.click()}
                            style={{
                                backgroundImage: `url(${previewImageUrl})`,
                            }}
                        ></div>
                    </div>
                    <input
                        type="file"
                        id="profile-picture-input"
                        accept="image/*"
                        onChange={previewImage}  // 이미지 선택 시 미리보기 업데이트
                        ref={profilePictureInputRef}
                        style={{ display: 'none' }}
                    />

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

                    <div className="edit-form-group">
                        <label htmlFor="address">주소</label>
                        <div className="address-group">
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
                    </div>

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
