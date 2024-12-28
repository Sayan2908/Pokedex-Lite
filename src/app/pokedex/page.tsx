"use client";

import React, { useEffect, useState } from "react";
import PokemonList from "@/components/PokemonList";
import PokemonDetailModal from "@/components/PokemonDetailModal";

export default function PokedexPage() {
  // ------------------------------------------------------------------
  // --------------------- Main State Variables ------------------------
  // ------------------------------------------------------------------
  const [allPokemon, setAllPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // For Detailed Pokémon (modal)
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // For Type List
  const [allTypes, setAllTypes] = useState<string[]>([]);

  // ------------------------------------------------------------------
  // ------------------- Pagination State Variables --------------------
  // ------------------------------------------------------------------
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  // ------------------------------------------------------------------
  // 1) Fetch **all** Pokémon once (set a large limit, e.g. 2000)
  // ------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch a large limit to cover all Pokémon (~1300+ total)
        // This single fetch will include name & URL for each Pokémon
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const data = await response.json();
        setAllPokemon(data.results); // Store them in state
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ------------------------------------------------------------------
  // 2) Fetch All Types
  // ------------------------------------------------------------------
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/type");
        if (!res.ok) throw new Error("Failed to fetch types");
        const data = await res.json();
        const names = data.results.map((t: any) => t.name);
        setAllTypes(names);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTypes();
  }, []);

  // ------------------------------------------------------------------
  // 3) (Optional) Fetch Full Details for *every* Pokémon
  //     - This can be very heavy (1000+ requests).
  //     - Alternatively, fetch details only for the current page.
  // ------------------------------------------------------------------
  const [detailedPokemonList, setDetailedPokemonList] = useState<any[]>([]);

  useEffect(() => {
    // Example: fetch details for ALL Pokémon in allPokemon
    // This can be slow for 1000+ Pokémon, so consider only page data if you want to be more efficient.
    const fetchDetails = async () => {
      if (!allPokemon.length) return;

      try {
        const detailPromises = allPokemon.map(async (p) => {
          const detailRes = await fetch(p.url);
          return detailRes.json();
        });
        const detailsArray = await Promise.all(detailPromises);
        setDetailedPokemonList(detailsArray);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [allPokemon]);

  // ------------------------------------------------------------------
  // 4) Filter for search + selectedType
  // ------------------------------------------------------------------
  const filteredPokemon = detailedPokemonList.filter((pokemon) => {
    // Search filter
    const matchesSearch = pokemon.name.includes(searchTerm.toLowerCase());
    // Type filter
    if (!selectedType) return matchesSearch;

    const hasType = pokemon.types.some((t: any) => t.type.name === selectedType);
    return matchesSearch && hasType;
  });

  // ------------------------------------------------------------------
  // 5) Pagination of the filtered list
  // ------------------------------------------------------------------
  // Calculate the total pages
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  // Ensure the current page is not out of bounds after filtering
  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  // Slice the filtered array for the current page
  const paginatedPokemon = filteredPokemon.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handlers for next/previous page
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

  // ------------------------------------------------------------------
  // 6) Modal: Fetch single Pokémon detail on demand (when card is clicked)
  // ------------------------------------------------------------------
  const handleOpenModal = async (pokemonId: number) => {
    setDetailLoading(true);
    setShowModal(true);

    try {
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

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPokemonDetails(null);
  };

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center p-4">
      <h1 className="my-6 text-3xl font-bold">Pokédex</h1>

      {/* Loading / Error states */}
      {loading && <p>Loading Pokémon list...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* SEARCH & TYPE FILTERS */}
      <div className="mb-4 flex w-full max-w-xl flex-col gap-4 sm:flex-row">
        {/* Search */}
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchTerm}
          onChange={(e) => {
            setPage(1); // reset to first page on new search
            setSearchTerm(e.target.value);
          }}
          className="w-full flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Type */}
        <select
          value={selectedType}
          onChange={(e) => {
            setPage(1); // reset to first page on new filter
            setSelectedType(e.target.value);
          }}
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

      {/* Display Filtered + Paginated Pokémon */}
      {!loading && !error && (
        <>
          <PokemonList
            pokemonData={paginatedPokemon.map((p) => ({
              name: p.name,
              url: `https://pokeapi.co/api/v2/pokemon/${p.id}/`,
              types: p.types.map((t: any) => t.type.name),
            }))}
            onCardClick={handleOpenModal}
          />

          {/* Pagination Controls */}
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
        </>
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
