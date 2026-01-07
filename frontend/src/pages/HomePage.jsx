import React from "react";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold">Welcome to the URL Shortener!</h1>
        <p className="mt-3 text-gray-700">
          Create an account, login, and start generating short links.
        </p>
      </main>
    </div>
  );
}