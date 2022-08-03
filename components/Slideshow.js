import Image from "next/image";
import { useState } from "react";
import { useElementSize, useInterval } from "usehooks-ts";

const Slideshow = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideshowRef, slideshowSize] = useElementSize(null);

  useInterval(() => {
    setCurrentIndex((currentIndex + 1) % items.length);
  }, 3000);

  return (
    <>
      <div className="slideshow" ref={slideshowRef}>
        <div className="slideshow-inner">
          {items.map((item, index) => (
            <div
              key={index}
              className={`slideshow-item ${
                items === currentIndex ? "active" : ""
              }`}
            >
              <Image
                src={item.media.url}
                alt={item.media.alt}
                width={slideshowSize.width}
                height={600}
                objectFit="contain"
              />
            </div>
          ))}
        </div>
        {/* <div className="slideshow-nav">
          {items.map((item, index) => (
            <div
              key={index}
              className={`slideshow-nav-item ${
                items === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              o
            </div>
          ))}
        </div> */}
      </div>
      <style jsx>{`
        .slideshow {
          position: relative;
          height: 600px;
        }
        .slideshow-inner {
          position: absolute;
          top: 0;
          left: 0;
          transform: translate3d(-${currentIndex * slideshowSize.width}px, 0, 0);
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 1s ease-in-out .3s;
        }
        .slideshow-item {
          width: ${slideshowSize.width}px;
          height: 100%;
        }
        .slideshow-item.active {
          opacity: 1;
        }
        .slideshow-nav {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .slideshow-nav-item {
          position: relative;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: all 0.8s ease-in-out;
        }
        .slideshow-nav-item.active {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default Slideshow;
