"use client";

import React, { useEffect, useState } from "react";
import PokemonList from "@/components/PokemonList";
import PokemonDetailModal from "@/components/PokemonDetailModal";

export default function PokedexPage() {
  const [allPokemon, setAllPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // For Detailed Pokémon
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // 1) Fetch ~150 Pokémon once
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get first 150 Pokémon
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const data = await response.json();
        setAllPokemon(data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2) Fetch All Types
  const [allTypes, setAllTypes] = useState<string[]>([]);
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/type");
        const data = await res.json();
        const names = data.results.map((t: any) => t.name);
        setAllTypes(names);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTypes();
  }, []);

  // 3) Fetch Detailed Pokémon for local filtering
  const [detailedPokemonList, setDetailedPokemonList] = useState<any[]>([]);
  useEffect(() => {
    const fetchDetails = async () => {
      if (!allPokemon.length) return;

      try {
        const detailsPromises = allPokemon.map(async (p) => {
          const detailRes = await fetch(p.url);
          return detailRes.json();
        });
        const detailsArray = await Promise.all(detailsPromises);
        setDetailedPokemonList(detailsArray);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [allPokemon]);

  // 4) Filter for search + selectedType
  const filteredPokemon = detailedPokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.includes(searchTerm.toLowerCase());
    if (!selectedType) return matchesSearch;
    // If a type is selected, ensure the Pokémon has it
    const hasType = pokemon.types.some((t: any) => t.type.name === selectedType);
    return matchesSearch && hasType;
  });

  // 5) Function to open the modal when a card is clicked
  const handleOpenModal = async (pokemonId: number) => {
    setDetailLoading(true);
    setShowModal(true);

    try {
      // Fetch the single Pokemon detail
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      if (!res.ok) throw new Error("Failed to fetch Pokémon detail");
      const data = await res.json();
      setSelectedPokemonDetails(data);
    } catch (err) {
      console.error(err);
      setSelectedPokemonDetails(null);
    } finally {
      setDetailLoading(false);
    }
  };

  // 6) Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPokemonDetails(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center p-4">
      <h1 className="my-6 text-3xl font-bold">Pokédex</h1>

      {/* Loading / Error states */}
      {loading && <p>Loading Pokémon...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* SEARCH & TYPE FILTERS */}
      <div className="mb-4 flex w-full max-w-xl flex-col gap-4 sm:flex-row">
        {/* Search */}
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Type */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Display Filtered Pokémon */}
      {!loading && !error && (
        <PokemonList
          pokemonData={filteredPokemon.map((p) => ({
            name: p.name,
            url: `https://pokeapi.co/api/v2/pokemon/${p.id}/`,
          }))}
          onCardClick={handleOpenModal}
        />
      )}

      {/* Detail Modal */}
      {showModal && (
        <PokemonDetailModal
          loading={detailLoading}
          pokemon={selectedPokemonDetails}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
