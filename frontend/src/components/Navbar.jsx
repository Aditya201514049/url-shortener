
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="text-lg font-semibold">
          URL Shortener
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600">{user?.name || user?.email || ""}</span>
              <Link to="/dashboard" className="text-sm font-medium text-blue-700">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-blue-700">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
