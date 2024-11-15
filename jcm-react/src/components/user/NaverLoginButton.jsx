// src/components/NaverLoginButton.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NaverLoginButton = () => {

    useEffect(() => {
        // 네이버 SDK 로드
        const script = document.createElement("script");
        script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
        script.type = "text/javascript";
        document.head.appendChild(script);

        script.onload = () => {
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
                callbackUrl: "http://localhost:3000/naver/callback", // 프론트엔드 콜백 URL로 변경
                isPopup: false,
                loginButton: { color: "green", type: 4, height: 40 },
                callbackHandle: false,
            });

            naverLogin.init();
        };

        // Cleanup script on unmount
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return <div id="naverIdLogin" />; // 네이버 로그인 버튼 표시
};

export default NaverLoginButton;