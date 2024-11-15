import React, { useEffect, useState } from 'react';
import '../../css/setup/WebSetUpForm.css';
import { FadeLoader } from "react-spinners";
import instance from '../../shared/axios';

const FunctionSetUpForm = (props) => {
    useEffect(() => {
        instance.get("http://localhost:3000/");
      }, []);

    const [responseData, setResponseData] = useState(""); // 서버 응답 데이터를 저장하는 state

    useEffect(() => {
        console.log("여기까징");
        const fetchData = async () => {
            const data = {
                request: props.question
            };
            
            const response = await fetch("http://localhost:7777/function", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.text();

            
           if (response.status === 200) {  // 성공 시 처리
                setTimeout(() => { // 파일이 저장될 때까지 딜레이
                    setResponseData(result); // 서버 응답 데이터를 state에 저장
                }, 5000);
            } else {
                alert("요청 실패... 요청을 확인하세요!");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="websetupform-container">
            <header className="websetupform-header">
                <div className="logo">Jocomi</div>
                <button className="consultation-button">Free Consultation</button>
            </header>

            <main className="content-area">
                <h1 className="setup-title">Welcome to Jocomi's Fuction Builder</h1>
                <p className="setup-description">Create a customized, professional website with just a few steps. Fill in the details below to start setting up your online presence.</p>

                <div className="section-title">Fuction Preview</div>
                {/* 여기에 응답 내용을 출력 */}
                <div className='viewPage' align="center">
                    {responseData !== "" ? (
                        <textarea value={responseData} readOnly style={{ width: "100%", height: "100vh" }}></textarea>
                    ) : (
                        <>
                            <br />
                            <FadeLoader/>
                            <p><b>AI가 기능을 작성중입니다! 평균적으로 1분정도 소요됩니다...</b></p>
                        </>
                    )}
                </div>

                <p className="final-note">Once you've filled out the information, our team will guide you through the remaining steps to launch your site.</p>
            </main>
        </div>
    );
}

export default FunctionSetUpForm;
