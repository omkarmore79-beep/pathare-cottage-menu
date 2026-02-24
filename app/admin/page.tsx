"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/admin/add-dish";
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80 space-y-4">

        <h1 className="text-lg font-semibold text-center">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2"
        >
          Login
        </button>

      </div>
    </div>
  );
}