import { useEffect, useContext } from "react";
import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";
import { Context } from "./_app.js";
import { Logo } from "../components/Logo";

const Index = ({ page }) => {
  const context = useContext(Context);

  useEffect(() => {
    context.setPage(page);
  }, []);

  return (
    <>
      <Head>
        <title>{prismicH.asText(page.data.title)}</title>
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
      <div className="logo-container">
        <Logo />
      </div>
      <style jsx>{`
        :global(body) {
          box-shadow: inset 0px 0px 120px 150px rgba(152, 152, 152, 1);
        }
        .logo-container {
          position: fixed; 
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50vh;
          height: 50vh;
          max-width: 60vw;
          max-height: 60vw;
          min-width: 200px;
          min-height: 200px;
          fill: #E8FF00;
      `}</style>
    </>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "home", { lang: locale });

  return {
    props: {
      page
    },
  };
}
