import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../pages/_app";
import { createClient } from "../prismicio";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import Scroller from "../components/Scroller";
import Head from "next/head";
import Highlighted from "../components/Highlighted";
import Link from "next/link";
import FadeIn from "../components/FadeIn";

const About = ({ page }) => {
  const context = useContext(Context);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    context.setPage(page);
    setIsLoaded(true);
  }, []);

  return (
    <div>
      <Head>
        <title>{page.data.title}</title>
      </Head>
      <Scroller />
      <video autoPlay loop muted playsInline>
        <source src={page.data.video.url} type="video/mp4" />
      </video>
      <h1>{page.data.title}</h1>
      <div className="container-descript">
        <div className="content sm:p-20 p-10">
          <FadeIn>
            <PrismicRichText field={page.data.content} />
          </FadeIn>
        </div>
        <div className="infoContainer mx-auto p-20">
          <FadeIn>
            <div className={`imageContainer reorder`}>
              <Image layout="fill" src="/fora_logo.svg" alt="Logo do fora" />
            </div>
          </FadeIn>

          <FadeIn>
            <div className={`imageContainer`}>
              <Image layout="fill" src="/G1.png" alt="G1 Logo" />
            </div>
          </FadeIn>
          <div className={`reorder`}>
            <FadeIn>
              <PrismicRichText field={page.data.infoLeft} />
            </FadeIn>
          </div>
          <div>
            <FadeIn>
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
            </FadeIn>
          </div>
        </div>
      </div>
      <style jsx>{`
        :global(body) {
          background-color: #e8ff00;
        }
        video {
          object-fit: cover;
          min-height: 100vh;
          width: 100%;
          position: fixed;
          z-index: -1;
          background: var(--yellow);
          opacity: ${isLoaded ? 1 : 0};
          transition: opacity 1.4s;
          transition-delay: 0.4s;
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
          width: 80vw;
          opacity: ${isLoaded ? 1 : 0};
          transition: opacity 1.5s;
          transition-delay: 0.8s;
        }
        .container-descript {
          all: unset;
          position: absolute;
          top: 100%;
          transition: all 0.8s ease-in-out;
          padding-bottom: 139px;
          background: var(--yellow);

        }
        .content {
          font-size: 1.5rem;
          text-align: center;
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
        @media (min-width: 768px) {
          h1 {
            font-size: 8rem;
          }
          .content {
            font-size: 2rem;
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
