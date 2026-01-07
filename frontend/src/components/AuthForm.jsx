
import React from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";

export default function AuthForm({
  title,
  fields,
  submitLabel,
  onSubmit,
  error,
  footer,
  isSubmitting,
}) {
  return (
    <div className="max-w-md mx-auto my-10 p-8 border rounded shadow bg-white">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((f) => (
          <input
            key={f.name}
            className="w-full p-2 border rounded"
            type={f.type}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            value={f.value}
            onChange={f.onChange}
            required={f.required !== false}
          />
        ))}

        <button
          className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          {submitLabel}
        </button>
      </form>

      <div className="mt-3">
        <Alert type="error" message={error} />
      </div>

      {footer ? (
        <div className="mt-4 text-sm">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

export function AuthFormLink({ to, children }) {
  return (
    <Link to={to} className="text-blue-600 underline">
      {children}
    </Link>
  );
}
