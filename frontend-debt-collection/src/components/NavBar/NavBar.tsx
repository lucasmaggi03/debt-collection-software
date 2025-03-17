import { Link } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="sidebar">
      <ul className="nav-links">
        <li className="nav-li">
          <Link to="/" className="nlink">Home</Link>
        </li>
        <li className="nav-li">
          <Link to="/debts" className="nlink">Debts</Link>
        </li>
        <li className="nav-li">
          <Link to="/parents" className="nlink">Parents</Link>
        </li>
        <li className="nav-li">
          <Link to="/list-fee" className="nlink">Historical Fee</Link>
        </li>
      </ul>
    </nav>
  );
}