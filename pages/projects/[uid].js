import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
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
import Head from "next/head";
import { useRouter } from "next/router";
import Slideshow from "../../components/Slideshow";
import FadeIn from "../../components/FadeIn";
import Gridshow from "../../components/Gridshow";

const Project = ({ project }) => {
  const { asPath } = useRouter();
  const { cover, banner } = project.data;

  const [text, setText] = useState("");

  const [higherScroll, setHigherScroll] = useState(0);
  const [isTypeVisible, setTypeVisibility] = useState(false);

  const scroll = useScrollPosition();
  const introRef = useRef(0);
  const titleRef = useRef(0);

  const hasSlider = project.data.mediaLayout?.includes("Slider");
  const hasGallery = project.data.mediaLayout?.includes("Gallery");
  const sliderFirst =
    hasSlider && project.data.mediaLayout?.startsWith("Slider");

  useEffect(() => {
    if (scroll > introRef.current.offsetTop - titleRef.current.offsetHeight) {
      setTypeVisibility(true);
      isTypeVisible ? null : start();
    }
    scroll > higherScroll && setHigherScroll(scroll);
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
    <>
      <Head>
        <title>Fora - {project.data.title}</title>
        {/* <!-- for Google -->*/}
        <meta
          name="description"
          content={prismicH.asText(project.data.intro)}
        />
        <meta
          name="keywords"
          content="fora, genesys, cultural, production, art, contemporary, institutional, strategy, public, digital, spaces, research, exhibitions, design, expography, books, publications, cultura, produção, cultural, arte, contemporânea, estratégia, institucional, espaços, públicos, comum, pesquisa, exposições, expografia, livros, publicações"
        />
        <meta name="author" content="Fora" />
        {/*<!-- for Facebook -->*/}
        <meta property="og:title" content={project.data.title} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={image.url} />
        <meta property="og:url" content={"https://ofora.org" + asPath} />
        <meta
          property="og:description"
          content={prismicH.asText(project.data.intro)}
        />
      </Head>
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
            <div className="category pt-1/2 pt-5 text-xl">
              {project.data.category}
            </div>
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
            className="paragraph-container intro-container px-10 sm:p-20"
          >
            {text}
          </div>
          <div className="gallery">
            {hasSlider && sliderFirst && (
              <FadeIn offset={250}>
                <Slideshow items={project.data.slider} />
              </FadeIn>
            )}
            {hasGallery && (
              <FadeIn offset={250}>
                <Gridshow gallery={project.data.gallery} />
              </FadeIn>
            )}
            {hasSlider && !sliderFirst && (
              <FadeIn offset={250}>
                <Slideshow items={project.data.slider} />
              </FadeIn>
            )}
          </div>
          <div className="content-container">
            <div className={`left-colunm`}>
              <FadeIn>
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
              </FadeIn>
            </div>
            <div className={`right-colunm`}>
              <FadeIn>
                <PrismicRichText
                  field={project.data.rightColumn}
                  components={{
                    hyperlink: ({ children, node }) => (
                      <Link target="_blank" href={node.data.url} passHref>
                        <a target="_blank" rel="noopener noreferrer">
                          <Highlighted color="yellow">{children}</Highlighted>
                        </a>
                      </Link>
                    ),
                  }}
                />
              </FadeIn>
            </div>
          </div>
          <div className="footer-gradient" />
        </Limiter>
        <style jsx>{`
          // gallery
          :global(*)::selection {
            text-shadow: 0px -1px 2px var(--yellow), 0px 1px 2px var(--yellow),
              -1px 0px 2px var(--yellow), 1px 0px 2px var(--yellow),
              2px 0px 0px var(--yellow), -2px 0px 0px var(--yellow),
              0px -2px 0px var(--yellow), 0px 2px 0px var(--yellow);
          }
          .intro-container {
            width: 100%;
          }
          .content-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0rem 5rem;
            padding: 0px 5rem;
            padding-bottom: 5rem;
          }
          .page-root:global(strong) {
            box-shadow: inset 0.5em 0.25em 0.25em -0.4em red,
              inset -0.5em -0.25em 0.25em -0.4em red,
              inset -0.5em 1em 0.25em -0.4em red,
              inset -0.5em -0.3em 0.25em -0.4em red;
            border-radius: 0.5em !important;
          }
          .footer-gradient {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100px;
            background-image: linear-gradient(
              0deg,
              rgba(255, 255, 255, 1) 40%,
              rgba(255, 255, 255, 0) 100%
            );
            z-index: 899;
            pointer-events: none;
          }
          .paragraph-container {
            font-size: 1.5rem;
            text-align: center;
            min-height: 250px;
          }
          .spacer {
            padding-left: 3rem;
          }
          .title {
            position: relative;
            animation: appear-right 1.2s ease-in-out;
          }
          .banner {
            position: relative;
            animation: appear-left 1.2s ease-in-out;
          }
          .is-not-visible {
            opacity: 0;
          }
          .left-colunm {
            position: relative;
            left: 0;
          }
          .right-colunm {
            position: relative;
            left: 0;
            min-height: 300px;
          }
          @keyframes appear-left {
            0% {
              opacity: 0;
              transform: translateX(20%);
            }
            100% {
              opacity: 1;
              transform: translateX(0%);
            }
          }
          @keyframes appear-right {
            0% {
              opacity: 0;
              transform: translateX(-20%);
            }
            100% {
              opacity: 1;
              transform: translateX(0%);
            }
          }
          @media only screen and (max-width: 768px) {
            .page-root {
              padding-bottom: 5rem;
            }
            .content-container {
              grid-template-columns: 1fr;
              padding: 0px 2rem;
              gap: 2rem;
            }
            .cover-and-title {
              display: flex;
              flex-direction: column;
            }
            .title {
              width: 100%;
              display: grid;
              gap: 1rem;
            }
            .title > * {
              padding: 0 0.9rem;
            }
            .banner {
              margin-top: 1rem;
              width: 100%;
              height: 100%;
            }
            .paragraph-container {
              margin-top: 3rem;
            }
            .category {
              margin-bottom: 2rem;
            }
            .gallery {
              margin-top: 3rem;
            }
            @keyframes appear-left {
              0% {
                opacity: 0;
                transform: translateY(20%);
              }
              100% {
                opacity: 1;
                transform: translateY(0%);
              }
            }
            @keyframes appear-right {
              0% {
                opacity: 0;
                transform: translateY(-20%);
              }
              100% {
                opacity: 1;
                transform: translateY(0%);
              }
            }
          }

          @media only screen and (min-width: 768px) {
            .title {
              padding-left: 1em;
              padding-right: 1em;
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
            .paragraph-container {
              font-size: 2rem;
            }

        `}</style>
      </div>
    </>
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
