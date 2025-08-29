import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import toast from 'react-hot-toast';



const EditGame = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGame = async () => {
            const { data, error } = await supabase
                .from('videogames')
                .select('*')
                .eq('id_videogame', id)
                .single();

            if (error) {
                toast.error('Error al cargar juego')
                navigate('/');
            } else {
                setGame(data);
            }

            setLoading(false);
        };
        fetchGame();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setGame((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('videogames')
            .update({
                name: game.name,
                platform: game.platform,
                language: game.language,
                avaible: game.avaible,
                url_image: game.url_image,
                price: game.price,
                video_id: game.video_id,
            })
            .eq('id_videogame', id);

        if (error) {
            toast.error('Error al guardar cambios en el juego');
        } else {
            toast.success('El juego ha sido editado correctamente');
            navigate('/')
        }
    };

    if (loading) return <div className="text-white text-center mt-10">Cargando...</div>
    console.log('Game:', game);
    if (!game) return null;

    return (
        <div className="max-w-xl mx-auto py-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-green-400 text-center">Editar juego</h2>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow space-y-4">
                <input
                    type="text"
                    name="name"
                    value={game.name}
                    onChange={handleChange}
                    placeholder="Nombre del juego"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <input
                    type="text"
                    name="platform"
                    value={game.platform}
                    onChange={handleChange}
                    placeholder="Plataforma"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <input
                    type="text"
                    name="language"
                    value={game.language}
                    onChange={handleChange}
                    placeholder="Idioma"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <input
                    type="text"
                    name="url_image"
                    value={game.url_image}
                    onChange={handleChange}
                    placeholder="URL de la imagen"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <input
                    type="text"
                    name="video_id"
                    value={game.video_id}
                    onChange={handleChange}
                    placeholder="ID del video de youtube"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <input
                    type="number"
                    name="price"
                    value={game.price}
                    onChange={handleChange}
                    placeholder="Precio"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="avaible"
                        checked={game.avaible}
                        onChange={handleChange}
                        className="form-checkbox bg-gray-700 border-gray-600"
                    />
                    <span>Disponible</span>
                </label>
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold"
                >Guardar cambios
                </button>

            </form>
        </div>
    );


};

export default EditGame;