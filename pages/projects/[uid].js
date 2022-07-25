import { PrismicLink, PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import { createClient } from "../../prismicio";
import Modal from "../../components/Modal";
import { useState, useEffect, useRef } from "react";

import { Limiter } from "../../components/Limiter";
import Scroller from "../../components/Scroller";
import Highlighted from "../../components/Highlighted";
import Link from "next/link";
import useScrollPosition from "../../hooks/useScrollPosition";
import { speed } from "../../speed";

const Project = ({ project }) => {
  const { cover, banner } = project.data;

  const [selected, onSelect] = useState();
  const [text, setText] = useState("");

  const [higherScroll, setHigherScroll] = useState(0);
  const [isTypeVisible, setTypeVisibility] = useState(false);

  const scroll = useScrollPosition();
  const introRef = useRef(0);
  const titleRef = useRef(0);
  const leftColumnRef = useRef(0);
  const rightColumnRef = useRef(0);
  //setText(text+=char)
  //project.data.intro[0].text
  function isVisible(ref) {
    console.log(
      higherScroll,
      ref.current.offsetTop - ref.current.offsetHeight * 2
    );
    return higherScroll > ref.current.offsetTop - ref.current.offsetHeight * 2;
  }
  useEffect(() => {
    if (scroll > introRef.current.offsetTop - titleRef.current.offsetHeight) {
      setTypeVisibility(true);
      isTypeVisible ? null : start();
    }
    scroll > higherScroll ? setHigherScroll(scroll) : null;
  }, [scroll]);
  function start(counte = -1) {
    setTimeout(() => {
      if (counte < project.data.intro[0]?.text.length) {
        project.data.intro[0].text[counte]
          ? setText((text += project.data.intro[0].text[counte]))
          : null;
      }
      return start(counte + 1);
    }, speed);
  }
  const image = banner.url ? banner : cover;
  return (
    <div className="page-root">
      <div ref={titleRef} className="cover-and-title flex h-screen grow">
        <div className="title w-1/2 pt-16 text-center uppercase">
          <h1 className="title-container text-3xl md:text-5xl">
            {project.data.title}
          </h1>
          <h2 className="text-3xl md:text-5xl">
            {project.data.year}
            <br />
          </h2>
          <div className="pt-1/2 pt-5 text-xl">{project.data.category}</div>
        </div>
        <div className="banner w-1/2">
          {image.url && (
            <Image
              src={image.url}
              width={image.dimensions.width}
              height={image.dimensions.height}
              alt={image.alt}
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
      </div>
      <Scroller>
        {project.data.title}
        <span className="spacer" />
        {project.data.year}
      </Scroller>
      <Limiter>
        <div
          ref={introRef}
          className="paragraph-container"
        >
          {text}
        </div>
        <div className="gallery p-20">
          {project.data.gallery.map((item, index) => (
            <>
              <Modal
                media={item.media}
                title={item.title}
                visible={selected === index}
                onClose={onSelect}
                key={index}
              />
              <div className="item" key={item.url}>
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
              </div>
            </>
          ))}
        </div>
        <div className="content-container">
          <div
            className={`left-colunm ${
              isVisible(leftColumnRef) ? "is-visible" : "is-not-visible"
            }`}
            ref={leftColumnRef}
          >
            <PrismicRichText
              field={project.data.leftColumn}
              components={{
                hyperlink: ({ children, node }) => (
                  <Link href={node.text} passHref>
                    <a>
                      <Highlighted color="yellow">{children}</Highlighted>
                    </a>
                  </Link>
                ),
              }}
            />
          </div>
          <div
            className={`right-colunm ${
              isVisible(rightColumnRef) ? "is-visible" : "is-not-visible"
            }`}
            ref={rightColumnRef}
          >
            <PrismicRichText
              field={project.data.rightColumn}
              components={{
                hyperlink: ({ children, node }) => (
                  <Link target="_blank" href={node.text} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                      <Highlighted color="yellow">{children}</Highlighted>
                    </a>
                  </Link>
                ),
              }}
            />
          </div>
        </div>
        <div className="footer-gradient" />
      </Limiter>
      <style jsx>{`
        // gallery
        :global(*)::selection{
          text-shadow: 0px -1px 2px var(--yellow), 0px 1px 2px var(--yellow),
           -1px 0px 2px var(--yellow), 1px 0px 2px var(--yellow),
            2px 0px 0px var(--yellow), -2px 0px 0px var(--yellow),
            0px -2px 0px var(--yellow), 0px 2px 0px var(--yellow);
        }
        .content-container {
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:0rem 5rem;
          padding:0px 5rem;
          padding-bottom:8.6875rem;
        }
        .page-root:global(strong) {
          box-shadow: inset 0.5em 0.25em 0.25em -0.4em red, inset -0.5em -0.25em 0.25em -0.4em red,
          inset -0.5em 1em 0.25em -0.4em red, inset -0.5em -0.3em 0.25em -0.4em red;
          border-radius: 0.5em !important;
        }
        .footer-gradient{
          position:fixed;
          bottom:0;
          left:0;
          width:100%;
          height:100px;
          background-image:linear-gradient(
            0deg,
            #fff 40%,
            transparent 100%
          );
        }
        .spacer {
          padding-left: 3rem;
        }
        .item {
          cursor: pointer;
          position: relative;
          text-align: center;
          color: transparent;
          margin: 15px 10px;
          transition: .4s box-shadow;
          line-height: 0px;
        }
        .item:hover {
          box-shadow: 0px 0px 55px 20px #e8ff00;
          background: #e8ff00;
          color: black;
        }
        .item :global(img),
        .item :global(video) {
          transition: .4s opacity;
        }
        .item > span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none; 
          text-transform: uppercase;
          line-height: 1.5rem;
        }
        .item :global(img):hover,
        .item :global(video):hover {
          opacity: 0.2;
        }

        .title {
          position:relative;
          animation: appear-right 1.2s ease-in-out;
        }
        .banner {
          position:relative;
          animation:appear-left 1.2s ease-in-out;
        }
        .is-not-visible  {
          opacity:0;
        }
        .left-colunm {
          position:relative;
          left:-20%;
        }
        .right-colunm{
          position:relative;
          left:20%;
        }
        .is-visible {
          transition:all 2s ease-in-out;
          opacity:1;
          left:0;
        }
        @keyframes appear-left{
          0% {
            opacity:0;
            transform:translateX(20%)
          }
          100% {
            opacity:1;
            transform:translateX(0%);
          }
        }
        @keyframes appear-right{
          0% {
            opacity:0;
            transform:translateX(-20%)
          }
          100% {
            opacity:1;
            transform:translateX(0%);
          }
        }
        @media only screen and (max-width: 768px) {
          .content-container {
            grid-template-columns: 1fr;
            gap:5rem;
          }
          .cover-and-title {
            display:flex;
            flex-direction:column;
          }
          .title {
            width:100%;
            display:grid;
          }
          .title{
            display:grid;
            gap:1rem;
          }
          .banner {
            margin-top:1rem;
            width:100%;
            height:100%;
          }
        @keyframes appear-left{
          0% {
            opacity:0;
            transform:translateY(20%)
          }
          100% {
            opacity:1;
            transform:translateY(0%);
          }
        }
        @keyframes appear-right{
          0% {
            opacity:0;
            transform:translateY(-20%)
          }
          100% {
            opacity:1;
            transform:translateY(0%);
          }
        }
        }

        @media only screen and (min-width: 780px) {
          .title{
            padding-left:1em;
            padding-right :1em;

          }
          .title > div {
            margin-top: calc(50vh - 200px);
          }
          .banner {
            position: relative;
            margin: 4rem 1rem;
            margin-left: 0;
          }
          .banner :global(img) {
            object-position: 100% 50%;
          }
          .gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .item :global(img),
          .item :global(video) {
            max-height: 100px;
          }
        }
        @media only screen and (min-width: 980px) {
          .item :global(img),
          .item :global(video) {
            max-height: 140px;
          }
        @media only screen and (min-width: 1280px) {
          .item :global(img),
          .item :global(video) {
            max-height: 180px;
          }
        }

      `}</style>
    </div>
  );
};

export default Project;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });
  let project;
  try {
    project = await client.getByUID("project", params.uid, {
      lang: locale,
    });
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      project,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const client = createClient();
  const pages = await client.getAllByType("project", { lang: "*" });

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
        locale: page.lang,
      };
    }),
    fallback: false,
  };
}
