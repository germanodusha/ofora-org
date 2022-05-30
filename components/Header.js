import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { linkResolver } from "../prismicio";
import { Bounded } from "./Bounded";
import { useContext } from "react";
import { Context } from "../pages/_app";

export const Header = () => {
  const {navigation} = useContext(Context);

  return (
    <Bounded as="header" yPadding="sm">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none">
        <nav>
          <ul className="flex flex-wrap gap-6 md:gap-10">
            {navigation.data.links.map((item) => (
              <li
                key={prismicH.asText(item.label)}
                className="font-semibold tracking-tight text-slate-800"
              >
                <PrismicLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
};
