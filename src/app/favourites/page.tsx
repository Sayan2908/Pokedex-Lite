"use client";

import React, { useEffect, useState } from "react";
import { useFavorites } from "@/context/FavoritesContext";
import PokemonList from "@/components/PokemonList";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  interface PokemonDetail {
    id: number;
    name: string;
    types: { type: { name: string } }[];
  }

  const [favoritePokemonDetails, setFavoritePokemonDetails] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!favorites.length) {
        setFavoritePokemonDetails([]);
        return;
      }

      try {
        setLoading(true);
        const fetchPromises = favorites.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          if (!response.ok) throw new Error(`Failed to fetch Pokémon with ID ${id}`);
          return response.json();
        });

        const results = await Promise.all(fetchPromises);
        setFavoritePokemonDetails(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  const totalPages = Math.ceil(favoritePokemonDetails.length / itemsPerPage);

  const paginatedFavorites = favoritePokemonDetails.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center p-4">
      <h1 className="my-6 text-3xl font-bold">Your Favorite Pokémon</h1>

      {loading && <p>Loading your favorite Pokémon...</p>}

      {!loading && favorites.length === 0 && (
        <p className="text-gray-600">You haven’t favorited any Pokémon yet.</p>
      )}

      {!loading && favorites.length > 0 && (
        <>
          <PokemonList
            pokemonData={paginatedFavorites.map((pokemon) => ({
              name: pokemon.name,
              url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
              types: pokemon.types.map((t: { type: { name: string } }) => t.type.name),
            }))}
          />

          {totalPages > 1 && (
            <div className="mt-6 flex items-center space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
              >
                Prev
              </button>
              <span className="font-semibold">
                Page {page} of {totalPages || 1}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages || totalPages === 0}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
