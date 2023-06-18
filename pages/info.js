import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "./_app";
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
        <title>Fora - {page.data.title}</title>
        {/* <!-- for Google -->*/}
        <meta name="description" content={page.data.Description} />     
        <meta name="keywords" content={page.data.Keywords} />     
        <meta name="author" content="Fora" />   
        {/*<!-- for Facebook -->*/ }   
        <meta property="og:title" content={"Fora - " + page.data.title} />     
        <meta property="og:type" content="article" />     
        <meta property="og:image" content={page.data.Image?.url} />     
        <meta property="og:url" content="https://ofora.org" />     
        <meta property="og:description" content={page.data.Description} />
      </Head>
      <Scroller />
      <video autoPlay loop muted playsInline>
        <source src={page.data.video.url} type="video/mp4" />
      </video>
      <h1>{page.data.title}</h1>
      <div className="container-descript">
        <div className="content p-10 sm:p-20">
          <FadeIn>
            <PrismicRichText field={page.data.content} />
          </FadeIn>
        </div>
        <div className="info mx-auto p-10 sm:p-20 pt-0">
          <div className="left">
            <FadeIn>
              <div className="image">
                <Image layout="fill" src="/fora_logo.svg" alt="Logo do fora" />
              </div>
            </FadeIn>
            <div className="text">
              <FadeIn>
                <PrismicRichText field={page.data.infoLeft} />
              </FadeIn>
            </div>
          </div>
          <div className="right">
            <FadeIn>
              <div className="image">
                <Image layout="fill" src="/G1.png" alt="G1 Logo" />
              </div>
            </FadeIn>

            <div className="text">
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
          text-transform: uppercase;
        }
        .container-descript {
          all: unset;
          position: absolute;
          top: 100%;
          transition: all 0.8s ease-in-out;
          padding-bottom: 3rem;
          background: var(--yellow);

        }
        .content {
          font-size: 1.2rem;
          text-align: center;
        }
        .info {
          font-size: 14px;
          text-align: center;
        }
        .image {
          position: relative;
          width: 230px;
          height: 230px; 
          margin: 2rem auto; 
        } 
        .container {
          all: unset;
        }
        @media (min-width: 768px) {
          h1 {
            font-size: 8rem;
          }
          .content {
            font-size: 2rem;
          }
          .info {
            display: flex;
            text-align: left;
          }
          .image {
            margin: 0 0 2rem;
          }
          .info > div {
            flex: 1;
          }
          .left .text {
            padding-left: 155px
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
