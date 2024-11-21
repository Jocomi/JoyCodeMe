import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/user/EmailVerification.css";

const EmailVerification = () => {
    const [memberId, setMemberId] = useState("");
    const [email, setEmail] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const [verificationCodeSent, setVerificationCodeSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSendCode = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            await axios.post(`http://${window.location.hostname}:7777/sendCode`, {memberId, email });
            setVerificationCodeSent(true);
            alert("인증 코드가 이메일로 전송되었습니다.");
        } catch (error) {
            console.error(error);
            setErrorMessage("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const response = await axios.post(`http://${window.location.hostname}:7777/verifyCode`, {
                memberId,
                code: confirmCode,
            });
            if (response.data) {
                setIsCodeVerified(true);
                alert("인증 코드가 확인되었습니다.");
            } else {
                setErrorMessage("인증 코드가 일치하지 않습니다.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("인증 코드 확인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleNavigateToResetPassword = () => {
        navigate("/setPassword", { state: { memberId } });
    };

    return (
        <div className="emailverification-container">
            <h2>비밀번호 변경</h2>

            {!verificationCodeSent && (
                <form onSubmit={handleSendCode}>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">코드 전송</button>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
            )}

            {verificationCodeSent && !isCodeVerified && (
                <form onSubmit={handleVerifyCode}>
                    <input
                        type="text"
                        placeholder="인증 코드"
                        value={confirmCode}
                        onChange={(e) => setConfirmCode(e.target.value)}
                        required
                    />
                    <button type="submit">인증 코드 확인</button>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
            )}

            {isCodeVerified && (
                <button className="resetbutton" onClick={handleNavigateToResetPassword}>비밀번호 재설정</button>
            )}
        </div>
    );
};

export default EmailVerification;
