import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  return (
    <div className="text-slate-800">
      <Header/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};
