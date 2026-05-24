import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand">
        FlixNet
      </NavLink>
      <nav className="navbar__links" aria-label="Huvudmeny">
        <NavLink to="/" end className="navbar__link">
          Hem
        </NavLink>
        <NavLink to="/search" className="navbar__link">
          Sök
        </NavLink>
        <NavLink to="/watchlist" className="navbar__link">
          Min lista
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
