import '../css/CompIntroduce.css';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Typed } from 'react-typed';

const CompIntroduce = () => {

    useEffect(() => {
        const typed = new Typed(".auto-type", {
            strings: ["Programmer", "Designer", "Full-stack Developer"],
            typeSpeed: 80,
            backSpeed: 80,
            loop: true,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    useEffect(() => {
        const onLoadMap = () => {
            const cityhall = new window.naver.maps.LatLng(37.4985399, 127.0326428);
            const map = new window.naver.maps.Map('map', {
                center: cityhall.destinationPoint(0, 500),
                zoom: 15,
            });

            const marker = new window.naver.maps.Marker({
                map: map,
                position: cityhall,
            });

            const contentString = `
                <div class="iw_inner">
                    <h3>KH 정보교육원</h3>
                    <p>서울특별시 강남구 테헤란로 10길 09 | KH 정보교육원 강남지원 2관 <br />
                    02-120 | 공공, 사회기관 <br />
                    </p>
                </div>`;

            const infowindow = new window.naver.maps.InfoWindow({
                content: contentString,
            });

            window.naver.maps.Event.addListener(marker, 'click', function () {
                if (infowindow.getMap()) {
                    infowindow.close();
                } else {
                    infowindow.open(map, marker);
                }
            });

            infowindow.open(map, marker);
        };

        // Naver Maps API가 이미 로드되었는지 확인하고, 없다면 스크립트를 추가합니다.
        if (window.naver && window.naver.maps) {
            onLoadMap(); // 스크립트가 이미 로드된 경우 바로 지도 생성
        } else {
            const script = document.createElement('script');
            script.src = 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=srbxbvs7lt';
            script.async = true;
            script.onload = onLoadMap;
            document.head.appendChild(script);
        }
    }, []);

    return (
            <div className="introduce-area">
                <Helmet>
                    <title>Joy Code Me</title>
                </Helmet>
            <div className="timeline">
                <div className="timeline-container left-container">
                    <img src="/img/timeline01.png" alt="타임라인"/> 
                    <div className="text-box">
                        <h2>Project personnel</h2>
                        <small>24.09.20 - 24.09.24</small>
                        <p>Made up a group of four members <br/>
                            Rocomi, Zeus, Download, and 2weeks.</p>
                        <span className="left-container-arrow"></span>
                    </div>
                </div>

                <div className="timeline-container right-container">
                    <img src="/img/timeline02.png" alt="타임라인"/>
                    <div className="text-box">
                        <h2>Create a team name</h2>
                        <small>24.09.24 - 24.09.26</small>
                        <p>The project team name is Jocomi.</p>
                        <span className="right-container-arrow"></span>
                    </div>
                </div>

                <div className="timeline-container left-container">
                    <img src="/img/timeline03.png" alt="타임라인"/>
                    <div className="text-box">
                        <h2>Project planning</h2>
                        <small>24.09.26 - 24.09.30</small>
                        <p>Plan based on open AI API web services.</p>
                        <span className="left-container-arrow"></span>
                    </div>
                </div>

                <div className="timeline-container right-container">
                    <img src="/img/timeline04.png" alt="타임라인"/>
                    <div className="text-box">
                        <h2>Configuring a Project</h2>
                        <small>24.09.30 - 24.10.28</small>
                        <p>Configure the project based on React.</p>
                        <span className="right-container-arrow"></span>
                    </div>
                </div>

                <div className="timeline-container left-container">
                    <img src="/img/timeline05.png" alt="타임라인"/>
                    <div className="text-box">
                        <h2>Project completion</h2>
                        <small>24.10.28 - 24.11.25</small>
                        <p>Complete and deploy the project.</p>
                        <span className="left-container-arrow"></span>
                    </div>
                </div>
            </div>
            {/* <!-- timeline div 끝 --> */}

            {/* <!-- /* logo header */ }
            <div className="header-container">
                <h1>I'm a <span className="auto-type">Programmer</span></h1>
            </div>
            {/* <!-- /* logo header 끝 --> */}

            {/* <!-- /* assisted */ }


            {/* <!-- /* assisted 끝 */  }


            {/* <!-- 팀원 소개 --> */}
            <div className="introduce">
                <h2>Our Team</h2>
                <div className="team-container">
                    <div className="team-card">
                        <img src="img/Rocomi.jpg" alt="프로필사진"/>
                        <h3>Rocomi</h3>
                        <p>Project Manager</p>
                    </div>
                    <div className="team-card">
                        <img src="/img/Zeus.jpg" alt="프로필사진"/>
                        <h3>Zeus</h3>
                        <p>Project Member</p>
                    </div>
                    <div className="team-card">
                        <img src="/img/Download.jpg" alt="프로필사진"/>
                        <h3>Download</h3>
                        <p>Project Member</p>
                    </div>
                    <div className="team-card">
                        <img src="/img/2weeks.jpg" alt="프로필사진"/>
                        <h3>2weeks</h3>
                        <p>Project Member</p>
                    </div>
                </div>
            </div>
            <div className="map-header">
                <h1>찾아오시는길</h1>
            </div>

            <div className="map-container">
                <div id="map"></div>
            </div>

            <div className="address-info">
                <p><strong>주소:</strong> 서울특별시 강남구 테헤란로 10길 09</p>
                <p>KH 정보교육원 강남지원 2관</p>
                <p>02-120 | 공공, 사회기관</p>
            </div>
        </div>
    );
};

export default CompIntroduce;
