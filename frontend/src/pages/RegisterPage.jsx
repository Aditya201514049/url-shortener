import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm, { AuthFormLink } from "../components/AuthForm";

const API_URL = import.meta.env.VITE_API_URL; // Adjust API base if needed

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Register"
      submitLabel="Register"
      onSubmit={handleSubmit}
      error={error}
      isSubmitting={isSubmitting}
      fields={[
        {
          name: "name",
          type: "text",
          placeholder: "Name",
          autoComplete: "name",
          value: name,
          onChange: (e) => setName(e.target.value),
        },
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
          autoComplete: "new-password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
        },
      ]}
      footer={
        <>
          Already have an account? <AuthFormLink to="/login">Login</AuthFormLink>
        </>
      }
    />
  );
}