const SearchBar = ({ searchTerm, setSearchTerm }) => {
return (
<div className="mb-4 text-center">
<input
type="text"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
placeholder="Buscar por nombre..."
className="w-full md:w-1/2 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring"
/>
</div>
);
};


export default SearchBar;