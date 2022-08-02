import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../pages/_app";
import { createClient } from "../prismicio";
import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Image from "next/image";
import Scroller from "../components/Scroller";
import useScrollPosition from "../hooks/useScrollPosition";
import Head from "next/head";
import Highlighted from "../components/Highlighted";
import Link from "next/link";

const About = ({ page }) => {
  const context = useContext(Context);
  const scroll = useScrollPosition();
  const [higherScroll, setHigherScroll] = useState(0);

  const firstImageRef = useRef(0);
  const secondImageRef = useRef(0);
  const firstTextRef = useRef(0);
  const secondTextRef = useRef(0);
  const thirdTextRef = useRef(0);

  function imageStart(ref) {
    const realTopPos = ref.current.offsetTop;
    return higherScroll >= realTopPos;
  }

  const [higherScrollPosition, setHigherScrollPosition] = useState(0);
  useEffect(() => {
    if (scroll > higherScrollPosition) {
      setHigherScrollPosition(scroll);
    }
  }, [scroll, higherScrollPosition]);

  useEffect(() => {
    context.setPage(page);
  }, []);

  function isVisible(ref) {
    if (ref?.current) {
      return (
        ref.current.offsetTop + ref.current.offsetHeight * 0.4 <
        higherScrollPosition
      );
    }
    return false;
  }

  return (
    <div>
      <Head>
        <title>{page.data.title}</title>
      </Head>
      <Scroller />
      <div className="video">
        <video autoPlay loop muted playsInline>
          <source src={page.data.video.url} type="video/mp4" />
        </video>
      </div>
      <h1>{page.data.title}</h1>
      <div className="container-descript">
        <div
          ref={firstTextRef}
          className={`paragraph-container ${
            isVisible(firstTextRef) ? "is-visible" : "is-not-visible"
          }`}
        >
          <PrismicRichText field={page.data.content} />
        </div>
        <div className="infoContainer mx-auto p-20">
          <div
            ref={firstImageRef}
            className={`imageContainer reorder ${
              isVisible(firstImageRef) ? "is-visible" : "is-not-visible"
            }`}
          >
            <Image layout="fill" src="/fora_logo.svg" alt="Logo do fora" />
          </div>
          <div
            ref={secondImageRef}
            className={`imageContainer ${
              isVisible(secondImageRef) ? "is-visible" : "is-not-visible"
            }`}
          >
            <Image layout="fill" src="/G1.png" alt="G1 Logo" />
          </div>
          <div
            ref={secondTextRef}
            className={`reorder ${
              isVisible(secondTextRef) ? "is-visible" : "is-not-visible"
            }`}
          >
            <PrismicRichText field={page.data.infoLeft} />
          </div>
          <div
            ref={thirdTextRef}
            className={`${
              isVisible(thirdTextRef) ? "is-visible" : "is-not-visible"
            }`}
          >
            <PrismicRichText
              field={page.data.infoRight}
              components={{
                hyperlink: ({ children, node }) => (
                  <Link href={node.data.url} passHref target="_blank">
                    <a target="_blank">
                      <Highlighted color="white">{children}</Highlighted>
                    </a>
                  </Link>
                ),
              }}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        * {
          background-color: #e8ff00;
        }
        video {
          object-fit: cover;
          min-height: 100vh;
          width: 100%;
          position: fixed;
          z-index: -1;
          background: var(--yellow);
        }
        h1 {
          position: fixed;
          top:50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #e8ff00;
          font-size: 5rem;
          background: transparent;
          text-align: center;
          width: 80vw
        }
        .container-descript {
          all: unset;
          position: absolute;
          top: 100%;
          transition: all 0.8s ease-in-out;
          padding-bottom: 139px;
          background: var(--yellow);

        }
        .infoContainer {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          padding-top: 0px;
          gap:4rem;
          padding-bottom: 5px;
          font-size: 14px;
        }
        .imageContainer {
          position: relative;
          width: 230px;
          height: 230px;  
          transition: all 0.8s ease-in-out;
        } 
        .container {
          all: unset;
        }
        .reorder {
          order:-1;
        }
        .is-not-visible {
          opacity: 0;
          transform: translateY(20%)
        }
        .is-visible {
          transition: all 0.8s ease-in-out;
          transform: translateY(0%)
          opacity: 1;
        }
        @media (min-width: 768px) {
          h1 {
            font-size: 8rem;
          }
          .infoContainer {
            grid-template-columns: 1fr 1fr;
            grid-auto-flow: row;
          }
          .infoContainer .reorder {
            padding-left: 150px
          }
          .reorder {
          order:0;
        }
        }
      `}</style>
    </div>
  );
};

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("what", { lang: locale });

  return {
    props: {
      page,
    },
    revalidate: 300,
  };
}

export default About;
