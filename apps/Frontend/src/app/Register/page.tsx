"use client";

import { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleRegister() {
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Registered successfully: ${JSON.stringify(data)}`);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Register error:', error);
      setMessage('Something went wrong');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}