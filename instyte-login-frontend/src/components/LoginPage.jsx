// LoginPage.js

import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      localStorage.setItem('token', data.token);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <img src="/assets/login-illustration.png" alt="Login Illustration" className="login-illustration" />
        </div>
        <div className="login-right">
          <h2 className="welcome-text">Welcome</h2>
          <p className="subtitle">Sign in to your account</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="material-icons">person</span>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <span className="material-icons">lock</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="login-button">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
