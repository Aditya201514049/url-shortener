
import React, { useEffect, useMemo, useState } from "react";

export default function UrlCard({ url, onDelete, isDeleting }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const isLongOriginal = useMemo(() => (url.original || "").length > 80, [url.original]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(url.shortUrl);
      setCopied(true);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <div className="rounded border bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm text-gray-500">Original</div>
          <div
            className={
              isExpanded
                ? "break-all text-sm font-medium text-gray-900"
                : "max-w-[520px] truncate text-sm font-medium text-gray-900"
            }
            title={url.original}
          >
            {url.original}
          </div>

          {isLongOriginal ? (
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="mt-1 text-xs font-medium text-blue-700 underline"
            >
              {isExpanded ? "Hide" : "Show"}
            </button>
          ) : null}

          <div className="mt-3 text-sm text-gray-500">Short</div>
          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              className="break-all text-sm font-medium text-blue-700 underline"
              href={url.shortUrl}
              target="_blank"
              rel="noreferrer"
            >
              {url.shortUrl}
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="rounded border bg-white px-3 py-1.5 text-sm font-medium"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              {copyError ? <span className="text-xs text-red-700">Copy failed</span> : null}
            </div>
          </div>

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
