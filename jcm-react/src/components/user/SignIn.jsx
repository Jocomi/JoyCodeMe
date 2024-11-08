import { useContext, useState } from 'react';
import '../../css/user/SignIn.css';
import 'font-awesome/css/font-awesome.min.css';
import { LoginUser } from '../../App';
import { useNavigate } from 'react-router-dom';
import AddressModal from './AddressModal';

const SignIn = () => {
    const navigate = useNavigate();
    
    const [id,setId] = useState('');
    const[password, setPassword] = useState('');
    
    const userCtx = useContext(LoginUser);
    
    const userLogin = (user) => {
        userCtx.setData(user)
    }
    const data = {
        memberId: id,
        memberPwd: password
    };


    const handlerLogin = async () => {
        try{
            const response = await fetch("http://localhost:7777/login",{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            console.log(result);
            if (result.memberId !== "") {  // 로그인 성공 시 처리
                userLogin(result);
                navigate('/'); // 로그인 성공 후 메인 페이지로 이동
            } else {
                alert("로그인 실패: 아이디와 비밀번호를 확인하세요.");
            }


        } catch(e) {
            console.log(e);
            throw new Error("test3 :: 통신 실패@!")
        }
        
    }

        /* /////////////////address 모달 함수 추가////////////////////// */
        const [enroll_company, setEnroll_company] = useState({
            address:'',
        });
        
        const [popup, setPopup] = useState(false);
        
        const handleInput = (e) => {
            setEnroll_company({
                ...enroll_company,
                [e.target.name]:e.target.value,
            })
        }
        
        const handleComplete = (data) => {
            setPopup(!popup);
        }
    
        /* //////////////////////////////////////////////////////////////// */

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
                    <form id="signupForm">
                        <div className="form-group">
                            <input type="text" id="id" required placeholder=" " />
                            <label htmlFor="id">ID</label>
                        </div>
                        <div className="form-group">
                            <input type="password" id="signup-password" required placeholder=" " />
                            <label htmlFor="signup-password">Password</label>
                            <i className="fa fa-eye-slash show-hide" onClick={(e) => togglePassword('signup-password', e.currentTarget)}></i>
                        </div>
                        <div className="form-group">
                            <input type="password" id="cpass" required placeholder=" " />
                            <label htmlFor="cpass">Confirm Password</label>
                        </div>
                        <div className="form-group">
                            <input type="text" id="name" required placeholder=" " />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-group">
                            <input type="text" id="email" required placeholder=" " />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-group">
                            <input className="user_enroll_text" placeholder="주소"  type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address}/>
                            <button className="address_btn" onClick={handleComplete}>우편번호 찾기</button>
                        </div>
                        <button type="submit" className="form-btn">Sign Up</button>
                    </form>
                    <div className="toggle-link" onClick={toggleForms}>I am already a member</div>
                </div>
            
                <div className="form-section" id="login-form">
                    <h1>Sign In</h1>
                    <p>Welcome Back!</p>
                        <form id="loginForm">
                            <div className="form-group">
                                <input type="text" id="userId" required placeholder=" " vlaue={id} onChange={(e)=>setId(e.target.value)}/>
                                <label htmlFor="userId">ID</label>
                            </div>
                            <div className="form-group">
                                <input type="password" id="login-password" required placeholder=" " vlaue={password} onChange={(e)=>setPassword(e.target.value)}/>
                                <label htmlFor="login-password">Password</label>
                                <i className="fa fa-eye-slash show-hide" onClick={(e) => togglePassword('login-password', e.currentTarget)}></i>
                            </div>
                            <button type="button" className="form-btn" onClick={handlerLogin}>Sign In</button>
                        </form>
                    <div className="toggle-link" onClick={toggleForms}>Create an account?</div>
                </div>
            </div>
            {popup && <AddressModal company={enroll_company} setcompany={setEnroll_company}></AddressModal>}
        </div>
    )
}

export default SignIn;
