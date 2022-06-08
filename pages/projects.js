import { useEffect, useContext, useState } from "react";
import { Context } from "./_app.js";
import { createClient } from "../prismicio";
import Link from "next/link";

const Projects = ({ projects, page }) => {
  const context = useContext(Context);
  const [selected, setSelected] = useState(projects[0]);

  useEffect(() => {
    context.setPage(page);
  }, [page]);

  return (
    <div className="projects-page flex grow items-stretch">
      <div>
        <ul className="text-center text-3xl font-semibold capitalize">
          {projects.map((project) => (
            <li
              key={project.uid}
              className={selected === project ? "selected" : ""}
              onMouseEnter={() => setSelected(project)}
            >
              <Link href={`/projects/${project.uid}`}>
                {project.data.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selected?.data?.cover && <img src={selected?.data?.cover?.url} />}
      </div>
      <style jsx>{`
        .projects-page > div {
          width: 50%;
          position: relative;
        }
        .projects-page > div:first-child {
          background-color: rgba(152, 152, 152, 1);
          padding-top: 100px;
        }
        li {
          padding: 5px;
        }
        li.selected {
          background: rgb(232, 255, 0);
          background: linear-gradient(
            180deg,
            rgba(232, 255, 0, 0) 0%,
            rgba(232, 255, 0, 1) 16%,
            rgba(232, 255, 0, 1) 84%,
            rgba(232, 255, 0, 0) 100%
          );
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default Projects;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "projects", { lang: locale });
  const projects = await client.getByType("project", { lang: locale });

  return {
    props: {
      page,
      projects: projects.results,
    },
    revalidate: 300
  };
}
