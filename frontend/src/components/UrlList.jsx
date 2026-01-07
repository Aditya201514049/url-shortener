
import React from "react";
import UrlCard from "./UrlCard";

export default function UrlList({ urls, onDelete, deletingId }) {
  if (!urls || urls.length === 0) {
    return <div className="text-sm text-gray-600">No URLs yet. Create your first one above.</div>;
  }

  return (
    <div className="grid gap-3">
      {urls.map((u) => (
        <UrlCard key={u.id} url={u} onDelete={onDelete} isDeleting={deletingId === u.id} />
      ))}
    </div>
  );
}
