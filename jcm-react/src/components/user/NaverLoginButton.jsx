import React, { useEffect } from "react";

const NaverLoginButton = () => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
        script.type = "text/javascript";
        document.head.appendChild(script);

        script.onload = () => {
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
