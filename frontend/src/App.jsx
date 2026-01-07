import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import Loader from "./components/Loader";

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isInitializing } = useAuthContext();
  if (isInitializing) return <Loader />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { isAuthenticated, isInitializing } = useAuthContext();
  if (isInitializing) return <Loader />;
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

function HomeRoute() {
  const { isAuthenticated, isInitializing } = useAuthContext();
  if (isInitializing) return <Loader />;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <HomePage />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          } />
          <Route path="/register" element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          } />
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