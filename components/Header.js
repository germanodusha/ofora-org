import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import useScrollPosition from "../hooks/useScrollPosition";
import { Context } from "../pages/_app";
import Highlighted from "./Highlighted";

export const Header = () => {
  const { navigation } = useContext(Context);

  return (
    <header className="header-root flex flex-wrap py-3 pb-14">
      <nav className="w-full">
        <ul className="header-content flex w-full flex-wrap justify-around text-center font-semibold uppercase">
          <li className="">
            <Highlighted>
              <Link href={"/"}>
                <a>{navigation.data.home}</a>
              </Link>
            </Highlighted>
          </li>
          <li className="">
            <Highlighted>
              <Link href={"/projects"}>
                <a>{navigation.data.archive}</a>
              </Link>
            </Highlighted>
          </li>
        </ul>
      </nav>
    </header>
  );
};
