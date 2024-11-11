import { useContext, useEffect, useState } from 'react';
import '../../css/user/SignIn.css';
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router-dom';
import AddressModal from './AddressModal';
import { LoginUser } from '../../App';

const SignIn = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [birth, setBirth] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [idError, setIdError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const userCtx = useContext(LoginUser);
    const [popup, setPopup] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 검사 상태


    // 주소 모달 열기/닫기
    const handleComplete = () => {
        setPopup(!popup);
    };

    const userLogin = (user) => {
        userCtx.setData(user);
        sessionStorage.setItem('loginUser', JSON.stringify(user)); // 로그인 정보 sessionStorage에 저장
    };

    const data = {
        memberId: id,
        memberPwd: password
    };

    const handleInput = (e) => {
        setAddress(e.target.value);
    };

    const handlerLogin = async () => {
        try {
            const response = await fetch(`http://${window.location.hostname}:7777/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.memberId) {  // 로그인 성공 시 처리
                userLogin(result);
                navigate('/'); // 로그인 성공 후 메인 페이지로 이동
            } else {
                alert("로그인 실패: 아이디와 비밀번호를 확인하세요.");
            }
        } catch (e) {
            console.log(e);
            alert("로그인 중 오류가 발생했습니다.");
        }
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validateForm();
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
        } else {
            setErrorMessage("");
        }
        validateForm();
    };

    function toggleForms() {
        document.getElementById('signup-form').classList.toggle('hidden');
        document.getElementById('login-form').classList.toggle('hidden');
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

    const checkUser = async (field, value) => {
        try {
            const response = await fetch(`http://${window.location.hostname}:7777/checkUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ field, value })
            });
            const result = await response.json();
            return result; // true: 중복, false: 중복 아님
        } catch (e) {
            console.error("중복 체크 오류 : ", e);
            return false;
        }
    };
    
    useEffect(() => {
        validateForm();
    }, [id, email, phone, name, address, birth, password, confirmPassword, idError, emailError, phoneError]);

    // 폼 유효성 검사 함수
    const validateForm = () => {
        setIsFormValid(
            !idError &&
            !emailError &&
            !phoneError &&
            id &&
            email &&
            phone &&
            name &&
            address &&
            birth &&
            password &&
            confirmPassword &&
            password === confirmPassword
        );
    };

    const handleIdChange = async (e) => {
        const value = e.target.value;
        setId(value);
        if (value) {
            const isCheck = await checkUser('id', value);
            setIdError(isCheck ? "이미 사용 중인 아이디입니다." : "");
        } else {
            setIdError("아이디를 입력하세요.");
        }
        validateForm();
    };

    const handleEmailChange = async (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value) {
            const isCheck = await checkUser('email', value);
            setEmailError(isCheck ? "이미 사용 중인 이메일입니다." : "");
        } else {
            setEmailError("이메일을 입력하세요.");
        }
        validateForm();
    };

    const handlePhoneChange = async (e) => {
        const value = e.target.value;
        setPhone(value);
        if (value) {
            const isCheck = await checkUser('phone', value);
            setPhoneError(isCheck ? "이미 사용 중인 전화번호입니다." : "");
        } else {
            setPhoneError("전화번호를 입력하세요.");
        }
        validateForm();
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        const signupData = {
            memberId: id,
            memberPwd: password,
            memberName: name,
            email: email,
            address: address,
            phone: phone,
            birth: birth
        };

        try {
            const response = await fetch(`http://${window.location.hostname}:7777/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupData)
            });
        
            // 응답 상태가 성공적인지 확인
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
        
            const result = await response.json();
            console.log("Signup result: ", result);  // 응답 결과 콘솔 출력
        
            alert(result); // 성공 또는 실패 메시지 알림
        
            if (result === "회원가입에 성공했습니다.") {
                // 회원가입 성공 후 메인 페이지로 이동
                navigate('/');
        
                // 폼 필드 초기화
                setId('');
                setPassword('');
                setConfirmPassword('');
                setName('');
                setEmail('');
                setPhone('');
                setAddress('');
                setBirth('');
                setErrorMessage('');
                setIdError('');
                setEmailError('');
                setPhoneError('');
                setIsFormValid(false);
            }
        } catch (e) {
            console.error("Signup error: ", e.message || e); // 에러 메시지 출력
            alert("회원가입 중 오류가 발생했습니다.");
        }        
    };


    return (
        <div className="signIn-container">
            <div className='signIn-main'>
                <div className="image-section">
                    <video muted autoPlay loop>
                        <source src='resources/login.mp4' type="video/mp4" />
                    </video>
                </div>

                <div className="form-section hidden" id="signup-form">
                    <h1>Sign Up</h1>
                    <p>Joy Code Me의 Content 를 즐기고 싶다면 로그인하세요.</p>
                    <form id="signupForm" onSubmit={handleSignup}>
                        <div className="form-group">
                            <input type="text" id="id" required placeholder=" " onChange={handleIdChange} />
                            <label htmlFor="id">ID</label>
                            {idError && <div className="error-text">{idError}</div>}
                        </div>
                        <div className="form-group">
                            <input type="password" id="signup-password" required placeholder=" " onChange={handlePasswordChange} />
                            <label htmlFor="signup-password">Password</label>
                            <i className="fa fa-eye-slash show-hide" onClick={(e) => togglePassword('signup-password', e.currentTarget)}></i>
                        </div>
                        <div className="form-group">
                            <input type="password" id="cpass" required placeholder=" " onChange={handleConfirmPasswordChange} />
                            <label htmlFor="cpass">Confirm Password</label>
                            {errorMessage && <div className="error-text">{errorMessage}</div>}
                        </div>
                        <div className="form-group">
                            <input type="text" id="name" required placeholder=" " onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-group">
                            <input type="text" id="email" required placeholder=" " onChange={handleEmailChange} />
                            <label htmlFor="email">Email</label>
                            {emailError && <div className="error-text">{emailError}</div>}
                        </div>
                        <div className="form-group">
                            <input type="text" id="phone" required placeholder=" " onChange={handlePhoneChange} />
                            <label htmlFor="phone">Phone</label>
                            {phoneError && <div className="error-text">{phoneError}</div>}
                        </div>
                        <div className="form-group">
                            <input type="date" id="birth" required placeholder=" " onChange={(e) => setBirth(e.target.value)} />
                            <label htmlFor="birth">Birth</label>
                        </div>
                        <div className="form-group">
                            <input className="user_enroll_text" placeholder="주소" type="text" required name="address" onChange={handleInput} value={address} />
                            <button type="button" className="address_btn" onClick={handleComplete}>우편번호 찾기</button>
                        </div>
                        <button type="submit" className="form-btn" disabled={!isFormValid}>Sign Up</button>
                    </form>
                    <div className="toggle-link" onClick={toggleForms}>I am already a member</div>
                </div>

                <div className="form-section" id="login-form">
                    <h1>Sign In</h1>
                    <p>Welcome Back!</p>
                    <form id="loginForm">
                        <div className="form-group">
                            <input type="text" id="userId" required placeholder=" " value={id} onChange={(e) => setId(e.target.value)} />
                            <label htmlFor="userId">ID</label>
                        </div>
                        <div className="form-group">
                            <input type="password" id="login-password" required placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="login-password">Password</label>
                            <i className="fa fa-eye-slash show-hide" onClick={(e) => togglePassword('login-password', e.currentTarget)}></i>
                        </div>
                        <button type="button" className="form-btn" onClick={handlerLogin}>Sign In</button>
                    </form>
                    <div className="toggle-link" onClick={toggleForms}>Create an account?</div>
                </div>
            </div>
            {/* Address Modal 렌더링 */}
            {popup && (
                <>
                    <div className="addressmodal-overlay" onClick={handleComplete}></div>
                    <AddressModal company={address} setCompany={setAddress} />
                </>
            )}
        </div>
    );
}

export default SignIn;
