import { useEffect, useContext, useState } from "react";
import { Context } from "./_app.js";
import { createClient } from "../prismicio";
import Link from "next/link";
import Image from "next/image.js";
import Head from "next/head.js";

const Projects = ({ projects, page }) => {
  const context = useContext(Context);
  const [selected, setSelected] = useState(projects[0]);
  const rgb = "152,152,150";

  useEffect(() => {
    context.setPage(page);
  }, [page]);

  return (
    <>
      <Head>
        <title>{page.data.title}</title>
      </Head>
      <div className="projects-page flex grow items-stretch">
        <div className="project-title-container">
          <ul className="text-center text-2xl font-semibold md:text-4xl xl:text-5xl">
            {[...projects].map((project) => (
              <li
                key={project.uid}
                className={selected === project ? "selected" : ""}
                onMouseEnter={() => setSelected(project)}
                onClick={() => setSelected(project)}
              >
                <div
                  style={{
                    pointerEvents: project === selected ? "all" : "none",
                  }}
                >
                  <Link href={`/projects/${project.uid}`}>
                    {project.data.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="header gradient" />
          <div className="footer gradient" />
        </div>
        <div className="imageContainer w-full">
          {selected?.data?.cover && (
            <Image
              layout="fill"
              objectFit="cover"
              alt=""
              src={selected?.data?.cover?.url}
            />
          )}
        </div>
        <style jsx>{`
          .project-title-container {
            top: 0;
            left: 0;
            padding-top: 100px;
            overflow: auto;
            background-color: rgba(152, 152, 152, 1);
          }
          .project-title-container::-webkit-scrollbar {
            width: 0px;
          }
          .projects-page {
            height: 100vh;
          }
          .imageContainer {
            width: 100%;
          }
          .projects-page > div {
            width: 100%;
            position: relative;
          }
          li {
            padding: 5px;
          }
          li.selected {
            width: 100%;
            background: rgb(232, 255, 0);
            background: linear-gradient(
              180deg,
              rgba(232, 255, 0, 0) 0%,
              rgba(232, 255, 0, 1) 16%,
              rgba(232, 255, 0, 1) 84%,
              rgba(232, 255, 0, 0) 100%
            );
          }
          .gradient {
            position: fixed;
            left: 0;
            width: 50%;
            height: 120px;
            pointer-events: none;
          }
          .footer {
            bottom: 0;

            background-image: linear-gradient(
              180deg,
              rgba(${rgb}, 0) 0%,
              rgba(${rgb}, 1) 80%
            );
            z-index: 10;
          }
          .header {
            top: 0;

            background-image: linear-gradient(
              0deg,
              rgba(${rgb}, 0) 0%,
              rgba(${rgb}, 1) 80%
            );
            z-index: 10;
          }

          @media (max-width: 768px) {
            .gradient {
              width: 100%;
            }
            .projects-page > div:first-child {
              overflow-y: scroll;
            }
            .imageContainer {
              display: none;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Projects;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("projects", { lang: locale });

  const ids = page.data.projects.map((p) => p.project.id);

  console.log(ids);

  const projects = await client.getAllByIDs(ids, { lang: locale });

  return {
    props: {
      page,
      projects: projects,
    },
    revalidate: 300,
  };
}
