import '../../css/ChangePwd.css'
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router-dom';

const ChangePwd = () => {
    const navigate = useNavigate();

    function togglePassword(fieldId, icon) {
        const field = document.getElementById(fieldId);
        if (field.type === "password") {
          field.type = "text";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          field.type = "password";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }

    return ( 
        <>
            {/* <!-- 비밀번호 변경 컨테이너 --> */}
            <div className="password-container">
                <h1>비밀번호 변경</h1>

                {/* <!-- 현재 비밀번호 --> */}
                <div className="form-group">
                <label for="current-password">현재 비밀번호</label>
                <input type="password" id="current-password" placeholder="현재 비밀번호"/>
                <i className="fa fa-eye show-hide" onClick={(e) => togglePassword('current-password', e.currentTarget)}></i>
                </div>

                {/* <!-- 새로운 비밀번호 --> */}
                <div className="form-group">
                <label for="new-password">새로운 비밀번호</label>
                <input type="password" id="new-password" placeholder="새로운 비밀번호"/>
                <i className="fa fa-eye show-hide" onClick={(e) => togglePassword('new-password', e.currentTarget)}></i>
                </div>

                {/* <!-- 비밀번호 확인 --> */}
                <div className="form-group">
                <label for="confirm-password">새로운 비밀번호 확인</label>
                <input type="password" id="confirm-password" placeholder="새로운 비밀번호 확인"/>
                <i className="fa fa-eye show-hide" onClick={(e) => togglePassword('confirm-password', e.currentTarget)}></i>                </div>

                {/* <!-- 저장 및 취소 버튼 --> */}
                <button type="submit">저장</button>
                <button type="button" onClick={() => navigate(-1)}>취소</button>
            </div>
        </>
    )
}
export default ChangePwd;