import Link from "next/link";
import { PrismicLink } from "@prismicio/react";
import { linkResolver } from "../prismicio";
import { useContext } from "react";
import { Context } from "../pages/_app";
import { useRouter } from "next/router";
import Highlighted from "./Highlighted";

export const Footer = () => {
  const { page, navigation } = useContext(Context);
  const languages = page ? [page.lang, ...page.alternate_languages] : [];
  const { asPath } = useRouter();
  if (asPath === "/what") {
    return <div></div>;
  }
  const highlightedColor = asPath.includes("/projects/") ? "yellow" : "white";
  console.log(highlightedColor);
  return (
    <footer className="flex py-3 pt-14 font-bold uppercase">
      <div className="whatIsButton flex w-1/2 justify-center">
        <Highlighted color={highlightedColor}>
          <Link href={"/what"} passHref>
            {navigation.data.what}
          </Link>
        </Highlighted>
      </div>
      <nav className="flex w-1/2 justify-center">
        <ul className="flex flex-wrap gap-6 md:gap-10">
          <li>
            <Highlighted color={highlightedColor}>
              <a href={"/"}>
                <a>PT</a>
              </a>
            </Highlighted>
          </li>
          <li>
          <Highlighted color={highlightedColor}>
              <a href="/en-us">
                <a>EN</a>
              </a>
            </Highlighted>
          </li>
          {/* {languages.map((lang) => (
            <li key={lang.lang}>
              <Highlighted color={highlightedColor}>
                <PrismicLink href={linkResolver(lang)} locale={lang.lang}>
                  <span className="sr-only" style={{ fontWeight: "normal" }}>
                    {lang.lang}
                  </span>
                  <a style={{ fontWeight: "normal" }}>
                    {lang.lang.split("-")[0]}
                  </a>
                </PrismicLink>
              </Highlighted>
            </li>
          ))} */}
        </ul>
      </nav>
    </footer>
  );
};
