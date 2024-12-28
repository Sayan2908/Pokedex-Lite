"use client";

import React from "react";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";

interface PokemonDetailModalProps {
  loading: boolean;
  pokemon?: {
    name: string;
    id: number;
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
        };
      };
    };
    types: { type: { name: string } }[];
    stats: { stat: { name: string }; base_stat: number }[];
    abilities: { ability: { name: string } }[];
  };
  onClose: () => void;
}

export default function PokemonDetailModal({
  loading,
  pokemon,
  onClose,
}: PokemonDetailModalProps) {
  return (
    <Transition
      appear
      show={true}
      as={React.Fragment}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Loading State */}
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          ) : pokemon ? (
            <div>
              {/* Pokémon Name and ID */}
              <motion.h2
                className="mb-4 text-3xl font-extrabold capitalize text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {pokemon.name}{" "}
                <span className="text-lg font-normal text-gray-600">#{pokemon.id}</span>
              </motion.h2>

              {/* Pokémon Image */}
              <div className="flex items-center justify-center">
                <motion.img
                  src={
                    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
                    "/placeholder.png"
                  }
                  alt={pokemon.name}
                  className="h-36 w-36 object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Pokémon Type(s) */}
              <div className="mt-4">
                <h3 className="font-semibold text-xl text-gray-700">Type(s):</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.types?.map((t) => (
                    <motion.span
                      key={t.type.name}
                      className="rounded-full bg-blue-100 px-3 py-1 text-blue-800"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {t.type.name}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Pokémon Stats */}
              <div className="mt-4">
                <h3 className="mb-1 font-semibold text-xl text-gray-700">Stats:</h3>
                <div className="space-y-2">
                  {pokemon.stats?.map((statObj) => (
                    <motion.div
                      key={statObj.stat.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="capitalize text-lg font-medium text-gray-800">
                          {statObj.stat.name}
                        </span>
                        <span className="font-bold text-gray-800">{statObj.base_stat}</span>
                      </div>
                      <div className="relative h-2 w-full rounded bg-gray-200">
                        <motion.div
                          className="absolute left-0 top-0 h-2 rounded bg-blue-500"
                          style={{
                            width: `${(statObj.base_stat / 200) * 100}%`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(statObj.base_stat / 200) * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pokémon Abilities */}
              <div className="mt-4">
                <h3 className="mb-1 font-semibold text-xl text-gray-700">Abilities:</h3>
                <ul className="list-disc pl-4">
                  {pokemon.abilities?.map((a) => (
                    <li
                      key={a.ability.name}
                      className="capitalize text-lg text-gray-800"
                    >
                      {a.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Pokémon data not found.
            </div>
          )}
        </div>
      </div>
    </Transition>
  );
}
