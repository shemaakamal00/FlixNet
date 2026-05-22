import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout__content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
