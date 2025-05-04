import React, { useState, useEffect } from 'react';
import './LoginPage.css'; // keep your CSS in a separate file

function LoginPage() {
  const [siteInfo, setSiteInfo] = useState({
    title: 'Instyte',
    logoUrl: '/assets/logo.png',
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    async function fetchSiteInfo() {
      try {
        const response = await fetch('/auth/login', { method: 'GET' });
        if (!response.ok) throw new Error('Failed to fetch site info');
        const data = await response.json();
        setSiteInfo({
          title: data.title || 'Instyte',
          logoUrl: data.logoUrl?.startsWith('http') ? data.logoUrl : `/app${data.logoUrl}`,
        });
        document.title = data.title || 'Instyte';
      } catch (error) {
        document.title = 'Instyte';
      }
    }

    fetchSiteInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <div className="login-page">
      <div className="login-card">
        <img src={siteInfo.logoUrl} alt="Logo" className="login-logo" />
        <h2 className="login-title">{siteInfo.title}</h2>
        <p className="login-subtitle">Log in to your account</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <span className="material-icons">person</span>
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <span className="material-icons">lock</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/auth/forgot">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">Log in</button>
        </form>

        <div className="login-footer">© 2025 Instyte</div>
      </div>
    </div>
  );
}

export default LoginPage;