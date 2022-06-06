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
      <video autoPlay loop muted playsInline>
        <source src={page.data.video.url} type="video/mp4" />
      </video>
      <h1>{page.data.title}</h1>
      <div className="mx-auto text-center p-20 text-3xl">
        <PrismicRichText field={page.data.content} />
      </div>
      <style jsx>{`
        :global(body) {
          background-color: #e8ff00;
        }
        video {
          object-fit: cover;
          min-height: 100vh;
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
  };
}

export default About;
