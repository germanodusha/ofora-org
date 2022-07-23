import React, { useState, useEffect } from "react";

const Scroller = ({ children }) => {
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
    <div className="root">
      <div className="content">{children}</div>
      <style jsx>
        {`
          .root {
            position: relative;
            width: 100%;
            background: ${scrollPosition>0?"#e8ff00":"transparent"};
            display: flex;
            justify-content: center;
            position: fixed;
            padding-top: 40px;
            padding-bottom: 16px;
            top: 0px;
            font-weight: bold;
            transition: all 0.9s;
            transform: translate3d(
              0,
              ${children && isVisible ? "0px" : "-38px"},
              0
            );
            z-index: 3;
            text-transform: uppercase;
          }
          .content {
            transition: opacity 1s;
            opacity: ${children && isVisible ? 1 : 0};
            pointer-events: none;
            min-height: 1.5rem;
            font-weight:normal;
          }
        `}
      </style>
    </div>
  );
};
export default Scroller;
