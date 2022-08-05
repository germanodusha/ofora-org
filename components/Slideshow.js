import Image from "next/image";
import { useState } from "react";
import { useElementSize, useInterval, useWindowSize } from "usehooks-ts";
import Highlighted from "./Highlighted";

const Slideshow = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [slideshowRef, slideshowSize] = useElementSize(null);
  const slideshowRatio = slideshowSize.width / slideshowSize.height;

  const next = () => setCurrentIndex((currentIndex + 1) % items.length);
  const prev = () => setCurrentIndex((currentIndex - 1) % items.length);
  const onNavMouseEnter = () => setIsNavigating(true);
  const onNavMouseLeave = () => setIsNavigating(false);

  useInterval(() => {
    if (isNavigating) return;
    //next();
  }, 6000);

  return (
    <>
      <div className="slideshow" ref={slideshowRef}>
        <div className="slideshow-inner">
          {items.map(({media}, index) => (
            <div
              key={index}
              className={`slideshow-item ${
                index === currentIndex ? "active" : ""
              }`}
            >

              {media.kind === "image" ? (
                <Image
                  src={media.url}
                  alt={media.alt}
                  width={media.width / media.height > slideshowRatio ? slideshowSize.width : slideshowSize.height * media.width / media.height}
                  height={media.width / media.height > slideshowRatio ? slideshowSize.width * media.height / media.width : slideshowSize.height}
                  objectFit="contain"
                />
              ) : (
                <video
                  playsInline
                  muted
                  loop
                  autoPlay
                  onClick={() => {
                    onSelect(index);
                  }}
                >
                  <source src={media.url} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>
        <div
          className="slideshow-nav"
          onMouseEnter={onNavMouseEnter}
          onMouseLeave={onNavMouseLeave}
        >
          <div onClick={prev}>
            <Highlighted color="yellow">{"←"}</Highlighted>
          </div>
          <div onClick={next}>
            <Highlighted color="yellow">{"→"}</Highlighted>
          </div>
        </div>
      </div>
      <style jsx>{`
        .slideshow {
          position: relative;
          height: 50vh;
          min-height: 300px;
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
          transition-delay: 0.4s;
        }
        .slideshow-item video {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .slideshow-item :global(img),
        .slideshow-item :global(video) {
          transition: 0.4s opacity;
        }
        .slideshow-item:hover > :global(span),
        .slideshow-item:hover > :global(video) {
          box-shadow: 0px 0px 55px 20px #e8ff00;
          background: #e8ff00;
          color: black;
        }

        .slideshow-nav {
          position: absolute;
          bottom: -28px;
          right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.25rem;
        }
        .slideshow-nav div:first-child {
          opacity: ${currentIndex === 0 ? 0 : 1};
          pointer-events: ${currentIndex === 0 ? "none" : "auto"};
          margin-right: 20px;
        }
        .slideshow-nav div:last-child {
          opacity: ${currentIndex === items.length - 1 ? 0 : 1};
          pointer-events: ${currentIndex === items.length - 1
            ? "none"
            : "auto"};
        }
        @media (max-width: 768px) {
          .slideshow-nav {
            display: none;
          }
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
