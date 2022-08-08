import Image from "next/image";
import { useState } from "react";
import { useElementSize, useInterval, useWindowSize } from "usehooks-ts";
import Highlighted from "./Highlighted";
import Modal from "./Modal";
import SlideshowItem from "./SlideshowItem";

const Slideshow = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [slideshowRef, slideshowSize] = useElementSize(null);
  const slideshowRatio = slideshowSize.width / slideshowSize.height;

  const next = () => setCurrentIndex((currentIndex + 1) % items.length);
  const prev = () => setCurrentIndex((currentIndex - 1) % items.length);
  const onNavMouseEnter = () => setIsNavigating(true);
  const onNavMouseLeave = () => setIsNavigating(false);

  const [selected, setSelected] = useState(null);

  useInterval(() => {
    if (isNavigating) return;
    //next();
  }, 6000);

  return (
    <>
      <div className="slideshow" ref={slideshowRef}>
        <div className="slideshow-inner">
          {items.map(({ media, title }, index) => (
            <SlideshowItem
              ratio={slideshowRatio}
              size={slideshowSize}
              media={media}
              title={title}
              active={index === currentIndex}
              key={index}
              onClick={setSelected}
            />
          ))}
        </div>
        {selected && (
          <Modal
            media={selected.media}
            title={selected.title}
            visible={true}
            onClose={() => setSelected(null)}
          />
        )}
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
          margin-bottom: 100px;
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
        .slideshow-nav {
          position: absolute;
          bottom: -38px;
          right: 20px;
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
