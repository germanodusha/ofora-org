import Image from "next/image";
import { useState } from "react";
import { useElementSize, useInterval, useWindowSize } from "usehooks-ts";

const HEIGHT_FACTOR = 0.5;

const Slideshow = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [slideshowRef, slideshowSize] = useElementSize(null);
  const windowSize = useWindowSize();

  const next = () => setCurrentIndex((currentIndex + 1) % items.length);
  const prev = () => setCurrentIndex((currentIndex - 1) % items.length);
  const onNavMouseEnter = () => setIsNavigating(true);
  const onNavMouseLeave = () => setIsNavigating(false);

  useInterval(() => {
    if (isNavigating) return;
    next();
  }, 6000);

  return (
    <>
      <div className="slideshow" ref={slideshowRef}>
        <div className="slideshow-inner">
          {items.map((item, index) => (
            <div
              key={index}
              className={`slideshow-item ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <Image
                src={item.media.url}
                alt={item.media.alt}
                width={slideshowSize.width}
                height={windowSize.height * 0.7}
                objectFit="contain"
              />
            </div>
          ))}
        </div>
        <div
          className="slideshow-nav"
          onMouseEnter={onNavMouseEnter}
          onMouseLeave={onNavMouseLeave}
        >
          <div onClick={prev}>{"←"}</div>
          <div onClick={next}>{"→"}</div>
        </div>
      </div>
      <style jsx>{`
        .slideshow {
          position: relative;
          height: 50vh;
          min-height: 300px;
          // height: ${slideshowSize.width * HEIGHT_FACTOR}px;
        }
        .slideshow-inner {
          position: absolute;
          top: 0;
          left: 0;
          transform: translate3d(
            -${currentIndex * slideshowSize.width}px,
            0,
            0
          );
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 1s ease-in-out;
        }
        .slideshow-item {
          width: ${slideshowSize.width}px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          transition-delay: 0s;
        }
        .slideshow-item.active {
          opacity: 1;
          transition-delay: 0.6s;
        }
        .slideshow-nav {
          position: absolute;
          bottom: -28px;
          right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.625rem;
        }
        .slideshow-nav div {
          padding: 0 10px;
        }
        .slideshow-nav div:first-child {
          opacity: ${currentIndex === 0 ? 0 : 1};
          pointer-events: ${currentIndex === 0 ? "none" : "auto"};
        }
        .slideshow-nav div:last-child {
          opacity: ${currentIndex === items.length - 1 ? 0 : 1};
          pointer-events: ${currentIndex === items.length - 1 ? "none" : "auto"};
        }
        .slideshow-nav div:hover {
          color: var(--yellow);
        }
        @media (min-width: 768px) {
          .slideshow {
            height: 70vh;
          }
        }
      `}</style>
    </>
  );
};

export default Slideshow;
