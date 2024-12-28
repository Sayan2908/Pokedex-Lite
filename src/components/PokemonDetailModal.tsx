"use client";

import React from "react";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion"; // Import Framer Motion

interface PokemonDetailModalProps {
  loading: boolean;
  pokemon: any; // Could define a more specific type
  onClose: () => void;
}

export default function PokemonDetailModal({
  loading,
  pokemon,
  onClose,
}: PokemonDetailModalProps) {
  // Basic Tailwind modal overlay + content
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
        {/* Modal Container */}
        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {loading ? (
            // Loading Spinner
            <div className="flex h-48 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          ) : pokemon ? (
            // Pokémon Info
            <div>
              <motion.h2
                className="mb-4 text-3xl font-extrabold capitalize text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {pokemon.name}{" "}
                <span className="text-lg font-normal text-gray-600">#{pokemon.id}</span>
              </motion.h2>

              {/* Official Artwork */}
              <div className="flex items-center justify-center">
                <motion.img
                  src={
                    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
                    "/placeholder.png"
                  }
                  alt={pokemon.name}
                  className="h-36 w-36 object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Types */}
              <div className="mt-4">
                <h3 className="font-semibold text-xl text-gray-700">Type(s):</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.types?.map((t: any) => (
                    <motion.span
                      key={t.type.name}
                      className="rounded-full bg-blue-100 px-3 py-1 text-blue-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {t.type.name}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4">
                <h3 className="mb-1 font-semibold text-xl text-gray-700">Stats:</h3>
                <div className="space-y-2">
                  {pokemon.stats?.map((statObj: any) => (
                    <motion.div
                      key={statObj.stat.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="capitalize text-lg font-medium">{statObj.stat.name}</span>
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

              {/* Abilities */}
              <div className="mt-4">
                <h3 className="mb-1 font-semibold text-xl text-gray-700">Abilities:</h3>
                <ul className="list-disc pl-4">
                  {pokemon.abilities?.map((a: any) => (
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
            // In case no data is available after loading
            <div className="p-4 text-center text-gray-500">
              Pokémon data not found.
            </div>
          )}
        </div>
      </div>
    </Transition>
  );
}
