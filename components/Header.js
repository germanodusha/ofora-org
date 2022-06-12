import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "../pages/_app";

export const Header = () => {
  const { page, navigation } = useContext(Context);

  return (
    <header className="header-root flex flex-wrap py-3 pb-14">
      <nav className="w-full">
        <ul className="flex flex-wrap font-semibold uppercase w-full text-center">
          <li className="w-1/2">
            <Link href={"/"}>{navigation.data.home}</Link>
          </li>
          <li className="w-1/2">
            <Link href={"/projects"}>{navigation.data.archive}</Link>
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
