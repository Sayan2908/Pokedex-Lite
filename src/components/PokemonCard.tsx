import React from "react";
import { useFavorites } from "@/context/FavoritesContext";

interface PokemonCardProps {
  name: string;
  url: string;
  types: string[];
  onCardClick?: (id: number) => void; // Callback for when user clicks the card
}

const typeColors: { [key: string]: string } = {
  fire: "bg-orange-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-green-500 text-white",
  electric: "bg-yellow-500 text-black",
  ground: "bg-yellow-800 text-white",
  rock: "bg-gray-500 text-white",
  fairy: "bg-pink-500 text-white",
  psychic: "bg-purple-500 text-white",
  fighting: "bg-red-700 text-white",
  normal: "bg-gray-300 text-black",
  flying: "bg-indigo-300 text-black",
  poison: "bg-purple-800 text-white",
  bug: "bg-green-300 text-black",
  ice: "bg-cyan-500 text-black",
  ghost: "bg-indigo-700 text-white",
  dragon: "bg-purple-700 text-white",
  dark: "bg-gray-800 text-white",
  steel: "bg-gray-400 text-black",
};

export default function PokemonCard({ name, url, types, onCardClick }: PokemonCardProps) {
  // Extract Pokémon ID
  const getPokemonId = (url: string) => {
    const segments = url.split("/").filter(Boolean);
    return parseInt(segments[segments.length - 1]);
  };
  const pokemonId = getPokemonId(url);

  // Favorites logic
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(pokemonId);

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  // Click handler for opening details (modal)
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(pokemonId);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg bg-gradient-to-b from-indigo-100 to-white p-4 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg"
    >
      {/* Pokémon Image */}
      <div className="relative mb-2 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-white shadow-inner">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Type Badges */}
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {types.map((type) => (
          <span
            key={type}
            className={`rounded-full px-3 py-1 text-sm font-medium ${typeColors[type.toLowerCase()] || "bg-gray-200 text-black"}`}
          >
            {type}
          </span>
        ))}
      </div>;

      {/* Pokémon Name */}
      <p className="mt-2 text-lg font-semibold capitalize text-gray-800">
        {name}
      </p>

      {/* Pokémon ID */}
      <p className="text-sm font-medium text-gray-500">#{pokemonId}</p>

      {/* Favorite Icon */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click
          toggleFavorite(pokemonId);
        }}
        className="absolute right-2 top-2 z-10 p-1"
        aria-label="Toggle Favorite"
      >
        {isFavorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25c0-2.485 2.014-4.5 
              4.5-4.5 1.346 0 2.632.57 
              3.514 1.576L12 7.293l1.736-1.967
              A4.504 4.504 0 0 1 17.25 3.75
              c2.486 0 4.5 2.015 4.5 4.5 
              0 8.25-9 12.75-9 12.75s-9-4.5-9-12.75z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25c0-2.485 
              2.014-4.5 4.5-4.5 1.346 0 
              2.632.57 3.514 1.576L12 
              7.293l1.736-1.967A4.504 4.504 
              0 0 1 17.25 3.75c2.486 0 
              4.5 2.015 4.5 4.5 0 
              8.25-9 12.75-9 12.75s-9-4.5-9-12.75z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
