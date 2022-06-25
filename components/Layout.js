import { useRouter } from "next/router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  const router = useRouter();
  const showFrame = router.pathname !== "/projects"
  const rgb = router.pathname !== "/what" ? "152, 152, 152" : "232, 255, 0";

  return (
    <div className="layout-root flex flex-col">
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
        }
        .layout-root > :global(:last-child) {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
        }
      `}</style>
    </div>
  );
};
