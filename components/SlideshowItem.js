import Image from "next/image";
import { useState } from "react";
import { useElementSize } from "usehooks-ts";
import Modal from "./Modal";

const SlideshowItem = ({ media, title, active, ratio, size, onClick }) => {
  const [videoRef, videSize] = useElementSize(null);

  return (
    <>
      <div className={`slideshow-item ${active && "active"}`}>
        {media.kind === "image" ? (
          <Image
            src={media.url}
            alt={media.alt}
            width={
              media.width / media.height > ratio
                ? size.width
                : (size.height * media.width) / media.height
            }
            height={
              media.width / media.height > ratio
                ? (size.width * media.height) / media.width
                : size.height
            }
            onClick={() => {
              //onClick({ media, title })
            }}
          />
        ) : (
          <>
            <video playsInline muted loop autoPlay ref={videoRef}>
              <source src={media.url} type="video/mp4" />
            </video>
            <div
              className="slideshow-item-overlay"
              onClick={() => {
                //onClick({ media, title })
              }}
            ></div>
          </>
        )}
        <div className="slideshow-item-title">{title}</div>
      </div>
      <style jsx>{`
        .slideshow-item {
          width: ${size.width}px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          transition-delay: 0s;
          position: relative;
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
        .slideshow-item > :global(video),
        .slideshow-item > :global(span) {
          transition: all 0.5s ease-in-out;
        }
        .slideshow-item:nover > :global(video),
        .slideshow-item:nover > :global(span) {
          box-shadow: 0px 0px 55px 20px #e8ff00;
          background: #e8ff00;
          color: black;
          position: relative;
        }
        .slideshow-item > :global(span):after {
          background: #e8ff00;
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          pointer-events: none;
        }
        .slideshow-item:nover > :global(span):after {
          opacity: 0.7;
        }
        .slideshow-item-overlay {
          position: absolute;
          width: ${videSize.width}px;
          height: ${videSize.height}px;
          background: #e8ff00;
          opacity: 0;
          transition: all 0.5s ease-in-out;
        }
        .slideshow-item:nover > .slideshow-item-overlay {
          opacity: 0.7;
        }
        .slideshow-item-title {
          position: absolute;
          left: 50%;
          bottom: 50%;
          transform: translate(-50%, 50%);
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          opacity: 0;
          z-index: 20;
          transition: all 0.5s ease-in-out;
        }
        .slideshow-item:nover .slideshow-item-title {
          opacity: 1;
          transition-delay: 0.5s;
        }
      `}</style>
    </>
  );
};

export default SlideshowItem;
