import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "../pages/_app";
import Highlighted from "./Highlighted";

export const Header = () => {
  const { page, navigation } = useContext(Context);

  return (
    <header className="header-root flex flex-wrap py-3 pb-14">
      <nav className="w-full">
        <ul className="flex flex-wrap font-semibold uppercase w-full justify-around text-center">
          <li className="">
            <Highlighted>
              <Link href={"/"}>
                {navigation.data.home}
              </Link>
            </Highlighted>
          </li>
          <li className="">
            <Highlighted>
              <Link href={"/projects"}>{navigation.data.archive}</Link>
            </Highlighted>
          </li>
        </ul>
      </nav>
    </header>
  );
};
