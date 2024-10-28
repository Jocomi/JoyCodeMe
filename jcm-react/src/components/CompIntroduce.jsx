import '../css/CompIntroduce.css';

import { useEffect } from 'react';
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

    return (
        <div class="introduce-area">
            <div class="timeline">
                <div class="timeline-container left-container">
                    <img src="/img/timeline01.png" alt="타임라인"/> 
                    {/* <!-- 각자 사진으로 넣어주쉐요 ^ㅜ^ --> */}
                    <div class="text-box">
                        <h2>Project personnel</h2>
                        <small>24.09.20 - 24.09.24</small>
                        <p>Made up a group of four members <br/>
                            Rocomi, Zeus, Download, and 2weeks.</p>
                        <span class="left-container-arrow"></span>
                    </div>
                </div>

                <div class="timeline-container right-container">
                    <img src="/img/timeline02.png" alt="타임라인"/>
                    <div class="text-box">
                        <h2>Create a team name</h2>
                        <small>24.09.24 - 24.09.26</small>
                        <p>The project team name is Jocomi.</p>
                        <span class="right-container-arrow"></span>
                    </div>
                </div>

                <div class="timeline-container left-container">
                    <img src="/img/timeline03.png" alt="타임라인"/>
                    <div class="text-box">
                        <h2>Project planning</h2>
                        <small>24.09.26 - 24.09.30</small>
                        <p>Plan based on open AI API web services.</p>
                        <span class="left-container-arrow"></span>
                    </div>
                </div>

                <div class="timeline-container right-container">
                    <img src="/img/timeline04.png" alt="타임라인"/>
                    <div class="text-box">
                        <h2>Configuring a Project</h2>
                        <small>24.09.30 - 24.10.28</small>
                        <p>Configure the project based on React.</p>
                        <span class="right-container-arrow"></span>
                    </div>
                </div>

                <div class="timeline-container left-container">
                    <img src="/img/timeline05.png" alt="타임라인"/>
                    <div class="text-box">
                        <h2>Project completion</h2>
                        <small>24.10.28 - 24.11.25</small>
                        <p>Complete and deploy the project.</p>
                        <span class="left-container-arrow"></span>
                    </div>
                </div>
            </div>
            {/* <!-- timeline div 끝 --> */}

            {/* <!-- /* logo header */ }
            <div class="header-container">
                <h1>I'm a <span class="auto-type">Programmer</span></h1>
            </div>
            {/* <!-- /* logo header 끝 --> */}

            {/* <!-- /* assisted */ }


            {/* <!-- /* assisted 끝 */  }


            {/* <!-- 팀원 소개 --> */}
            <div class="introduce">
                <h2>Our Team</h2>
                <div class="team-container">
                    <div class="team-card">
                        <img src="/img/man.png" alt="프로필사진"/>
                        <h3>Rocomi</h3>
                        <p>Project Manager</p>
                    </div>
                    <div class="team-card">
                        <img src="/img/man.png" alt="프로필사진"/>
                        <h3>Zeus</h3>
                        <p>Project Member</p>
                    </div>
                    <div class="team-card">
                        <img src="/img/man.png" alt="프로필사진"/>
                        <h3>Download</h3>
                        <p>Project Member</p>
                    </div>
                    <div class="team-card">
                        <img src="/img/woman.png" alt="프로필사진"/>
                        <h3>2weeks</h3>
                        <p>Project Member</p>
                    </div>
                </div>
            </div>
            <div class="map-container">
            <div class="map-left">
                <h1>Joy Code Me</h1>
                <h2>조이 코드 미</h2>
                <p>Jocomi, Teheran-ro 14-gil, Gangnam-gu</p>
                <p>02 - 123 - 4567</p>
                <p>joycodeme@gmail.com</p>
            </div>
            <div id="map"></div>
            </div>
        </div>
    );
};

export default CompIntroduce;
