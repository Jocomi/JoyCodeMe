import { useRef, useEffect } from 'react';
const MainReferences =() => {
    
    const iconContainerRef = useRef(null);
    const iconsRef = useRef([]);
  
    useEffect(() => {
      const containerWidth = iconContainerRef.current.offsetWidth;
      const iconWidth = iconsRef.current[0].offsetWidth;
      const totalIcons = iconsRef.current.length;
  
      const iconSpacing = (containerWidth+50) / totalIcons;
      // 초기 위치 설정
      iconsRef.current.forEach((icon, index) => {
        if(icon){
            icon.style.left = `${index * iconSpacing}px`;
        }
      });
  
      // 아이콘 이동 함수
      const moveIcons = () => {
        iconsRef.current.forEach((icon) => {
            if (icon) {
              let currentPosition = parseFloat(icon.style.left);
    
              // 아이콘이 왼쪽 끝에 도달하면 오른쪽 끝으로 이동
              if (currentPosition <= -iconWidth) {
                icon.style.transition = "none";
                icon.style.left = `${containerWidth}px`; // 오른쪽 끝으로 이동
              } else {
                icon.style.left = `${currentPosition - 0.5}px`; // 일정 속도로 왼쪽으로 이동
              }
            }
          });
          requestAnimationFrame(moveIcons);
        };
  
      moveIcons(); // 아이콘 이동 시작
  
      // cleanup function
      return () => cancelAnimationFrame(moveIcons);
    }, []);
  
    return(
        <div className="main-reference">
                <div className="text">
                <p className="title">눈에 띄는 웹사이트를 JCM을 통해 간편하게 만드세요</p>
                JCM은 AI참여형 개발 툴으로 초급과 고급 개발자의 프론트엔드, 백엔드 디자인 시스템을 제공합니다.<br/>
                또한, JCM을 통해 디자이너와 개발자 간의 매끄러운 협업을 가능하게 합니다. <br/>
                AI를 사용한 개발 툴로 빠른 개발과 협업을 경험하세요!
                </div>

                <div className="icon-container" ref={iconContainerRef}>
                    {[
                        "css-icon.png",
                        "html5-icon.png",
                        "react-icon.png",
                        "java-icon.png",
                        "js-icon.png",
                        "spring-icon.png",
                        "springboot-icon.png",
                        "db-icon.png",
                        "tomcat-icon.png",
                        "github-icon.png"
                        
                    ].map((src, index) => (
                        <img
                        key={index}
                        ref={(el) => (iconsRef.current[index] = el)}
                        src={`img/${src}`}
                        alt={`icon-${index}`}
                        className="icon"
                        />
                    ))}
                </div>

                <div className="reference-list">
                <div className="box">
                    <p>front-end</p>
                    <p>저희 JCM에서 front-end로 사용 할 수 있는 프로그래밍 언어에는
                        html, css, react 등이 있고 이외의 언어도 사용자가 원하는 범위 내에서 사용가능 합니다.
                    </p>
                    <p>
                        <img src="img/css-icon.png" alt="" />
                        <img src="img/html5-icon.png" alt="" />
                        <img src="img/react-icon.png" alt="" />
                    </p>
                </div>
                <div className="box">
                    <p>Function</p>
                    <p>저희 JCM의 기능들은 사용자가 원하는 언어 기반으로 java, javascript, sts등 back-end에서 사용 할 수 있는 언어들을 제공하고 있습니다.</p>
                    <p>
                        <img src="img/java-icon.png" alt="" />
                        <img src="img/js-icon.png" alt="" />
                        <img src="img/spring-icon.png" alt="" />
                       
                    </p>
                </div>
                <div className="box">
                    <p>Database</p>
                    <p>저희 JCM은 사용자게에 Database를 편하게 관리하고 사용 할 수 있게 코드를 제공합니다.</p>
                    <p> <img src="img/db-icon.png" alt="" /></p>
                </div>
                <div className="box">
                    <p>Server, collaboration</p>
                    <p>저희 JCM은 배포전 단계에서 tomcat서버를 사용 하는것을 권장하고 배포시에는 원하는 서버를 적용하여 배포 할 수 있게 합니다.
                       그리고 깃을 사용하며 프로젝트를 관리하는 법을 알려드립니다 !
                    </p>
                    <p>
                        <img src="img/tomcat-icon.png" alt="" />
                        <img src="img/github-icon.png" alt="" />
                    </p>
                </div>
                </div>
                
            </div>
    )
}

export default MainReferences;