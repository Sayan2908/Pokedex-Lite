import React from "react";
import { useFavorites } from "@/context/FavoritesContext";

interface PokemonCardProps {
  name: string;
  url: string;
  onCardClick?: (id: number) => void; // Callback for when user clicks the card
}

export default function PokemonCard({ name, url, onCardClick }: PokemonCardProps) {
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
    <div className="relative w-full">
      {/* The card itself: we use onClick to open modal */}
      <div
        onClick={handleCardClick}
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border bg-white p-4 shadow hover:shadow-md"
      >
        <img src={imageUrl} alt={name} className="h-24 w-24 object-contain" loading="lazy" />
        <p className="mt-2 capitalize">{name}</p>
      </div>

      {/* Favorite icon in top-right corner */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click
          toggleFavorite(pokemonId);
        }}
        className="absolute right-2 top-2 z-10"
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
