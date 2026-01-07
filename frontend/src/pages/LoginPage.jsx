import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL; // Adjust API base if needed

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      login(data.token); // Save the token and mark user as logged in
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 border rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          autoComplete="username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">
          Login
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      <div className="mt-4 text-sm">
        No account? <Link to="/register" className="text-blue-600 underline">Register</Link>
      </div>
    </div>
  );
}