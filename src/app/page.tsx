"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const { scrollY } = useScroll();

  // Create parallax effects
  const ashParallax = useTransform(scrollY, [0, 500], [0, 100]);
  const leagueParallax = useTransform(scrollY, [200, 800], [0, 200]);

  return (
    <div className="min-h-screen overflow-hidden bg-gray-900 text-white">
      {/* Header Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
        {/* Background Image with Blur and Overlay */}
        <motion.div
          style={{ y: ashParallax }}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <Image
            src="/ash-ketchum.png"
            alt="Ash Ketchum"
            layout="fill"
            objectFit="cover"
            className="filter blur-sm brightness-75 contrast-110 saturate-150"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div> {/* Dark Overlay */}
        </motion.div>

        {/* Text Content */}
        <div className="relative z-0 px-4">
          <h1 className="text-5xl font-bold mb-4 sm:text-6xl text-white drop-shadow-md">
            Welcome to the Pokémon World
          </h1>
          <p className="text-lg max-w-3xl mx-auto sm:text-xl text-white drop-shadow-md">
            Dive into the incredible journey of Ash Ketchum, explore the leagues, and relive
            your favorite moments from the Pokémon series!
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="relative px-8 py-20 bg-gray-800">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-4xl mx-auto text-center z-10"
        >
          <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-md">
            A Brief History of Pokémon
          </h2>
          <p className="text-lg leading-relaxed text-white drop-shadow-md">
            Pokémon started as a video game series in 1996 and quickly grew into a global
            phenomenon, spanning anime, movies, trading cards, and more. Follow Ash
            Ketchum's dream to become a Pokémon Master as he travels through various
            regions, participating in leagues and making friends along the way.
          </p>
        </motion.div>
      </section>

      {/* Leagues Section */}
      <section className="relative py-20">
        {/* Background Image with Overlay */}
        <motion.div
          style={{ y: leagueParallax }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/pokemon-leagues-bg.jpg"
            alt="Pokémon Leagues Background"
            layout="fill"
            objectFit="cover"
            className="filter blur-sm brightness-75 contrast-110 saturate-150"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div> {/* Dark Overlay */}
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-10 text-white drop-shadow-md">
            The Pokémon Leagues
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Diamond & Pearl",
                image: "/diamond-pearl.jpg",
                description:
                  "Explore Ash's journey in the Sinnoh region, where he faces strong rivals like Paul and competes in epic battles.",
              },
              {
                title: "X/Y Series",
                image: "/xy-series.jpg",
                description:
                  "Follow Ash in the Kalos region as he forms an incredible bond with Greninja and participates in the Kalos League.",
              },
              {
                title: "Sun & Moon",
                image: "/sun-moon.jpg",
                description:
                  "Ash's adventure in the Alola region is full of fun, unique challenges, and new Pokémon companions.",
              },
              {
                title: "Journeys",
                image: "/journeys.jpg",
                description:
                  "Ash travels across regions with Goh, aiming to challenge Leon, the strongest Champion in the Pokémon world.",
              },
              {
                title: "Black & White",
                image: "/black-white.jpg",
                description:
                  "Explore Ash's journey in the Unova region, full of new experiences, companions, and exciting battles.",
              },
              {
                title: "Original Series",
                image: "/original-series.jpg",
                description:
                  "The series that started it all, following Ash's journey through Kanto, Johto, and the Indigo League.",
              },
            ].map((league, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-700 rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={league.image}
                  alt={league.title}
                  width={500}
                  height={300}
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-semibold mb-2 text-white drop-shadow-md">
                    {league.title}
                  </h3>
                  <p className="text-sm text-gray-300">{league.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
