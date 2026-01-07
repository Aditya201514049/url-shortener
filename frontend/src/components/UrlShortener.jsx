
import React, { useState } from "react";
import Alert from "./Alert";
import useApi from "../hooks/useApi";

export default function UrlShortener({ onCreated }) {
  const api = useApi();
  const [original, setOriginal] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    try {
      const created = await api.post("/api/urls", { original });
      setOriginal("");
      setSuccess("Short URL created.");
      onCreated?.(created);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded border bg-white p-4">
      <h2 className="text-lg font-semibold">Create short URL</h2>

      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          className="w-full flex-1 rounded border p-2"
          type="url"
          placeholder="https://example.com"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Shorten"}
        </button>
      </form>

      <div className="mt-3 grid gap-2">
        <Alert type="error" message={error} />
        <Alert type="success" message={success} />
      </div>
    </div>
  );
}
