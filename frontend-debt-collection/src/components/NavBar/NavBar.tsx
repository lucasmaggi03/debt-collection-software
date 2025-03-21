import { Link } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="sidebar">
      <div className="logo-container">
        <img className="logo" src="../../../public/taek.webp" alt="Logo" />
      </div>
      <ul className="nav-links">
        <li className="nav-li">
          <Link to="/" className="nlink">Inicio</Link>
        </li>
        <li className="nav-li">
          <Link to="/fees" className="nlink">Cuotas</Link>
        </li>
        <li className="nav-li">
          <Link to="/parents" className="nlink">Tutores</Link>
        </li>
        <li className="nav-li">
          <Link to="/students" className="nlink">Alumnos</Link>
        </li>
      </ul>
    </nav>
  );
}
