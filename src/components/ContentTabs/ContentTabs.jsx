import { NavLink } from "react-router-dom";
import "./ContentTabs.css";

function ContentTabs() {
  return (
    <nav className="content-tabs" aria-label="Browse FlexNet">
      <NavLink to="/" end className="content-tabs__link">
        Nytt och populärt
      </NavLink>
      <NavLink to="/watchlist" className="content-tabs__link">
        Min lista
      </NavLink>
    </nav>
  );
}

export default ContentTabs;
