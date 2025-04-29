import React, { useState, useEffect } from 'react';
import './LoginPage.css';

function LoginPage() {

  const [siteInfo, setSiteInfo] = useState({
    title: 'Instyte',
    logoUrl: '/assets/logo.png', // Default logo initially
  });
  const [rememberMe, setRememberMe] = useState(false);


  useEffect(() => {
    // Fetch site info from the backend
    async function fetchSiteInfo() {
      try {
        const response = await fetch('/auth/login', { method: 'GET' }); // frontend calls /auth/login
        if (!response.ok) throw new Error('Failed to fetch site info');
        const data = await response.json();

        setSiteInfo({
          title: data.title || 'Instyte',
          logoUrl: data.logoUrl?.startsWith('http') ? data.logoUrl : `/app${data.logoUrl}` || '/app/assets/logo.png',
        });

        document.title = data.title || 'Instyte';
      } catch (error) {
        console.error('Error fetching site info:', error);
        document.title = 'Instyte';
      }
    }

    fetchSiteInfo();
  }, []);



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      // Save token
      localStorage.setItem('token', data.token);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container" style={{
        backgroundImage: "url('/assets/login-illustration.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center", 
        backgroundSize: "auto 100%",          
        backgroundAttachment: "scroll" 
        }}>
        <div className="login-right">
        <img src={siteInfo.logoUrl} alt="Logo" 
        style={{ width: '200px', height: '200px', marginBottom: '1rem' }}/>
          <h2 className="welcome-text">{siteInfo.title}</h2>
          <p className="subtitle">Log in to your account</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="material-icons">person</span>
              <input
                type="email"
                placeholder="Username"
                autoComplete="username"
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="remember-forgot" 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              fontSize: '0.875rem', marginTop: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Remember Me </label>
              <a href="/auth/forgot" style={{ color: '#3b82f6', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <button type="submit" className="login-button">Log in</button>
          </form>
          <div className="mt-8 text-sm text-slate-400 text-center"> © 2025 Instyte </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;