import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import UrlShortener from "../components/UrlShortener";
import UrlList from "../components/UrlList";
import useApi from "../hooks/useApi";

export default function DashboardPage() {
  const api = useApi();
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadUrls = async () => {
    setError("");
    setIsLoading(true);
    try {
      const data = await api.get("/api/urls");
      setUrls(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const handleCreated = (created) => {
    setUrls((prev) => [created, ...prev]);
  };

  const handleDelete = async (id) => {
    setError("");
    setDeletingId(id);
    try {
      await api.del(`/api/urls/${id}`);
      setUrls((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-3 text-gray-700">Create, view, and delete your shortened URLs.</p>

        <div className="mt-6">
          <UrlShortener onCreated={handleCreated} />
        </div>

        <div className="mt-4">
          <Alert type="error" message={error} />
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your URLs</h2>
            <button
              type="button"
              onClick={loadUrls}
              className="rounded border bg-white px-3 py-1.5 text-sm font-medium"
            >
              Refresh
            </button>
          </div>

          {isLoading ? (
            <div className="text-sm text-gray-600">Loading...</div>
          ) : (
            <UrlList urls={urls} onDelete={handleDelete} deletingId={deletingId} />
          )}
        </div>
      </main>
    </div>
  );
}