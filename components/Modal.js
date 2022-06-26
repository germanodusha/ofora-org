import Image from "next/image";

const Modal = ({ title, media, visible, onClose }) => {
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
            <video autoPlay playsInline muted>
              <source src={media.url} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <div className="close" onClick={() => onClose(null)}>
        &times;
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
            transition: 0.7s opacity;
        }
        .cover{
            position: relative;
            top:0;
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
            top: 122px;
            right: 10vw;
            cursor:pointer;
            font-size:52px;
            color: gray;
            text-shadow: 2px 2px 2px gray;
        }
        .close:hover{
            color:var(--yellow)
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
