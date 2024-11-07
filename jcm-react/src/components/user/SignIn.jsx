// SignIn.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/user/SignIn.css';
import 'font-awesome/css/font-awesome.min.css';

const SignIn = () => {
    const navigate = useNavigate();

    const userCtx = useContext(loginUser);

    const toggleForms = () => setIsSignup(!isSignup);

    const handlerLogin = () => {
        userCtx.setData({user: user});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const data = {
            memberId: formData.get('id') || formData.get('userId'),
            memberPwd: formData.get('signup-password') || formData.get('login-password'),
        };

        const endpoint = isSignup ? 'http://localhost:7777/signup' : 'http://localhost:7777/login';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);  // 서버 응답을 확인

            if (result.message === "로그인 성공") {  // 로그인 성공 시 처리
                const user = { result }; // 사용자 정보 저장
                userCtx.setData({user: user});
                navigate('/'); // 로그인 성공 후 메인 페이지로 이동
            } else {
                alert("로그인 실패: 아이디와 비밀번호를 확인하세요.");
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
            alert("요청 실패: 서버가 응답하지 않거나 네트워크 문제가 발생했습니다.");
        }
    };

    return (
        <div className="signIn-container">
            <div className="signIn-main">
                <div className="image-section">
                    <video muted autoPlay loop>
                        <source src='/resources/login.mp4' type="video/mp4" />
                    </video>
                </div>

                <div className={`form-section ${isSignup ? '' : 'hidden'}`} id="signup-form">
                    <h1>Sign Up</h1>
                    <form id="signupForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="id" required placeholder=" " />
                            <label htmlFor="id">ID</label>
                        </div>
                        <div className="form-group">
                            <input type="password" name="signup-password" required placeholder=" " />
                            <label htmlFor="signup-password">Password</label>
                            <i className="fa fa-eye-slash show-hide" onClick={(e) => togglePassword('signup-password', e.currentTarget)}></i>
                        </div>
                        <div className="form-group">
                            <input type="text" name="name" required placeholder=" " />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" required placeholder=" " />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-group">
                            <input type="phone" name="phone" required placeholder=" " />
                            <label htmlFor="phone">Phone</label>
                        </div>
                        <div className="form-group">
                            <input type="birth" name="birth" required placeholder=" " />
                            <label htmlFor="birth">Birth</label>
                        </div>
                        <div className="form-group">
                            <input type="address" name="address" required placeholder=" " />
                            <label htmlFor="address">Address</label>
                        </div>
                        <button type="submit" className="form-btn">Sign Up</button>
                    </form>
                    <div className="toggle-link" onClick={toggleForms}>I am already a member</div>
                </div>

                <div className={`form-section ${isSignup ? 'hidden' : ''}`} id="login-form">
                    <h1>Sign In</h1>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="userId" required placeholder=" " />
                            <label htmlFor="userId">ID</label>
                        </div>
                        <div className="form-group">
                            <input type="password" name="login-password" required placeholder=" " />
                            <label htmlFor="login-password">Password</label>
                            <i className="fa fa-eye-slash show-hide" onClick={(e) => togglePassword('login-password', e.currentTarget)}></i>
                        </div>
                        <button type="submit" className="form-btn">Sign In</button>
                    </form>
                    <div className="toggle-link" onClick={toggleForms}>Create an account?</div>
                </div>
            </div>
        </div>
    );
};

function togglePassword(fieldId, icon) {
    const field = document.getElementById(fieldId);
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

export default SignIn;
