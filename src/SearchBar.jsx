
import PropTypes from "prop-types";  // Importar PropTypes

const SearchBar = ({ searchTerm, setSearchTerm, filterPlatform, setFilterPlatform }) => {
  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="platform-filter">
        <label>
          <input
            type="radio"
            value=""
            checked={filterPlatform === ""}
            onChange={(e) => setFilterPlatform(e.target.value)}
          />
          Todos
        </label>
        <label>
          <input
            type="radio"
            value="PS4"
            checked={filterPlatform === "PS4"}
            onChange={(e) => setFilterPlatform(e.target.value)}
          />
          PS4
        </label>
        <label>
          <input
            type="radio"
            value="PS5"
            checked={filterPlatform === "PS5"}
            onChange={(e) => setFilterPlatform(e.target.value)}
          />
          PS5
        </label>
      </div>
    </div>
  );
};

// Definir PropTypes para validar las propiedades
SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  filterPlatform: PropTypes.string.isRequired,
  setFilterPlatform: PropTypes.func.isRequired,
};

export default SearchBar;
