import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout__content">
        {/* Outlet renders whichever child route is currently active */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
