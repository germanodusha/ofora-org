import { useEffect, useContext, useState } from "react";
import { Context } from "./_app.js";
import { createClient } from "../prismicio";

const Projects = ({ projects, page }) => {
  const context = useContext(Context);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    context.setPage(page);
  }, [page]);

  return (
    <div className="projects-page flex grow items-stretch">
      <div>
        <ul className="text-center text-3xl font-semibold">
          {projects.map((project) => (
            <li
              key={project.uid}
              onMouseEnter={() => setCover(project.data.cover)}
              onMouseLeave={() => setCover(null)}
            >
              {project.data.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {cover && <img src={cover?.url} />}
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
        li:hover {
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
  };
}
