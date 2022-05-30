import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { linkResolver } from "../prismicio";
import { Bounded } from "./Bounded";
import { useContext } from "react";
import { Context } from "../pages/_app";

export const Footer = () => {
  const {page} = useContext(Context);

  return (
    <Bounded as="header" yPadding="sm">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none">
        <nav>
          <ul className="flex flex-wrap gap-6 md:gap-10">
            {page?.alternate_languages.map((lang) => (
              <li key={lang.lang}>
                <PrismicLink href={linkResolver(lang)} locale={lang.lang}>
                  <span className="sr-only">{lang.lang}</span>
                  {lang.lang.split("-")[0]}
                </PrismicLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
};
