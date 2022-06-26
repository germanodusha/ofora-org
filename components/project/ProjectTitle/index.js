import React, { useState, useEffect } from "react";

const ProjectTitle = ({ title, date }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [height, setHeight] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };
  const handleWindowSize = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleWindowSize, { passive: true });
    setHeight(window.innerHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isVisible = scrollPosition > 220;

  return (
    <div>
      <div className="project-title">
        <span>{title}</span>
        <span> {date}</span>
      </div>
      <style jsx>
        {`
          .project-title {
            position: relative;
            width: 100%;
            background: var(--yellow);
            display: flex;
            justify-content: center;
            position: fixed;
            padding-top: 40px;
            padding-bottom: 16px;
            top: 0px;
            font-weight: bold;
            transition: transform 0.9s;
            transform: translate3d(0,${isVisible ? "0px" : "-150px"},0);
            z-index: 3;
            text-transform: uppercase;
          }
          .project-title > span {
            margin-left: 10px;
          }
        `}
      </style>
    </div>
  );
};
export default ProjectTitle;
