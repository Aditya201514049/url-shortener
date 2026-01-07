
import { useCallback } from "react";
import { useAuthContext } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function useApi() {
  const { user, logout } = useAuthContext();

  const request = useCallback(
    async (path, options = {}) => {
      const headers = {
        ...(options.headers || {}),
      };

      if (!(options.body instanceof FormData)) {
        if (!headers["Content-Type"] && options.body != null) {
          headers["Content-Type"] = "application/json";
        }
      }

      if (user?.token) {
        headers.Authorization = `Bearer ${user.token}`;
      }

      const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        logout();
      }

      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    },
    [user?.token, logout]
  );

  return {
    request,
    get: (path) => request(path, { method: "GET" }),
    post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
    del: (path) => request(path, { method: "DELETE" }),
  };
}
