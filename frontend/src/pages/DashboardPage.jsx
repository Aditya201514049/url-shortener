import React from "react";
import Navbar from "../components/Navbar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-3 text-gray-700">You are logged in.</p>
      </main>
    </div>
  );
}