import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../App';
import AddressModal from './AddressModal';
import '../../css/user/EditProfile.css';


const EditProfile = () => {
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
    
    const [popup, setPopup] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(profileData.pImg); // 미리보기 이미지 URL

    useEffect(() => {
        if (loginUser && loginUser.pImg) {
            setProfileData((prevData) => ({
                ...prevData,
                memberId: loginUser.memberId,
                email: loginUser.email,
                address: loginUser.address,
                phone: loginUser.phone,
                pImg: loginUser.pImg || '/img/TEST.JPG',
            }));
            setPreviewImageUrl(loginUser.pImg || '/img/TEST.JPG');
        }
    }, [loginUser]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        let updatedPImgPath = profileData.pImg;

        if (imageFile) {
            const uploadResult = await uploadImage(imageFile);
            if (uploadResult) {
                updatedPImgPath = uploadResult;
            } else {
                alert("이미지 업로드에 실패하여 기존 이미지가 유지됩니다.");
            }
        }

        if (!updatedPImgPath || updatedPImgPath === 'null') {
            updatedPImgPath = '/img/TEST.JPG';
        }

        try {
            const response = await fetch(`http://${window.location.hostname}:7777/editProfile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...profileData, pImg: updatedPImgPath }),
            });

            if (response.ok) {
                const updatedUser = await response.json();

                console.log('Updated user:', updatedUser);
                sessionStorage.setItem('loginUser', JSON.stringify(updatedUser));
                setLoginUser(updatedUser);

                alert('프로필이 성공적으로 변경되었습니다.');
                setTimeout(() => {
                    navigate('/myPage');
                }, 100);
            } else {
                alert('프로필 변경에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    console.log('Profile data 1:', profileData);

    const previewImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImageUrl(reader.result);
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

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('memberId', profileData.memberId);
    
        try {
            const response = await fetch(`http://${window.location.hostname}:7777/uploadProfileImage`, {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const fileName = await response.json();
    
                // 파일명이 문자열이고 유효한 경우에만 반환
                if (typeof fileName === 'string' && fileName) {
                    return `/img/${fileName}`;
                } else {
                    console.error('Invalid file name received:', fileName);
                    alert('이미지 업로드에 실패했습니다: 잘못된 응답 형식');
                }
            } else {
                console.error(`Error ${response.status}: ${response.statusText}`);
                alert(`이미지 업로드 실패: 서버 응답 상태 ${response.status}`);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('이미지 업로드 중 오류 발생');
        }
        
        return null; // 오류가 발생하거나 실패한 경우 null 반환
    };
    

    const profileImageUrl = previewImageUrl || '/img/TEST.JPG';

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-main">
                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="profile-picture-container">
                        <div
                            className="profile-picture"
                            onClick={() => profilePictureInputRef.current.click()}
                            ref={profilePictureRef}
                            style={{ backgroundImage: `url(${profileImageUrl})` }}
                        ></div>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={previewImage}
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
                        />
                    </div>
                    <div className="edit-form-group">
                        <label htmlFor="address">주소</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={profileData.address}
                            onChange={handleInputChange}
                        />
                        <button type="button" className="address-btn" onClick={handleComplete}>
                            주소 찾기
                        </button>
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
                    <button type="button" onClick={() => navigate(-1)}>취소</button>
                </form>
            </div>
            {popup && (
                <>
                    <div className="addressmodal-overlay" onClick={handleComplete}></div>
                    <AddressModal
                        company={{ address: profileData.address }}
                        setCompany={(data) =>
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
