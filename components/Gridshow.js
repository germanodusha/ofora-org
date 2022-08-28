import Image from "next/image";
import { useState } from "react";
import FadeIn from "./FadeIn";
import Modal from "./Modal";

const Gridshow = ({ gallery }) => {
  const [selected, onSelect] = useState();

  return (
    <>
      <div className="Gridshow p-3 sm:p-20">
        {gallery.map((item, index) => (
          <>
            <Modal
              media={item.media}
              title={item.title}
              visible={selected === index}
              onClose={onSelect}
              key={index}
            />
            <div className="item" key={item.url}>
              <FadeIn offset={210}>
                {item.thumb.kind === "image" ? (
                  <Image
                    key={item.thumb.url}
                    src={item.thumb.url}
                    width={(item.thumb.width / item.thumb.height) * 250}
                    height={250}
                    alt={item.thumb.alt}
                    onClick={() => {
                      onSelect(index);
                    }}
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
                    <source src={item.thumb.url} type="video/mp4" />
                  </video>
                )}
                <span>{item.title}</span>
              </FadeIn>
            </div>
          </>
        ))}
      </div>
      <style jsx>{`
        .item {
          cursor: pointer;
          position: relative;
          text-align: center;
          color: transparent;
          margin: 10px 10px;
          transition: 0.4s box-shadow;
          line-height: 0px;
        }
        .item :global(img),
        .item :global(video) {
          transition: 0.4s opacity;
        }
        .item span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          text-transform: uppercase;
          line-height: 1.5rem;
        }
        @media only screen and (max-width: 768px) {
          .Gridshow .item {
            margin-bottom: 6rem;
          }
        }
        @media only screen and (min-width: 768px) {
          .Gridshow {
            display: flex;
            flex-wrap: wrap;
          }
          .item :global(img),
          .item :global(video) {
            height: 180px !important;
            width: 180px !important;
            object-fit: cover;
          }
          .item :global(img):hover,
          .item :global(video):hover {
            opacity: 0.2;
          }
          .item:hover {
            box-shadow: 0px 0px 55px 20px #e8ff00;
            background: #e8ff00;
            color: black;
          }
        }
        @media only screen and (min-width: 1024px) {
          .item :global(img),
          .item :global(video) {
            height: 195px !important;
            width: 195px !important;
            object-fit: cover;
          }
        }
        @media only screen and (min-width: 1280px) {
          .item :global(img),
          .item :global(video) {
            height: 260px !important;
            width: 260px !important;
            object-fit: cover;
          }
        }
      `}</style>
    </>
  );
};

export default Gridshow;
