import Image from "next/image";

const Modal = ({ title, media, visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="container">
      <div className="modalContent">
        <div className="content">
          <span className="title">
            {title}
          </span>
          <div className="cover">
            <Image
              alt={title}
              src={media.url}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="closeIcon" onClick={() => onClose(null)}>
          &times;
        </div>
      </div>
      <style jsx>{`
        .container{
            all:unset;
            position: fixed;
            width: 100vw;
            height: 100vh;
            top:0;
            left: 0;
            background: var(--yellow);
            z-index:1;
        }
        .cover{
            position: relative;
            top:0;
            left: 0;
            height: 50vh;
            width: 40vw;
        }
        .title{
            width: 100%;
            display: flex;
            align-items:center;
            justify-content:center;
        }
        .modalContent{
            position: relative;
            top: 92px;
            left: 50%;
            transform: translate(-50%, 0);
            display: flex;
            justify-content:center;
            align-items:center;
            padding:10px;
            z-index:1000
            flex-shrink:0;
        }
        .closeIcon{
            all:unset;
            width: 1%;
            cursor: pointer;
            height: 1px;
            font-size:32px;
            padding-left: 30px;
            align-self:flex-start;
        }
        .closeIcon:hover{
            color:var(--yellow)
        }
     `}</style>
    </div>
  );
};
export default Modal;
