import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" sizes="16x16" type="image/png" href="/favicon-16x16.png"/>
        <link rel="icon" sizes="32x32" type="image/png" href="/favicon-32x32.png"></link>
        <link rel="apple-touch-icon" sizes="180x180" type="image/png" href="/apple-touch-icon.png"/>
        <link rel="android-chrome" sizes="192x192" type="image/png" href="android-chrome-192x192.png"/>
        <link rel="android-chrome" sizes="512x512" type="image/png" href="android-chrome-512x512.png"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/> 
        <link rel="preconnect" href="https://fonts.gstatic.com" /> 
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"/>
      </Head>
      <body className="overflow-x-hidden antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
