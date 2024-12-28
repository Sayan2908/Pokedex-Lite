"use client";

import React from "react";
import { motion } from "framer-motion";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemonData: {
    name: string;
    url: string;
    types: string[];
  }[];
  onCardClick?: (id: number) => void;
  loading?: boolean;
}

export default function PokemonList({ pokemonData, onCardClick, loading }: PokemonListProps) {
  // Parent container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Controls the delay between children animations
      },
    },
  };

  // Child item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full">
      {/* Loader */}
      {loading && (
        <div className="flex items-center justify-center h-60">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Pokémon Cards */}
      {!loading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {pokemonData.map((pokemon) => (
            <motion.div
              key={pokemon.name}
              variants={itemVariants} // Apply child animation variants
            >
              <PokemonCard
                name={pokemon.name}
                url={pokemon.url}
                types={pokemon.types}
                onCardClick={onCardClick}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
