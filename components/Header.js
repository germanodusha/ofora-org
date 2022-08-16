import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "../pages/_app";
import Highlighted from "./Highlighted";

export const Header = () => {
  const { navigation } = useContext(Context);
  const { locale } = useRouter()

  return (
    <header className="header-root flex flex-wrap py-3 pb-14">
      <nav className="w-full">
        <ul className="header-content flex w-full flex-wrap justify-around text-center font-semibold uppercase">
          <li className="">
            <Highlighted>
                <a href={"/"+locale}>{navigation?.data?.home}</a>
            </Highlighted>
          </li>
          <li className="">
            <Highlighted>
              <Link href={"/projects"}>
                <a>{navigation?.data?.archive}</a>
              </Link>
            </Highlighted>
          </li>
        </ul>
      </nav>
    </header>
  );
};
