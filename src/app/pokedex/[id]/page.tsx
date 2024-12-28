import React from "react";

// This is a type for the Pokémon API response
type PokemonDetail = {
  name: string;
  id: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
};

// Next.js 13 App Router: 
// `params` object is automatically supplied for dynamic routes
export default async function PokemonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch detail data on the server side
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    // Handle 404 or API error
    return <div className="p-4 text-center">Pokémon not found!</div>;
  }

  const pokemon = (await res.json()) as PokemonDetail;

  // Extract the relevant information
  const name = pokemon.name;
  const officialArtwork = pokemon.sprites.other["official-artwork"].front_default;
  const types = pokemon.types.map((t) => t.type.name);
  const stats = pokemon.stats;       // e.g., HP, Attack, etc.
  const abilities = pokemon.abilities.map((a) => a.ability.name);

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center p-4">
      {/* Header / Title */}
      <h1 className="mb-4 text-3xl font-bold capitalize">
        {name} <span className="text-xl font-normal">#{pokemon.id}</span>
      </h1>

      {/* Main Card Container */}
      <div className="w-full rounded-lg bg-white p-4 shadow-md sm:p-6 md:p-8">
        {/* Image & Types */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Pokémon Image */}
          <img
            src={officialArtwork}
            alt={name}
            className="h-48 w-48 object-contain"
            loading="lazy"
          />

          {/* Type Badges */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <h2 className="text-xl font-semibold">Type(s):</h2>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-blue-100 px-3 py-1 text-blue-800"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">Stats</h2>
          <div className="space-y-2">
            {stats.map((statObj) => (
              <div key={statObj.stat.name}>
                <div className="flex items-center justify-between">
                  <span className="capitalize">{statObj.stat.name}</span>
                  <span className="font-medium">{statObj.base_stat}</span>
                </div>
                <div className="relative h-2 w-full rounded bg-gray-200">
                  <div
                    className="absolute left-0 top-0 h-2 rounded bg-blue-500"
                    style={{
                      width: `${(statObj.base_stat / 200) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abilities */}
        <div className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">Abilities</h2>
          <ul className="list-disc pl-5">
            {abilities.map((ability) => (
              <li key={ability} className="capitalize">
                {ability}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Go Back Button */}
      <div className="mt-6">
        <a
          href="/pokedex"
          className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
        >
          Back to Pokedex
        </a>
      </div>
    </div>
  );
}
