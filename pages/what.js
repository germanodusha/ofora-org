import { useContext, useEffect } from "react";
import { Context } from "../pages/_app";
import { createClient } from "../prismicio";
import { PrismicText } from "@prismicio/react";

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
    <PrismicText field={page.data.content} />
    </>
  );
};

export async function getStaticProps({ locale, previewData }) {
    const client = createClient({ previewData });
  
    const page = await client.getSingle("what", { lang: locale });
  
    return {
      props: {
        page
      },
    };
  }
  

export default About;
