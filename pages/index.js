import { useEffect, useContext } from "react";
import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";
import { Context } from "./_app.js";

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
