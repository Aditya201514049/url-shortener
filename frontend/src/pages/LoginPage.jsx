import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import AuthForm, { AuthFormLink } from "../components/AuthForm";

const API_URL = import.meta.env.VITE_API_URL; // Adjust API base if needed

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      login(data.token); // Save the token and mark user as logged in
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Login"
      submitLabel="Login"
      onSubmit={handleSubmit}
      error={error}
      isSubmitting={isSubmitting}
      fields={[
        {
          name: "email",
          type: "email",
          placeholder: "Email",
          autoComplete: "username",
          value: email,
          onChange: (e) => setEmail(e.target.value),
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          autoComplete: "current-password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
        },
      ]}
      footer={
        <>
          No account? <AuthFormLink to="/register">Register</AuthFormLink>
        </>
      }
    />
  );
}