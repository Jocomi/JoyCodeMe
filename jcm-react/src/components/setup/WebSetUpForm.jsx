import React, { useEffect, useState } from 'react';
import '../../css/setup/WebSetUpForm.css';
import {FadeLoader} from "react-spinners"

const WebSetUpForm = (props) => {
    const [responseData, setResponseData] = useState(""); // 서버 응답 데이터를 저장하는 state

    useEffect(async () => {

        const data = {
            request: props.question
        };
        
        
        const response = await fetch("http://localhost:7777/view", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.text();

        console.log(result);
        if (response.status === 200) {  // 성공 시 처리
            setResponseData(result); // 서버 응답 데이터를 state에 저장
        } else {
            alert("요청 실패... 요청을 확인하세요!");
        }

       
    },[]);

    return (
        <div className="websetupform-container">
            <header className="websetupform-header">
                <div className="logo">Jocomi</div>
                <button className="consultation-button">Free Consultation</button>
            </header>

            <main className="content-area">
                <h1 className="setup-title">Welcome to Jocomi's Website Builder</h1>
                <p className="setup-description">Create a customized, professional website with just a few steps. Fill in the details below to start setting up your online presence.</p>

                <div className="section-title">WEBSITE Preview</div>

                {/* 여기에 응답 내용을 출력 */}
                <div className='viewPage' align="center">
                    {responseData !== "" ? (
                        <div dangerouslySetInnerHTML={{ __html: responseData }} ></div> // JSON 데이터를 보기 좋게 출력
                    ) : (
                        <FadeLoader/>
                    )}
                </div>

                <p className="final-note">Once you've filled out the information, our team will guide you through the remaining steps to launch your site.</p>
            </main>
        </div>
    );
}

export default WebSetUpForm;