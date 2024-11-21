import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/user/SetPassword.css";

const SetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { memberId } = location.state || {}; // memberId 가져오기
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const passwordFilters = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/;

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);

        if (!passwordFilters.test(password)) {
            if (password.length < 6 || password.length > 20) {
                setErrorMessage("비밀번호는 6~20자로 설정해야 합니다.");
            } else {
                setErrorMessage("비밀번호는 영문자와 숫자를 포함해야 합니다.");
            }
        } else {
            setErrorMessage("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const confirm = e.target.value;
        setConfirmPassword(confirm);

        if (newPassword !== confirm) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
        } else {
            setErrorMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errorMessage) {
            alert("비밀번호 형식에 맞지 않습니다.");
            return;
        }

        if (!memberId) {
            alert("인증이 만료되었습니다. 다시 시도해 주세요.");
            return;
        }

        try {
            const response = await axios.post(`http://${window.location.hostname}:7777/setPassword`, {
                memberId,
                newPassword,
            });

            if (response.data.message === "비밀번호가 성공적으로 변경되었습니다.") {
                alert(response.data.message);
                navigate("/signin");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("비밀번호 변경에 실패했습니다.");
        }
    };

    return (
        <div className="setPassword-container">
            <h2>비밀번호 변경</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="새 비밀번호"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
                {errorMessage && <div className="error-text">{errorMessage}</div>}
                <button type="submit" disabled={!!errorMessage}>
                    비밀번호 변경
                </button>
            </form>
        </div>
    );
};

export default SetPassword;
