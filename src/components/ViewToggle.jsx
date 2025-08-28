const ViewToggle = ({ viewMode, setViewMode }) => {
return (
<div className="flex justify-center mb-6">
<button
onClick={() => setViewMode('card')}
className={`px-4 py-2 rounded-l ${viewMode === 'card' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
>
Vista de Tarjetas
</button>
<button
onClick={() => setViewMode('list')}
className={`px-4 py-2 rounded-r ${viewMode === 'list' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
>
Vista de Lista
</button>
</div>
);
};


export default ViewToggle;