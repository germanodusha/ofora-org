import Image from "next/image";
import { useRef, useState } from "react";
import { CloseIcon, SoundIcon } from "./Icons";

const Modal = ({ title, media, visible, onClose }) => {
  const videoRef = useRef();
  const [muted, setMuted] = useState(true);

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
      <div className="actions">
        <div
          className="close"
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
            }
            onClose(null);
          }}
        >
          <CloseIcon />
        </div>
        {media.kind !== "image" && (
          <div
            className="sound"
            onClick={() => {
              setMuted(!muted);
              videoRef.current.muted = !videoRef.current.muted;
            }}
          >
            <SoundIcon />
          </div>
        )}
      </div>

      <style jsx>{`
        .backdrop {
          position: fixed;
          bottom: 0;
          right: 0;
          top: 0;
          left: 0;
          background: var(--yellow);
          z-index: 901;
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
          top: 89px;
          right: 80px;
          cursor: pointer;
          opacity: ${muted ? 0.4 : 1};
        }
        video {
          width: 100%;
          height: 100%;
        }
        @media (min-width: 768px) {
          .sound:hover {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
export default Modal;
