// src/App.jsx
import React, { useState, useEffect } from 'react';
import Catalogo from './Catalogo';
import ItemForm from './ItemForm';

const App = () => {
  const [games, setGames] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem('games')) || [];
    setGames(storedGames);
  }, []);

  const agregarItem = (newItem) => {
    const updatedGames = [...games, { ...newItem, id: Date.now() }];
    setGames(updatedGames);
    localStorage.setItem('games', JSON.stringify(updatedGames));
  };

  const editarItem = (updatedItem) => {
    const updatedGames = games.map(game => 
      game.id === updatedItem.id ? updatedItem : game
    );
    setGames(updatedGames);
    localStorage.setItem('games', JSON.stringify(updatedGames));
    setEditItem(null);
  };

  return (
    <div>
      <ItemForm 
        agregarItem={agregarItem} 
        editarItem={editarItem} 
        editItem={editItem}
      />
      <Catalogo />
    </div>
  );
};

export default App;
