import React, { useEffect, useState } from 'react';
import '../../css/setup/WebSetUpForm.css';
import { FadeLoader } from "react-spinners";
import instance from '../../shared/axios';

const WebSetUpForm = (props) => {
    const saveFileHost = `http://${window.location.hostname}:7777/show?name=`;

    const request = props.question;

    instance.get(`http://${window.location.hostname}:3000/`);


    const [responseData, setResponseData] = useState(""); // 서버 응답 데이터를 저장하는 state

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                memberId: JSON.parse(sessionStorage.getItem('loginUser')).memberId,
                request: request
            };
            
            const response = await fetch(`http://${window.location.hostname}:7777/view`, {
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

    const downloadHandler = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('파일 다운로드에 실패했습니다.');
            }

            const blob = await response.blob(); // 응답을 Blob 형태로 변환
            const downloadUrl = window.URL.createObjectURL(blob); // Blob으로부터 객체 URL 생성

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'test.html'); // 다운로드 파일 이름 설정
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl); // 사용한 URL 객체를 해제하여 메모리 사용 최소화
        } catch (error) {
            console.error('파일 다운로드 중 오류 발생:', error);
        }
    };

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
                        <iframe src={saveFileHost + responseData} style={{ width: "100%", height: "100vh" }}/>
                    ) : (
                        <>
                            <br />
                            <FadeLoader/>
                            <p><b>AI가 페이지를 생성중입니다! 평균적으로 1분정도 소요됩니다...</b></p>
                        </>
                    )}
                </div>

                <p className="final-note">Once you've filled out the information, our team will guide you through the remaining steps to launch your site.</p>
                <div className='btn-section'>
                <button className='btn' onClick={() => { window.location.href = "/webSetUp"; }}>뒤로가기</button><button className='btn' onClick={() => downloadHandler(saveFileHost + responseData)}>Export</button>
                </div>
            </main>
        </div>
    );
}

export default WebSetUpForm;
