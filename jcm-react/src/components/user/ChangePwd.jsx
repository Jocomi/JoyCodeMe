import React, { useContext, useState } from 'react'; 
import { LoginUser } from '../../App'; // LoginUser Context import
import '../../css/user/ChangePwd.css'; 
import 'font-awesome/css/font-awesome.min.css'; 
import { useNavigate } from 'react-router-dom';


const ChangePwd = () => {
    const navigate = useNavigate();
    const { data: loginUser } = useContext(LoginUser);

    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [isCurrentPwdVisible, setCurrentPwdVisible] = useState(false);
    const [isNewPwdVisible, setNewPwdVisible] = useState(false);
    const [isConfirmPwdVisible, setConfirmPwdVisible] = useState(false);
    

    const [errors, setErrors] = useState({
        currentPwdError: '',
        confirmPwdError: ''
    });

const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 로직
    const errorObj = { currentPwdError: '', newPwdError: '', confirmPwdError: '' };
    let isValid = true;

    if (newPwd !== confirmPwd) {
        errorObj.confirmPwdError = '새로운 비밀번호가 일치하지 않습니다.';
        isValid = false;
    }

    if (!isValid) {
        setErrors(errorObj);
        return;
    }

    try {
        const response = await fetch(`http://${window.location.hostname}:7777/changePassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                memberId: loginUser.memberId, // 로그인된 사용자 ID 전달
                currentPwd: currentPwd, // 사용자가 입력한 현재 비밀번호
                newPwd: newPwd // 사용자가 입력한 새로운 비밀번호
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요.');
            sessionStorage.removeItem('loginUser');  // 세션 정보 삭제
            window.location.href = '/signIn';  // 로그인 페이지로 리다이렉트
        } else {
            alert(result.message || '비밀번호 변경에 실패했습니다.');
        }
    } catch (error) {
        console.error('비밀번호 변경 오류:', error);
        alert('서버 오류가 발생했습니다.');
    }
};

    return (
        <div className="password-container">
            <div className="password-main">
                <h1>비밀번호 변경</h1>
                <form onSubmit={handleSubmit}>
                    {/* 현재 비밀번호 */}
                    <div className="form-group">
                        <label htmlFor="current-password">현재 비밀번호</label>
                        <input
                            type={isCurrentPwdVisible ? "text" : "password"}
                            id="current-password"
                            placeholder="현재 비밀번호"
                            value={currentPwd}
                            onChange={(e) => setCurrentPwd(e.target.value)}
                        />
                        <i
                            className={`fa ${isCurrentPwdVisible ? "fa-eye" : "fa-eye-slash"} show-hide`}
                            onClick={() => setCurrentPwdVisible(!isCurrentPwdVisible)}
                        ></i>
                        {errors.currentPwdError && <div className="error">{errors.currentPwdError}</div>}
                    </div>

                    {/* 새로운 비밀번호 */}
                    <div className="form-group">
                        <label htmlFor="new-password">새로운 비밀번호</label>
                        <input
                            type={isNewPwdVisible ? "text" : "password"}
                            id="new-password"
                            placeholder="새로운 비밀번호"
                            value={newPwd}
                            onChange={(e) => setNewPwd(e.target.value)}
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
                            value={confirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
                        />
                        <i
                            className={`fa ${isConfirmPwdVisible ? "fa-eye" : "fa-eye-slash"} show-hide`}
                            onClick={() => setConfirmPwdVisible(!isConfirmPwdVisible)}
                        ></i>
                        {errors.confirmPwdError && <div className="error">{errors.confirmPwdError}</div>}
                    </div>


                    {/* 저장 및 취소 버튼 */}
                    <button type="submit">저장</button>
                    <button type="button" onClick={() => navigate(-1)}>취소</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePwd;
