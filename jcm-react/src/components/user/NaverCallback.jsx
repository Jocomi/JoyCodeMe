import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NaverCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.hash.substring(1));
        const access_token = query.get("access_token");
        const state = query.get("state");

        if (access_token !== null) {
            fetchAccessToken(access_token, state);
        } else {
            alert("인증 코드가 없습니다. access_token : "+ access_token);
            navigate("/");
        }
    }, [location, navigate]);

    const fetchAccessToken = async (access_token, state) => {
        try {
            const response = await fetch(`http://${window.location.hostname}:7777/api/naver/callback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ access_token, state }),
            });

            const result = await response.json();

            if (result !== null) {
                sessionStorage.setItem("loginUser", JSON.stringify(result));


                navigate("/"); // 로그인 후 홈으로 이동
                window.location.reload();
            } else {
                alert("네이버 로그인에 실패했습니다: ");
            }
        } catch (error) {
            console.error("Naver login error:", error);
            alert("네이버 로그인 중 오류가 발생했습니다.");
        }
    };

    return <div>로그인 처리 중...</div>;
};

export default NaverCallback;