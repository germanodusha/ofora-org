import Link from "next/link";
import { PrismicLink, PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { createClient } from "../prismicio";
import { repositoryName, linkResolver } from "../prismicio";

import "../styles/globals.css";
import { createContext, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";

const NextLinkShim = ({ href, children, locale, ...props }) => {
  return (
    <Link href={href} locale={locale}>
      <a {...props}>{children}</a>
    </Link>
  );
};

const richTextComponents = {
  paragraph: ({ children }) => <p className="mb-7 last:mb-0">{children}</p>,
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  list: ({ children }) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  preformatted: ({ children }) => (
    <pre className="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicLink
      field={node.data}
      className="underline decoration-1 underline-offset-2"
    >
      {children}
    </PrismicLink>
  ),
};

export const Context = createContext(null);

export default function App({ Component, pageProps, navigation, settings }) {
  const [page, setPage] = useState(null);
  const router = useRouter()
  const context = {
    page,
    setPage,
    navigation,
    settings,
  };

  useEffect(() => {
    router.beforePopState(({ as }) => {
      setTimeout(()=> window.location.reload(), 1500)
      return true
    });

    return () => {
        router.beforePopState(() => true);
    };
}, [router]);

  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={NextLinkShim}
      richTextComponents={richTextComponents}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <Context.Provider value={context}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Context.Provider>
      </PrismicPreview>
    </PrismicProvider>
  );
}

App.getInitialProps = async ({ Component, router, ctx }) => {
  const client = createClient();

  const navigation = await client.getSingle("navigation", { lang: ctx.locale });
  const settings = await client.getSingle("settings", { lang: ctx.locale });

  return {
    navigation,
    settings,
  };
};
