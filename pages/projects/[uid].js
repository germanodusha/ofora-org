import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import { createClient } from "../../prismicio";
import { Logo } from "../../components/Logo";

const Project = ({ project }) => {
  const { cover, banner } = project.data;
  const image = banner.url ? banner : cover;

  return (
    <div className="page-root">
      <div className="background" />
      <div className="flex h-screen grow items-center justify-center">
        <div className="banner">
          <Image
            src={image.url}
            width={image.dimensions.width}
            height={image.dimensions.height}
            alt={image.alt}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="title text-center uppercase">
          <h1 className="text-8xl">
            {project.data.title}
          </h1>
          <h2 className="text-8xl">
            {project.data.year}
            <br />
          </h2>
          <div className="text-xl pt-5">
            {project.data.category}
          </div>
        </div>
        <div className="logo">
          <Logo />
        </div>
      </div>
      <div className="intro p-20 text-center text-3xl">
        <PrismicRichText field={project.data.intro} />
      </div>
      <div className="gallery p-20">
        {project.data.gallery.map((item) => (
          <div className="item" key={item.url}>
            <Image
              key={item.thumb.url}
              src={item.thumb.url}
              width={item.thumb.width}
              height={item.thumb.height}
              alt={item.thumb.alt}
            />
          </div>
        ))}
      </div>
      <div className="content columns-2 p-20">
        <PrismicRichText field={project.data.content} />
      </div>
      <style jsx>{`
        .background {
          box-shadow: inset 0px 0px 120px 150px rgba(152, 152, 152, 1);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .banner {
          width: 60vw;
          height: 60vh;
          position: relative;
        }
        .title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        h1, h2 {
          text-shadow: 0px 2px 15px rgba(152, 152, 152, 1);
        }
        .title > div {
          color: #e8ff00;
        }
        .logo {
          position: absolute;
          top: 10vh;
          right: 10vh;
          height: 200px;
          width: 200px;
          fill: #e8ff00;
        }
        .gallery .item {
          width: 26vw;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default Project;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const project = await client.getByUID("project", params.uid, {
    lang: locale,
  });

  return {
    props: {
      project,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("project", { lang: "*" });

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
        locale: page.lang,
      };
    }),
    fallback: false,
  };
}
