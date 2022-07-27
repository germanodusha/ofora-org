import { useEffect, useContext, Suspense } from "react";
import Head from "next/head";
import * as prismicH from "@prismicio/helpers";
import { createClient } from "../prismicio";
import { Context } from "./_app.js";
import { Logo } from "../components/Logo";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import { Stats, OrbitControls } from "@react-three/drei";
import Flag from "../components/Flag";

const flags = [];

const w = 5;
const h = 5;
const dx = 300;
const dy = 300;
const r = () => Math.random() * 30 - 60;
for (let y = 0; y < h; y += 1) {
  for (let x = 0; x < w; x += 1) {
    flags.push({
      id: `${x}-${y}`,
      position: [
        dx * x - (dx * w) / 2 + r(),
        dy * y - (dy * h) / 2 + r(),
        -550,
      ],
    });
  }
}

const Index = ({ page }) => {
  const { setPage } = useContext(Context);

  useEffect(() => {
    setPage(page);
  }, [page, setPage]);

  return (
    <>
      <Head>
        <title>{prismicH.asText(page.data.title)}</title>
      </Head>
      {/* <div className="logo-container">
        <Logo />
      </div> */}
      <div className="canvas-container">
        <Canvas width={1000} height={1000}>
          <pointLight
            position={[10, 10, 10]}
            color={0xffffff}
            intensity={0.8}
          />
          <Suspense fallback={<Loader />}>
            <Flag flag={{ position: [130, 50, -180] }} />
          </Suspense>
          <Stats showPanel={0} />
          <OrbitControls />
        </Canvas>
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
