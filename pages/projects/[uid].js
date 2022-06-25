import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import { createClient } from "../../prismicio";
import { Logo } from "../../components/Logo";
import Modal from "../../components/Modal";
import { useState } from "react";

const Project = ({ project }) => {
  const { cover, banner } = project.data;
  const [content, setContent] = useState()

  const image = banner.url ? banner : cover;
  return (
    
    <div className="page-root">
      <div className="background" />
      <div className="flex h-screen grow items-center justify-center">
        <div className="banner">
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
        <div className="title text-center uppercase">
          <h1 className="text-8xl">{project.data.title}</h1>
          <h2 className="text-8xl">
            {project.data.year}
            <br />
          </h2>
          <div className="pt-5 text-xl">{project.data.category}</div>
        </div>
        <div className="logo">
          <Logo />
        </div>
      </div>
      <div className="intro p-20 text-center text-3xl">
        <PrismicRichText field={project.data.intro} />
      </div>
      <div className="gallery p-20">
        {project.data.gallery.map((item, index) => (
          <Modal visible={index===2} key={index}>
            <div className="item" key={item.url}>
              {item.thumb.kind === "image" ? (
                    <Image
                    key={item.thumb.url}
                    src={item.thumb.url}
                    width={item.thumb.width/item.thumb.height*250}
                    height={250}
                    alt={item.thumb.alt}
                    />
              ) : (
                <video autoPlay playsInline muted>
                  <source src={item.thumb.url} type="video/mp4" />
                </video>
              )}
              <span>{item.title}</span>
            </div>
          </Modal>
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
        h1,
        h2 {
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
        @media only screen and (min-width: 800px) {
          .gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .item :global(img),
          .item :global(video) {
            max-height: 160px;
          }
        }
        @media only screen and (min-width: 1200px) {
          .item :global(img),
          .item :global(video) {
            max-height: 220px;
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
