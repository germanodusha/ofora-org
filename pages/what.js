import { useContext, useEffect } from "react";
import { Context } from "../pages/_app";
import { createClient } from "../prismicio";
import { PrismicRichText } from "@prismicio/react";

const About = ({ page }) => {
  const context = useContext(Context);

  useEffect(() => {
    context.setPage(page);
  }, []);

  return (
    <>
      <div className="video">
        <video autoPlay loop muted playsInline>
          <source src={page.data.video.url} type="video/mp4" />
        </video>
      </div>
      <h1 className="title">{page.data.title}</h1>
      <div className="mx-auto p-20 text-center text-3xl content">
        <PrismicRichText field={page.data.content} />
      </div>
      <div className="content">
      <PrismicRichText field={page.data.infoLeft} />
      <PrismicRichText field={page.data.infoRight} />
      </div>
      <style jsx>{`
        :global(body) {
          background-color: #e8ff00;
          height: 400vh;
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
        }
        .title{
          position: fixed;
          top:25%;
          left:50%;
          overflow: hidden;
          z-index:0;
        }
        .content{
          z-index:1;
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
