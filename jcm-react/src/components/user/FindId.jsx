import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../../css/user/FindId.css';

const FindId = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://${window.location.hostname}:7777/findId`, {
                email: email,
                phone: phone
            });
            setResult(response.data.memberId);
            setShowModal(true); // 결과를 찾은 후 모달 창 열기
        } catch (error) {
            alert("아이디를 찾을 수 없습니다.");
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEmail("");
        setPhone("");
        setResult(null);
    };

    return (
        <div className="findId-container">
            <h2>아이디 찾기</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="전화번호"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <button type="submit">아이디 찾기</button>
            </form>

            {/* 모달 창 */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>아이디 찾기</h3>
                        {result ? (
                            <>
                                <p>회원님의 아이디는: <strong>{result}</strong> 입니다.</p>
                                <Link to="/signIn" className="modal-button">
                                    로그인하러 가기
                                </Link>
                            </>
                        ) : (
                            <p>아이디를 찾을 수 없습니다.</p>
                        )}
                        <button className="modal-close" onClick={closeModal}>
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindId;
