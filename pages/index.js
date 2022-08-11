import { useEffect, useContext, Suspense } from "react";
import Head from "next/head";
import { createClient } from "../prismicio";
import { Context } from "./_app.js";
import { Canvas } from "@react-three/fiber";
import Flag from "../components/Flag";
import useWindowSize from "../hooks/useWindowSize";

const Index = ({ page }) => {
  const { setPage, settings } = useContext(Context);

  useEffect(() => {
    setPage(page);
  }, [page, setPage]);

  const windowSize = useWindowSize()
  const windowWidth = windowSize.width || 0
  const flagX = 10
  const flagZ = -140 + (windowWidth / 18)

  return (
    <>
      <Head>
        <title>{page.data.title}</title>
        {/* <!-- for Google -->*/}
        <meta name="description" content={settings.data.description} />     
        <meta name="keywords" content="fora, genesys, cultural, production, art, contemporary, institutional, strategy, public, digital, spaces, research, exhibitions, design, expography, books, publications, cultura, produção, cultural, arte, contemporânea, estratégia, institucional, espaços, públicos, comum, pesquisa, exposições, expografia, livros, publicações" />     
        <meta name="author" content="Fora" />   
        {/*<!-- for Facebook -->*/ }   
        <meta property="og:title" content={page.data.title} />     
        <meta property="og:type" content="article" />     
        <meta property="og:image" content={settings.data.image.url} />     
        <meta property="og:url" content="https://ofora.org" />     
        <meta property="og:description" content={settings.data.description} />
      </Head>
      <div className="canvas-container">
        <Canvas width={1000} height={1000}>
          <pointLight
            position={[10, 10, 10]}
            color={0xffffff}
            intensity={0.90}
          />
          <Suspense fallback={null}>
            <Flag flag={{ position: [flagX, 60, flagZ] }} />
          </Suspense>
        </Canvas>
      </div>

      <style jsx>{`
        :global(body) {
          background-color: var(--yellow);
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
          fill: #e8ff00;
        }
        .canvas-container {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
      `}</style>
    </>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home", { lang: locale });

  return {
    props: {
      page,
    },
    revalidate: 300,
  };
}
