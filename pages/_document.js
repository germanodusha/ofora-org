import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="icon"
          sizes="16x16"
          type="image/png"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          sizes="32x32"
          type="image/png"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          type="image/png"
          href="/apple-touch-icon.png"
        />
        <link
          rel="android-chrome"
          sizes="192x192"
          type="image/png"
          href="android-chrome-192x192.png"
        />
        <link
          rel="android-chrome"
          sizes="512x512"
          type="image/png"
          href="android-chrome-512x512.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
        {/* <!-- for Google -->*/}
        <meta name="description" content="Fora is a pluri-disciplinary organization working with cultural expressions and its various intersections." />     
        <meta name="keywords" content="fora, genesys, cultural, production, art, contemporary, institutional, strategy, public, digital, spaces, research, exhibitions, design, expography, books, publications, cultura, produção, cultural, arte, contemporânea, estratégia, institucional, espaços, públicos, comum, pesquisa, exposições, expografia, livros, publicações" />     
        <meta name="author" content="Fora" />   
        {/*<!-- for Facebook -->*/ }   
        <meta property="og:title" content="Fora" />     
        <meta property="og:type" content="article" />     
        <meta property="og:image" content="/fora.png" />     
        <meta property="og:url" content="/ofora.org" />     
        <meta property="og:description" content="Fora is a pluri-disciplinary organization working with cultural expressions and its various intersections." />
        <title>Fora</title>
      </Head>
      <body className="overflow-x-hidden antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
