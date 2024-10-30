import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/user/EditProfile.css';

const EditProfile = () => {
    const profilePictureContainerRef = useRef(null);
    const profilePictureInputRef = useRef(null);
    const profilePictureRef = useRef(null);
    const navigate = useNavigate();

    // 이미지 미리보기 기능
    function previewImage(event) {
        const reader = new FileReader();
        reader.onload = function() {
            if (profilePictureRef.current) {
                profilePictureRef.current.style.backgroundImage = `url(${reader.result})`;
            }
        };
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    // 프로필 사진 클릭 시 파일 선택 창 열기
    function triggerFileInput() {
        profilePictureInputRef.current.click();
    }

    // 드래그 앤 드롭 기능
    React.useEffect(() => {
        const profilePictureContainer = profilePictureContainerRef.current;
        const profilePicture = profilePictureRef.current;

        if (profilePictureContainer) {
            profilePictureContainer.addEventListener('dragover', (e) => {
                e.preventDefault();
                profilePicture.classList.add('dragging');
            });

            profilePictureContainer.addEventListener('dragleave', () => {
                profilePicture.classList.remove('dragging');
            });

            profilePictureContainer.addEventListener('drop', (e) => {
                e.preventDefault();
                profilePicture.classList.remove('dragging');

                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function() {
                        profilePicture.style.backgroundImage = `url(${reader.result})`;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        return () => {
            // Cleanup event listeners on unmount
            if (profilePictureContainer) {
                profilePictureContainer.removeEventListener('dragover', () => {});
                profilePictureContainer.removeEventListener('dragleave', () => {});
                profilePictureContainer.removeEventListener('drop', () => {});
            }
        };
    }, []);

    return (
        <>
            {/* 프로필 수정 페이지 컨테이너 */}
            <div className="edit-profile-container">
                <h1>Edit Profile</h1>

                {/* 프로필 사진 수정 */}
                <div
                    className="profile-picture-container"
                    id="profile-picture-container"
                    onClick={triggerFileInput}
                    ref={profilePictureContainerRef}
                >
                    <div id="edit-profile-picture" className="profile-picture" ref={profilePictureRef}></div>
                </div>
                <label className="upload-label" htmlFor="profile-picture-input">프로필 사진 변경</label>
                <input
                    type="file"
                    id="profile-picture-input"
                    accept="image/*"
                    onChange={(event) => previewImage(event)}
                    ref={profilePictureInputRef}
                />

                {/* 이름 수정 */}
                <div className="edit-form-group">
                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" name="name" placeholder="홍길동" />
                </div>

                {/* 이메일 수정 */}
                <div className="edit-form-group">
                    <label htmlFor="email">이메일</label>
                    <input type="email" id="email" name="email" placeholder="honggildong@example.com" />
                </div>

                {/* 등급 수정 (읽기 전용) */}
                <div className="edit-form-group">
                    <label htmlFor="rank">등급</label>
                    <input type="text" id="rank" name="rank" value="VIP" readOnly />
                </div>

                {/* 저장 및 취소 버튼 */}
                <button type="submit">저장</button>
                <button type="button" onClick={() => navigate(-1)}>취소</button>
            </div>
        </>
    );
};

export default EditProfile;
