'use client';

import React, { useEffect, useState } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import PokemonList from '@/components/PokemonList';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [favoritePokemonDetails, setFavoritePokemonDetails] = useState<any[]>([]);

  // Fetch details for each favorite ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailPromises = favorites.map(async (id) => {
          const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          return detailRes.json();
        });

        const results = await Promise.all(detailPromises);
        setFavoritePokemonDetails(results);
      } catch (err) {
        console.error(err);
      }
    };

    if (favorites.length) {
      fetchData();
    } else {
      setFavoritePokemonDetails([]);
    }
  }, [favorites]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center p-4">
      <h1 className="my-6 text-3xl font-bold">Your Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite Pokémon yet.</p>
      ) : (
        <PokemonList
          pokemonData={favoritePokemonDetails.map((p) => ({
            name: p.name,
            url: `https://pokeapi.co/api/v2/pokemon/${p.id}/`,
          }))}
        />
      )}
    </div>
  );
}
