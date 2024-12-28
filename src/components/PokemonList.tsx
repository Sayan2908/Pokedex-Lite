import React from "react";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemonData: {
    name: string;
    url: string;
    types: string[];
  }[];
  onCardClick?: (id: number) => void; // New callback prop
}

export default function PokemonList({ pokemonData, onCardClick }: PokemonListProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {pokemonData.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          name={pokemon.name}
          url={pokemon.url}
          types={pokemon.types}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}
