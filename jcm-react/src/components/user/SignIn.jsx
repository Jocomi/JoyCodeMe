import React, { useState } from 'react';
import '../../css/user/SignIn.css'; // CSS 파일 경로 확인
import 'font-awesome/css/font-awesome.min.css';

const SignIn = () => {
    const [isSignup, setIsSignup] = useState(false);

    const toggleForms = () => setIsSignup(!isSignup);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const data = {
            memberId: formData.get('id') || formData.get('userId'),
            memberPwd: formData.get('signup-password') || formData.get('login-password'),
            memberName: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            birth: formData.get('birth'),
            address: formData.get('address')
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
            alert(JSON.stringify(result));

            // 회원가입 성공 시 로그인 페이지로 이동
            if (result === "회원가입에 성공했습니다.") {
                setIsSignup(false); // 로그인 페이지로 전환
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
}

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
