import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import { createClient } from "../../prismicio";

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
        <h1 className="text-9xl">{project.data.title}</h1>
      </div>
      <div className="intro p-20 text-center text-3xl">
        <PrismicRichText field={project.data.intro} />
      </div>
      <div className="gallery p-20">
        {project.data.gallery.map((item) => (
          <Image
            key={item.thumb.url}
            src={item.thumb.url}
            width={item.thumb.width}
            height={item.thumb.height}
            alt={item.thumb.alt}
          />
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
        h1 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
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
