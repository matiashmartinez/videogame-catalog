import { FaThLarge, FaList, FaSortAlphaDown, FaSortAlphaUpAlt, FaClock } from 'react-icons/fa';

const CatalogToolbar = ({
  searchTerm,
  setSearchTerm,
  selectedPlatform,
  setSelectedPlatform,
  selectedAvailability,
  setSelectedAvailability,
  viewMode,
  setViewMode,
  sortOption,
  setSortOption,
  platforms,
}) => {
  return (
   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-900 rounded-lg shadow mb-4 text-white">
  {/* Filtros básicos */}
  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 w-full">
    
    <input
      type="text"
      placeholder="Buscar..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-auto"
    />

    <select
      value={selectedPlatform}
      onChange={(e) => setSelectedPlatform(e.target.value)}
      className="bg-gray-800 text-white px-2 py-2 rounded border border-gray-700 text-sm w-full sm:w-auto"
    >
      <option value="">Todas</option>
      {platforms.map((plat) => (
        <option key={plat} value={plat}>{plat}</option>
      ))}
    </select>

    <select
      value={selectedAvailability}
      onChange={(e) => setSelectedAvailability(e.target.value)}
      className="bg-gray-800 text-white px-2 py-2 rounded border border-gray-700 text-sm w-full sm:w-auto"
    >
      <option value="">Todo</option>
      <option value="true">Disponible</option>
      <option value="false">Agotado</option>
    </select>

    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="bg-gray-800 text-white px-2 py-2 rounded border border-gray-700 text-sm w-full sm:w-auto"
    >
      <option value="az">A-Z</option>
      <option value="za">Z-A</option>
      <option value="recent">Más recientes</option>
      <option value="oldest">Más antiguos</option>
    </select>
  </div>

  {/* Vista (iconos) */}
  <div className="flex justify-center sm:justify-end gap-2 mt-2 sm:mt-0">
    <button
      onClick={() => setViewMode('card')}
      className={`p-2 rounded border ${viewMode === 'card' ? 'bg-blue-700' : 'bg-gray-700'} hover:bg-blue-600`}
      title="Vista en tarjetas"
    >
      <FaThLarge />
    </button>
    <button
      onClick={() => setViewMode('list')}
      className={`p-2 rounded border ${viewMode === 'list' ? 'bg-blue-700' : 'bg-gray-700'} hover:bg-blue-600`}
      title="Vista en lista"
    >
      <FaList />
    </button>
  </div>
</div>

  );
};

export default CatalogToolbar;
