import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import { createClient } from "../../prismicio";
import { Logo } from "../../components/Logo";
import { Limiter } from "../../components/Limiter";

const Project = ({ project }) => {
  const { cover, banner } = project.data;
  const image = banner.url ? banner : cover;
  return (
    <div className="page-root">
      <Limiter>
        <div className="flex h-screen grow">
          <div className="title text-center uppercase w-1/2 pt-24">
            <h1 className="text-3xl md:text-5xl">{project.data.title}</h1>
            <h2 className="text-3xl md:text-5xl">
              {project.data.year}
              <br />
            </h2>
            <div className="pt-5 text-xl pt-1/2">{project.data.category}</div>
          </div>
          <div className="banner w-1/2">
            {image.url && (
              <Image
                src={image.url}
                width={image.dimensions.width}
                height={image.dimensions.height}
                alt={image.alt}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        </div>
        <div className="intro p-10 text-center text-lg md:p-20 md:text-xl lg:text-3xl">
          <PrismicRichText field={project.data.intro} />
        </div>
        <div className="gallery p-10 sm:p-20">
          {project.data.gallery.map((item) => (
            <div className="item" key={item.url}>
              {item.thumb.kind === "image" ? (
                <Image
                  key={item.thumb.url}
                  src={item.thumb.url}
                  width={(item.thumb.width / item.thumb.height) * 320}
                  height={320}
                  alt={item.thumb.alt}
                />
              ) : (
                <video autoPlay playsInline muted>
                  <source src={item.thumb.url} type="video/mp4" />
                </video>
              )}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
        <div className="content p-10 md:columns-2 md:p-20">
          <PrismicRichText field={project.data.content} />
        </div>
      </Limiter>
      <style jsx>{`
        // cover
        .banner {
          position: relative;
        }
        .title {

        }

        // gallery
        .item {
          margin-top: 10px;
          cursor: pointer;
          position: relative;
          text-align: center;
          color: transparent;
          margin: 10px;
          transition: .4s box-shadow;
          line-height: 0px;
        }
        .item:hover {
          box-shadow: 0px 0px 50px 6px #e8ff00;
          background: #e8ff00;
          color: black;
        }
        .item :global(img),
        .item :global(video) {
          transition: .4s opacity;
        }
        .item > span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none; 
          text-transform: uppercase;
          line-height: 1.5rem;
        }
        .item :global(img):hover,
        .item :global(video):hover {
          opacity: 0.4;
        }
        @media only screen and (min-width: 780px) {
          .title > div{
            margin-top: calc(50vh - 200px);
          }
          .banner {

          }
          .gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .item :global(img),
          .item :global(video) {
            max-height: 100px;
          }
        }
        @media only screen and (min-width: 980px) {
          .item :global(img),
          .item :global(video) {
            max-height: 140px;
          }
        @media only screen and (min-width: 1280px) {
          .item :global(img),
          .item :global(video) {
            max-height: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default Project;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });
  let project;
  try {
    project = await client.getByUID("project", params.uid, {
      lang: locale,
    });
  } catch (e) {
    console.log(e);
  }
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
