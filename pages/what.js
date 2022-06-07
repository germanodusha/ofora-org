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
      <h1>{page.data.title}</h1>
      <div className="mx-auto p-20 text-center text-3xl">
        <PrismicRichText field={page.data.content} />
      </div>
      <style jsx>{`
        :global(body) {
          background-color: #e8ff00;
        }
        video {
          object-fit: cover;
          min-height: 100vh;
          width: 100%;
        }
        .video {
          position: relative;
        }
        .video:after,
        .video:before {
          position: absolute;
          content: "";
          display: block;
          left: 0;
          right: 0;
          height: 100px;
          z-index: 1;
        }
        .video:after {
          top: 0;
          bottom: auto;
          background: linear-gradient(
            180deg,
            rgba(232, 255, 0, 1) 30%,
            rgba(232, 255, 0, 0) 100%
          );
        }
        .video:before {
          top: auto;
          bottom: 0;
          background: linear-gradient(
            180deg,
            rgba(232, 255, 0, 0) 0%,
            rgba(232, 255, 0, 1) 70%
          );
        }
        h1 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #e8ff00;
          font-size: 8rem;
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
