import { useContext, useEffect, useState } from 'react';
import '../../css/user/SignIn.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'
import AddressModal from './AddressModal';
import { LoginUser } from '../../App';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import NaverLoginButton from './NaverLoginButton';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
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
    const location = useLocation();
    const [popup, setPopup] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isPasswordChecked, setisPasswordChecked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 검사 상태
    const [isPhone, setIsPhone] = useState(false);

    const [verificationCodeSent, setVerificationCodeSent] = useState(false);
    const [confirmCode, setConfirmCode] = useState('');
    const [isCodeVerified, setIsCodeVerified] = useState(false);

    
    

       // gapi 초기화
       useEffect(() => {
        if (clientId) {
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    clientId: clientId,
                    scope: 'https://www.googleapis.com/auth/userinfo.email',
                }).catch((error) => {
                    console.error('Google API initialization error:', error);
                });
            });
        }
    }, [clientId]);

    const handleSendCodeEmail = async (e) => {
        e.preventDefault();
        setVerificationCodeSent(false);
        setIsCodeVerified(false);
        try {
            const response = await axios.post(`http://${window.location.hostname}:7777/send`, { email });
            if (response.status === 200) {
                setVerificationCodeSent(true);
                alert("인증 코드가 이메일로 전송되었습니다.");
            } else {
                throw new Error(response.data || "인증 코드 전송 실패");
            }
        } catch (error) {
            console.error(error);
            alert("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleVerifyCodeEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://${window.location.hostname}:7777/verify`, {
                email,
                code: confirmCode,
            });
            if (response.data) {
                setIsCodeVerified(true);
                alert("인증 코드가 확인되었습니다.");
            } else {
                alert("인증 코드가 일치하지 않습니다.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("인증 코드 확인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    

    const userLogin = (user) => {
        userCtx.setData(user);
        sessionStorage.setItem('loginUser', JSON.stringify(user)); // 로그인 정보 sessionStorage에 저장
    };
    
    const handleComplete = () => {
        setPopup(!popup);
    };

    const data = {
        memberId: id,
        memberPwd: password
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
            alert("로그인 중 오류가 발생했습니다.");
        }
    };

       // 네이버 로그인 후 URL에서 access_token을 추출하여 사용자 정보 가져오기
       useEffect(() => {
        const hash = location.hash;
        if (hash.includes("access_token")) {
            const token = new URLSearchParams(hash.substring(1)).get("access_token");
            if (token) fetchUserProfile(token);
        }
    }, [location]);

    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.get("https://openapi.naver.com/v1/nid/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const profile = response.data.response;
            setUserInfo(profile);
            userCtx.setData(profile); // 로그인 정보 저장
            sessionStorage.setItem('loginUser', JSON.stringify(profile));
            navigate('/'); // 메인 페이지로 리다이렉트
        } catch (error) {
            alert("네이버 로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };
    /* 구글 로그인 부분 */
    const GoogleLoginSuccess = async (credentialResponse) => {
        
        const token = credentialResponse.credential;
        if (!token) {
            return;
        }
    
        // gapi를 통해 Google 로그인 정보 및 액세스 토큰 가져오기
        const authResponse = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
        const accessToken = authResponse.access_token;  // Access token 가져오기
    
        if (!accessToken) {
            return;
        }
    
        try {
            // Google People API 호출하여 사용자 정보 받아오기
            const peopleResponse = await axios.get('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,phoneNumbers', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
    
            const userData = peopleResponse.data;
            const googleUser = {
                token: token,
                accessToken: accessToken,
                email: userData.emailAddresses ? userData.emailAddresses[0].value : 'No email',
                name: userData.names ? userData.names[0].displayName : 'No name',
                googleId: userData.resourceName.split('/')[1],
                phone: userData.phoneNumbers ? userData.phoneNumbers[0].value : "010-0000-0000",
                birth: "2000-01-01", // 기본값 2000-01-01
            };

            const response = await axios.post(`http://${window.location.hostname}:7777/api/auth/google`, googleUser, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.status === 200) {
                sessionStorage.setItem('loginUser', JSON.stringify(response.data));
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            alert("Google 로그인에 실패했습니다. 다시 시도해주세요.");
        }
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
            password === confirmPassword &&
            isIdChecked &&
            isPasswordChecked &&
            isCodeVerified
        );
    };    

    const idFilters = /^[a-zA-Z](?=.*[a-zA-Z])(?=.*[0-9]).{4,12}$/;
    const passwordFilters = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/;
    const phoneRegex = /^010-\d{4}-\d{4}$/;

    
    const handleIdChange = async (e) => {
        const value = e.target.value;
        setId(value);
        setIsIdChecked(false);
        if (!idFilters.test(value)) {
            setIdError('아이디는 5~12자, 영문자로 시작하여 숫자를 포함해야 합니다.');
        } else {
            setIdError('');
        }
        validateForm();
    };

    const checkIdDuplicate = async () => {
        if (!id || idError) {
            alert('아이디의 형식이 다르거나 사용 중인 아이디입니다.');
            return;
        }
    
        try {
            const response = await axios.post(`http://${window.location.hostname}:7777/checkUser`, {
              field: "id",
              value: id,
            });
            const isDuplicate = response.data;
        
            if (isDuplicate) {
              setIdError("이미 사용 중인 아이디입니다.");
              setIsIdChecked(false);
            } else {
              setIdError("");
              setIsIdChecked(true);
            }
          } catch (error) {
            alert("중복 체크 중 오류가 발생했습니다.");
          }
        };
    
    
        const handlePasswordChange = (e) => {
            const value = e.target.value;
            setPassword(value);
        
            if (value.length < 6 || value.length > 20) {
                setErrorMessage('비밀번호는 6~20자로 설정해야 합니다.');
                setisPasswordChecked(false);
            } else if (!passwordFilters.test(value)) {
                setErrorMessage('비밀번호는 영문자와 숫자를 포함해야 합니다.');
                setisPasswordChecked(false);
            } else {
                setErrorMessage('');
                setisPasswordChecked(true);
            }
            validateForm();
        };

        const handleConfirmPasswordChange = (e) => {
            const value = e.target.value;
            setConfirmPassword(value);
        
            if (value !== password) {
                setErrorMessage('비밀번호가 일치하지 않습니다.');
                setisPasswordChecked(false);
            } else if (value.length < 6 || value.length > 20) {
                setErrorMessage('비밀번호는 6~20자로 설정해야 합니다.');
                setisPasswordChecked(false);
            } else {
                setErrorMessage('');
                setisPasswordChecked(true);
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
        const rawValue = e.target.value;
    
        // 전화번호 형식 변경 (자동 하이픈 추가)
        const formattedPhone = formatPhoneNumber(rawValue);
        setPhone(formattedPhone);
    
        // 유효성 검사
        if (!phoneRegex.test(formattedPhone)) {
            setPhoneError("유효한 전화번호를 입력하세요. 예: 010-1234-5678");
            return;
        }
    
        // 중복 확인
        if (formattedPhone) {
            const isCheck = await checkUser("phone", formattedPhone);
            setPhoneError(isCheck ? "이미 사용 중인 전화번호입니다." : "");
        } else {
            setPhoneError("전화번호를 입력하세요.");
        }
    
        validateForm();
    };

    const formatPhoneNumber = (value) => {
        value = value.replace(/\D/g, ''); // 숫자만 남기기
        if (value.length <= 3) {
            return value;
        } else if (value.length <= 7) {
            return `${value.slice(0, 3)}-${value.slice(3)}`;
        } else {
            return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
        }
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
            alert("회원가입 중 오류가 발생했습니다.");
        }        
    };


    return (
        <GoogleOAuthProvider clientId={clientId}>
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
                        <div className="form-group id-group">
                            <input type="text" id="id" value={id || ''} required placeholder=" " onChange={handleIdChange} disabled={isIdChecked} />
                            <label htmlFor="id">ID</label>
                            <button
                                type="button"
                                onClick={checkIdDuplicate}
                                disabled={isIdChecked}
                                className={isIdChecked ? "disabled" : ""}
                            >
                                {isIdChecked ? "확인됨" : "중복 체크"}
                            </button>
                        </div>
                        {!isIdChecked && id && (
                            <div className="error-text">ID 중복체크 먼저 진행해주세요.</div>
                        )}
                        <div className={`message ${idError ? "error-text" : isIdChecked ? "success-text" : ""}`}>
                            {idError ? idError : isIdChecked ? "사용 가능한 아이디입니다." : ""}
                        </div>
                        <div className="form-group password-group">
                            <input type="password" id="signup-password" value={password || ''} required placeholder=" " onChange={handlePasswordChange} />
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
                        </div>
                        {!verificationCodeSent && (
                            <div className="form-group">
                                <button
                                    type="button"
                                    onClick={handleSendCodeEmail}
                                    className="form-btn"
                                >
                                    인증 코드 전송
                                </button>
                            </div>
                        )}

                        {verificationCodeSent && !isCodeVerified && (
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="인증 코드"
                                    value={confirmCode}
                                    onChange={(e) => setConfirmCode(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleVerifyCodeEmail}
                                    className="form-btn"
                                >
                                    인증 코드 확인
                                </button>
                            </div>
                        )}
                        {isCodeVerified && (
                            <div className="success-email">이메일 인증이 완료되었습니다.</div>
                        )}


                        <div className="form-group">
                            <input type="phone" id="phone" required placeholder=" " onChange={handlePhoneChange} />
                            <label htmlFor="phone">Phone</label>
                            {phoneError && <div className="error-text">{phoneError}</div>}
                        </div>
                        <div className="form-group">
                            <input type="date" id="birth" required placeholder=" " onChange={(e) => setBirth(e.target.value)} />
                            <label htmlFor="birth">Birth</label>
                        </div>
                        <div className="form-group">
                        <input className="user_enroll_text" placeholder="주소" type="text" required name="address" onClick={handleComplete} value={address || ''} onChange={(e) => setAddress(e.target.value)} />
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
                    <div className="login-buttons-container">
                    <NaverLoginButton />
                    <GoogleLogin
                        onSuccess={GoogleLoginSuccess}  // 로그인 성공 시 호출
                        scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.birthday.read"
                    />
                    </div>
                    <div className="toggle-link" onClick={toggleForms}>Create an account?</div>
                    <div className="link-container">
                        {/* Link를 사용하여 라우팅 */}
                        <Link to="/findId" className="link">아이디 찾기</Link>
                        <Link to="/emailVerification" className="link">비밀번호 변경</Link>
                    </div>   
                </div>
            </div>
            {/* Address Modal 렌더링 */}
            {popup && (
                <>
                    <div className="addressmodal-overlay" onClick={handleComplete}></div>
                    <AddressModal
                        address={address}
                        setAddress={setAddress}
                        setPopup={setPopup}
                    />
                </>
            )}
        </div>
        </GoogleOAuthProvider>
    );
}

export default SignIn;
