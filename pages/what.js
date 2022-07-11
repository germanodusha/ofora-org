import { useContext, useEffect } from "react";
import { Context } from "../pages/_app";
import { createClient } from "../prismicio";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import Scroller from "../components/Scroller";

const About = ({ page }) => {
  const context = useContext(Context);

  useEffect(() => {
    context.setPage(page);
  }, []);
  return (
    <>
    <Scroller />
      <div className="video">
        <video autoPlay loop muted playsInline>
          <source src={page.data.video.url} type="video/mp4" />
        </video>
      </div>
      <h1>{page.data.title}</h1>
      <div className="mx-auto p-20 text-center text-3xl">
        <PrismicRichText field={page.data.content} />
      </div>
      <div className="mx-auto p-20 text-center infoContainer">
        <PrismicRichText field={page.data.infoLeft} />
        <PrismicRichText field={page.data.infoRight} />
      </div>
      <div className="mx-auto px-20 py-10 text-center flex w-full justify-around">
        <div className="imageContainer">
          <Image layout="fill" src="/fora_logo.svg" alt="Logo do fora"/>
        </div>
        <div className="imageContainer">
          <Image layout="fill" src="/G1.png" alt="G1 Logo"/>
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
        }
        h1 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #e8ff00;
          font-size: 8rem;
          background: transparent;
        }
        .infoContainer{
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding-bottom: 5px;
        }
        .infoContainer strong{
          all:unset;
          box-sizing:border-box;
          background: linear-gradient(180deg, var(--yellow) 50%, #FFFFFF 50%);
          padding:0px 5px; 
        }
        .infoContainer > :global(*:first-child) {
          font-size: 1.5rem;
        }
        .imageContainer{
          position: relative;
          width: 230px;
          height: 230px;
        }
      `}</style>
    </>
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
