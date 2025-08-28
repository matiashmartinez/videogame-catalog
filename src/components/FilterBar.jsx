const FilterBar = ({ filterPlatform, setFilterPlatform, filterAvailability, setFilterAvailability }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <div>
                <label className="text-sm mr-2">Plataforma:</label>
                <select
                    value={filterPlatform}
                    onChange={(e) => setFilterPlatform(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1"
                >
                    <option value="">Todas</option>
                    <option value="PS4">PS4</option>
                    <option value="PS5">PS5</option>
                </select>
            </div>
            <div>
                <label className="text-sm mr-2">Disponibilidad:</label>
                <select
                    value={filterAvailability}
                    onChange={(e) => setFilterAvailability(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1"
                >
                    <option value="">Todos</option>
                    <option value="available">Disponible</option>
                    <option value="unavailable">Agotado</option>
                </select>
            </div>
        </div>
    );
};


export default FilterBar;