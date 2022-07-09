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
  const {asPath} = useRouter();
  if(asPath === '/what'){
    return(<div></div>)
  }
  return (
    <footer className="flex py-3 pt-14 font-bold uppercase">
      <div className="flex w-1/2 justify-center whatIsButton">
        <Link href={"/what"} passHref>
          <Highlighted>{navigation.data.what}</Highlighted>
        </Link>
        <div className="backdrop"/>
      </div>
      <nav className="flex w-1/2 justify-center">
        <ul className="flex flex-wrap gap-6 md:gap-10">
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
        .backdrop{
          position: fixed;
          height: 100vh;
          width: 100vw;
          top: 0;
          right: 0;
          background: black;
          opacity: 0;
          pointer-events:none;
          z-index:0;
        }
        .whatIsButton:hover>div{
          background-color: black;
          opacity: 0.5;
        }
      `}</style>
    </footer>
  );
};
