import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="header-root flex flex-wrap py-8">
      <nav className="w-full">
        <ul className="flex flex-wrap font-semibold uppercase w-full text-center">
          <li className="w-1/2">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="w-1/2">
            <Link href={"/projects"}>Arquivo 2018-2020</Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        .header-root :global(a):hover {
          color: #E8FF00;
        }
      `}</style>
    </header>
  );
};
