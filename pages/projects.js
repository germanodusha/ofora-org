import { useEffect, useContext, useState } from "react";
import { Context } from "./_app.js";
import { createClient } from "../prismicio";
import Link from "next/link";
import Image from "next/image.js";

const Projects = ({ projects, page }) => {
  const context = useContext(Context);
  const [selected, setSelected] = useState(projects[0]);
  const rgb = "152,152,150";

  useEffect(() => {
    context.setPage(page);
  }, [page]);

  return (
    <div className="projects-page flex grow items-stretch">
      <div className="project-title-container">
        <div className="header-gradient" />
        <div className="footer-gradient" />
        <ul className="text-center text-4xl font-semibold xl:text-5xl">
          {projects.map((project) => (
            <li
              key={project.uid}
              className={selected === project ? "selected" : ""}
              onMouseEnter={() => setSelected(project)}
              onClick={() => setSelected(project)}
            >
              <div
                style={{ pointerEvents: project === selected ? "all" : "none" }}
              >
                <Link href={`/projects/${project.uid}`}>
                  {project.data.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
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
        @media (max-width: 768px) {
          .projects-page {
            display: flex;
            flex-direction: column;
          }
          .projects-page > div:first-child {
            height: 50vh;
            overflow-y: scroll;
          }
          .imageContainer {
            height: 70vh;
          }
        }
        .teste {
          background: red;
        }
        @media (min-width: 768px) {
          .footer-gradient {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 50%;
          height: 100px;

          background-image: linear-gradient(
            180deg,
            rgba(${rgb}, 0) 0%,
            rgba(${rgb}, 1) 70%
          );
          z-index: 10;
        }
        .header-gradient {
          position: fixed;
          top: 0;
          left: 0;
          width: 50%;
          height: 100px;

          background-image: linear-gradient(
            0deg,
            rgba(${rgb}, 0) 0%,
            rgba(${rgb}, 1) 60%
          );
          z-index: 10;
        }
        }
      `}</style>
    </div>
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
