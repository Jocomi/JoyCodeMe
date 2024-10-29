import '../../css/user/ChangePwd.css';
import 'font-awesome/css/font-awesome.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePwd = () => {
    const navigate = useNavigate();

    // 비밀번호 필드의 가시성을 관리하기 위한 상태
    const [isCurrentPwdVisible, setCurrentPwdVisible] = useState(false);
    const [isNewPwdVisible, setNewPwdVisible] = useState(false);
    const [isConfirmPwdVisible, setConfirmPwdVisible] = useState(false);

    return ( 
        <>
            {/* 비밀번호 변경 컨테이너 */}
            <div className="password-container">
                <h1>비밀번호 변경</h1>

                {/* 현재 비밀번호 */}
                <div className="form-group">
                    <label htmlFor="current-password">현재 비밀번호</label>
                    <input 
                        type={isCurrentPwdVisible ? "text" : "password"} 
                        id="current-password" 
                        placeholder="현재 비밀번호"
                    />
                    <i 
                        className={`fa ${isCurrentPwdVisible ? "fa-eye" : "fa-eye-slash"} show-hide`}
                        onClick={() => setCurrentPwdVisible(!isCurrentPwdVisible)}
                    ></i>
                </div>

                {/* 새로운 비밀번호 */}
                <div className="form-group">
                    <label htmlFor="new-password">새로운 비밀번호</label>
                    <input 
                        type={isNewPwdVisible ? "text" : "password"} 
                        id="new-password" 
                        placeholder="새로운 비밀번호"
                    />
                    <i 
                        className={`fa ${isNewPwdVisible ? "fa-eye" : "fa-eye-slash"} show-hide`}
                        onClick={() => setNewPwdVisible(!isNewPwdVisible)}
                    ></i>
                </div>

                {/* 비밀번호 확인 */}
                <div className="form-group">
                    <label htmlFor="confirm-password">새로운 비밀번호 확인</label>
                    <input 
                        type={isConfirmPwdVisible ? "text" : "password"} 
                        id="confirm-password" 
                        placeholder="새로운 비밀번호 확인"
                    />
                    <i 
                        className={`fa ${isConfirmPwdVisible ? "fa-eye" : "fa-eye-slash"} show-hide`}
                        onClick={() => setConfirmPwdVisible(!isConfirmPwdVisible)}
                    ></i>
                </div>

                {/* 저장 및 취소 버튼 */}
                <button type="submit">저장</button>
                <button type="button" onClick={() => navigate(-1)}>취소</button>
            </div>
        </>
    );
}

export default ChangePwd;
