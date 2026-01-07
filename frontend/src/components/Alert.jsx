
import React from "react";

export default function Alert({ type = "info", message }) {
  if (!message) return null;

  const styles = {
    success: "border-green-300 bg-green-50 text-green-800",
    error: "border-red-300 bg-red-50 text-red-800",
    info: "border-blue-300 bg-blue-50 text-blue-800",
  };

  return (
    <div className={`w-full rounded border px-3 py-2 text-sm ${styles[type] || styles.info}`}>
      {message}
    </div>
  );
}
