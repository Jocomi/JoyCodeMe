import React, { useEffect } from "react";

const NaverLoginButton = () => {
    useEffect(() => {
        // 기존 스크립트 제거
        const existingScript = document.querySelector("script[src='https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js']");
        if (existingScript) {
            document.head.removeChild(existingScript);
        }

        // 새 스크립트 추가
        const script = document.createElement("script");
        script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js"; // nopolyfill 버전 사용
        script.type = "text/javascript";
        document.head.appendChild(script);

        script.onload = () => {
            // Naver 로그인 초기화
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
                callbackUrl: "http://localhost:3000/naver/callback",
                isPopup: false,
                loginButton: { color: "green", type: 2, height: 40 },
                callbackHandle: false,
            });

            naverLogin.init();
        };

        return () => {
            // 컴포넌트 언마운트 시 스크립트 제거
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className="naver-login-container">
            <div id="naverIdLogin" />
        </div>
    );
};

export default NaverLoginButton;
