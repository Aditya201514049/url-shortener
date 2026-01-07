
import React from "react";

export default function UrlCard({ url, onDelete, isDeleting }) {
  return (
    <div className="rounded border bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm text-gray-500">Original</div>
          <div className="truncate text-sm font-medium text-gray-900">{url.original}</div>

          <div className="mt-3 text-sm text-gray-500">Short</div>
          <a
            className="break-all text-sm font-medium text-blue-700 underline"
            href={url.shortUrl}
            target="_blank"
            rel="noreferrer"
          >
            {url.shortUrl}
          </a>

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-600">
            <span>Clicks: {url.clicks ?? 0}</span>
            {url.createdAt ? <span>Created: {new Date(url.createdAt).toLocaleString()}</span> : null}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onDelete(url.id)}
          disabled={isDeleting}
          className="shrink-0 rounded border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 disabled:opacity-60"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
