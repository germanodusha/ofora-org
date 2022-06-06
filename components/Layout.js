import { useRouter } from "next/router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  const router = useRouter();
  const showFrame = router.pathname.startsWith("/projects/");

  return (
    <div className="layout-root flex flex-col text-slate-800">
      <Header />
      {children}
      <Footer />
      <style jsx>{`
        .layout-root {
          height: 100vh;
          height: -moz-available; /* WebKit-based browsers will ignore this. */
          height: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
          height: fill-available;
        }
        .layout-root > :global(:first-child) {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          ${
            showFrame &&
            `
          background: linear-gradient(
            180deg,
            rgba(152, 152, 152, 1) 30%,
            rgba(152, 152, 152, 0) 100%
          );
          `
          }
        }
        .layout-root > :global(:last-child) {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          ${
            showFrame &&
            `
          background: linear-gradient(
            180deg,
            rgba(152, 152, 152, 0) 0%,
            rgba(152, 152, 152, 1) 70%
          );
          `
          }
      `}</style>
    </div>
  );
};
