"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <p className="text-lg mb-8">Sign in to access your Pokémon favorites and more!</p>
      <button
        onClick={() => signIn("github")}
        className="px-6 py-3 text-lg bg-blue-600 rounded hover:bg-blue-700"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
