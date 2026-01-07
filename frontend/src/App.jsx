import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}