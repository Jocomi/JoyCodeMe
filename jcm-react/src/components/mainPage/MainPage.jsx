import React, { useState, useRef, useEffect } from "react";

const DotSVG = () => {
  const centerX = 250;
  const centerY = 170;

  return (
    <svg className="dot-container" viewBox="0 0 500 500">
      {[...Array(21)].map((_, layerIndex) => {
        const radius = 160 - layerIndex * 8;
        const numDots = 120 - layerIndex * 5;
        return [...Array(numDots)].map((_, i) => {
          const angle1 = (i / (numDots / 2)) * Math.PI + 1.6;
          const x1 = centerX + radius * Math.cos(angle1);
          const y1 = centerY + radius * Math.sin(angle1);

          const angle2 = (i / (numDots / 2)) * Math.PI - 1.51;
          const x2 = centerX + radius * Math.cos(angle2);
          const y2 = centerY + 160 + radius * Math.sin(angle2);

          const delay = `${i * 0.02}s`;

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
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <div className="main-top" ref={sectionRef}>
            {isVisible && <DotSVG />}
            <div className="center-logo">
                <h1>JOY CODE ME</h1>
                <h2>AUTOMATIC CODING</h2>
            </div>
            <video className="bg-video" src="resources/main.mp4" muted autoPlay playsInline loop></video>
        </div>
    );
};

export default PageMain;
