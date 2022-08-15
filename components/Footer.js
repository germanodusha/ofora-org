import Link from "next/link";
import { useContext } from "react";
import { Context } from "../pages/_app";
import { useRouter } from "next/router";
import Highlighted from "./Highlighted";

export const Footer = () => {
  const { navigation } = useContext(Context);
  const { asPath } = useRouter();
  if (asPath === "/what") return <div />;
  const highlightedColor = asPath.includes("/projects/") ? "yellow" : "white";

  return (
    <>
      <footer className="flex py-3 pt-14 font-bold uppercase">
        <div className="whatIsButton flex w-1/2 justify-center">
          <Highlighted color={highlightedColor}>
            <Link href={"/what"} passHref>
              {navigation?.data?.what}
            </Link>
          </Highlighted>
        </div>
        <nav className="flex w-1/2 justify-center">
          <ul className="flex flex-wrap gap-6 md:gap-10">
            <li>
              <Highlighted color={highlightedColor}>
                <a href={"/pt-br"}>PT</a>
              </Highlighted>
            </li>
            <li>
              <Highlighted color={highlightedColor}>
                <a href="/en-us">EN</a>
              </Highlighted>
            </li>
          </ul>
        </nav>
        <style jsx>{`
          footer {
            pointer-events: none;
          }
          footer li,
          .whatIsButton {
            pointer-events: auto;
          }
        `}</style>
      </footer>
    </>
  );
};
