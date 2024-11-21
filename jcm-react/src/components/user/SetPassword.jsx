import React, { useState } from "react";
import axios from "axios";
import '../../css/user/SetPassword.css';

const SetPassword = () => {
    const [memberId, setMemberId] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post(`http://${window.location.hostname}:7777/setPassword`, {
                memberId,
                newPassword,
            });
            alert(response.data.message);
        } catch (error) {
            alert("비밀번호 변경에 실패했습니다.");
        }
    };

    return (
        <div className="setPassword-container">
            <h2>비밀번호 변경</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="새 비밀번호"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">비밀번호 변경</button>
            </form>
        </div>
    );
};

export default SetPassword;
