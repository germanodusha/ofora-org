import { PrismicLink } from "@prismicio/react";
import { linkResolver } from "../prismicio";
import { useContext } from "react";
import { Context } from "../pages/_app";

export const Footer = () => {
  const { page } = useContext(Context);
  const languages = page ? [page.lang, ...page.alternate_languages] : [];

  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none py-8">
      <nav className="flex w-1/2 justify-center">
        <ul className="flex flex-wrap gap-6 font-bold uppercase md:gap-10">
          {languages.map((lang) => {
            return lang.lang ? (
              <li key={lang.lang}>
                <PrismicLink href={linkResolver(lang)} locale={lang.lang}>
                  <span className="sr-only">{lang.lang}</span>
                  {lang.lang.split("-")[0]}
                </PrismicLink>
              </li>
            ) : (
              <li key={lang}>
                <span className="sr-only">{lang.lang}</span>
                {lang.split("-")[0]}
              </li>
            );
          })}
        </ul>
      </nav>
      <style jsx>{`
        li:hover :global(a) {
          color: #e8ff00;
        }
      `}</style>
    </footer>
  );
};
