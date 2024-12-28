"use client";

import React, { useEffect, useState } from "react";
import PokemonList from "@/components/PokemonList";
import PokemonDetailModal from "@/components/PokemonDetailModal";

export default function PokedexPage() {

  interface Pokemon {
    name: string;
    url: string;
    types: string[];
  }

  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [allTypes, setAllTypes] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  interface PokemonDetails {
    id: number;
    name: string;
    types: { type: { name: string } }[];
    sprites: { other: { "official-artwork": { front_default: string } } };
    stats: { stat: { name: string }, base_stat: number }[];
    abilities: { ability: { name: string } }[];
  }

  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetails | null>(null);

  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0");
        if (!response.ok) throw new Error("Failed to fetch Pokémon data");
        const data = await response.json();

        const detailedDataPromises = data.results.map(async (pokemon: { name: string; url: string }) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            url: pokemon.url,
            types: details.types.map((t: { type: { name: string } }) => t.type.name),
          };
        });

        const detailedData = await Promise.all(detailedDataPromises);
        setAllPokemon(detailedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type");
        if (!response.ok) throw new Error("Failed to fetch Pokémon types");
        const data = await response.json();
        setAllTypes(data.results.map((type: { name: string }) => type.name));
      } catch (err) {
        console.error(err);
      }
    };

    fetchTypes();
  }, []);

  const filteredPokemon = allPokemon.filter((pokemon) => {
    const matchesSearch = pokemon.name.includes(searchTerm.toLowerCase());
    if (!selectedType) return matchesSearch;

    const matchesType = pokemon.types.includes(selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  const paginatedPokemon = filteredPokemon.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => prev - 1);

  const handleOpenModal = async (pokemonId: number) => {
    setShowModal(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      if (!res.ok) throw new Error("Failed to fetch Pokémon detail");
      setSelectedPokemonDetails(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="mx-auto w-full max-w-7xl p-4">
      <h1 className="my-6 text-4xl font-bold text-white">Pokédex</h1>

      <div className="mb-6 flex w-full max-w-xl flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-black rounded-full border border-gray-300 px-4 py-2 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-transform duration-300 ease-in-out hover:scale-105"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full text-black rounded-full border border-gray-300 px-4 py-2 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <option value="">All Types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <PokemonList
        pokemonData={paginatedPokemon}
        onCardClick={handleOpenModal}
        loading={loading}
      />

      <div className="mt-6 flex justify-center space-x-4 items-center">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-300 shadow-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={page * itemsPerPage >= filteredPokemon.length}
          className="px-4 py-2 rounded bg-blue-600 text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showModal && selectedPokemonDetails && (
        <PokemonDetailModal
          pokemon={selectedPokemonDetails}
          onClose={handleCloseModal}
          loading={false}
        />
      )}
    </div>
  );
}