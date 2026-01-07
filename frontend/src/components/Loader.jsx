
import React from "react";

export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
