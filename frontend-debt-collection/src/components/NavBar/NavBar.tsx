import { Link } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="sidebar">
      <ul className="nav-links">
        <li className="nav-li">
          <Link to="/" className="nlink">Inicio</Link>
        </li>
        <li className="nav-li">
          <Link to="/debts" className="nlink">Cuotas</Link>
        </li>
        <li className="nav-li">
          <Link to="/parents" className="nlink">Padres e hijos</Link>
        </li>
        <li className="nav-li">
          <Link to="/list-fee" className="nlink">Historical Fee</Link>
        </li>
      </ul>
    </nav>
  );
}