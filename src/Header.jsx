import { Link } from "react-router-dom";
import "./App.css";
const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/catalogo">Catálogo</Link>
          </li>
        </ul>
      </nav>
      
    </div>
  );
};

export default Header;
