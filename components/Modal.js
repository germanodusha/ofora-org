import Image from "next/image";
import { useRef } from "react";
import { CloseIcon, SoundIcon } from "./Icons";

const Modal = ({ title, media, visible, onClose }) => {
  const videoRef = useRef();

  return (
    <div className="backdrop">
      <div className="content">
        <div className="cover">
          {media.kind === "image" ? (
            <Image
              alt={title}
              src={media.url}
              layout="fill"
              objectFit="contain"
            />
          ) : (
            <video autoPlay muted playsInline loop ref={videoRef}>
              <source src={media.url} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <div
        className="close"
        onClick={() => {
          videoRef.current.muted = true;
          onClose(null);
        }}
      >
        <CloseIcon />
      </div>
      <div
        className="sound"
        onClick={() => {
          videoRef.current.muted = !videoRef.current.muted;
        }}
      >
        <SoundIcon />
      </div>

      <style jsx>{`
        .backdrop {
          position: fixed;
          bottom: 0;
          right: 0;
          top: 0;
          left: 0;
          background: var(--yellow);
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: ${visible ? "all" : "none"};
          opacity: ${visible ? 1 : 0};
          transition: 0.8s opacity;
        }
        .cover {
          position: relative;
          top: 0;
          left: 0;
          height: 75vh;
          width: 75vw;
        }
        .title {
          height: 30px;
          display: block;
          text-align: center;
        }
        .close {
          position: absolute;
          top: 90px;
          right: 40px;
          cursor: pointer;
          opacity: 0.4;
        }
        .close:hover {
          opacity: 1;
        }
        .sound {
          position: absolute;
          top: 140px;
          right: 40px;
          cursor: pointer;
          opacity: ${videoRef.current?.muted ? 0.4 : 1};
        }
        .sound:hover {
          opacity: 1;
        }
        video {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};
export default Modal;
