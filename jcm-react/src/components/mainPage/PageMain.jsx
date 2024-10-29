import React from "react";

const DotSVG = () => {
  const centerX = 250;
  const centerY = 170;
  
  // 점마다 다른 animation-delay 설정
  return (
    <svg className="dot-container" viewBox="0 0 500 500">
      {[...Array(21)].map((_, layerIndex) => {
        const radius = 160 - layerIndex * 8; // 각 레이어마다 반지름 감소
        const numDots = 120- layerIndex * 5; // 점의 개수
        return [...Array(numDots)].map((_, i) => {
          const angle1 = (i / (numDots / 2)) * Math.PI + 1.6; // 원1 각도 계산
          const x1 = centerX + radius * Math.cos(angle1); // x 좌표
          const y1 = centerY + radius * Math.sin(angle1); // y 좌표

          const angle2 = (i / (numDots / 2)) * Math.PI - 1.51; // 원2 각도 계산
          const x2 = centerX + radius * Math.cos(angle2); // x 좌표
          const y2 = centerY + 160 + radius * Math.sin(angle2); // y 좌표

          const delay = `${i * 0.02}s`; // 0.2초 단위로 깜빡이는 지연 시간 다르게 설정

          return (
            <React.Fragment key={`${layerIndex}-${i}`}>
              <circle
                cx={x1}
                cy={y1}
                r="4"
                className="dot"
                style={{ animationDelay: delay }}
              />
              <circle
                cx={x2}
                cy={y2}
                r="4"
                className="dot"
                style={{ animationDelay: delay }}
              />
            </React.Fragment>
          );
        });
      })}
    </svg>
  );
};

const PageMain = () => {
    return(
        <div className="main-top">
            <DotSVG />
            <div className="center-logo">
                <h1>JOY CODE ME</h1>
                <h2>AUTOMATIC CODING</h2>
            </div>
        </div>
    )
}
export default PageMain;