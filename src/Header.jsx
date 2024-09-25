import { Link } from "react-router-dom";
import "./App.css";
const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">VideoGames PS4 & PS5</Link>
          </li>
          <li>
            <Link to="/catalogo"> </Link>
          </li>
        </ul>
      </nav>
      
    </div>
  );
};

export default Header;
