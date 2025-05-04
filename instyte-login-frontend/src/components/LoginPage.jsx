import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import LoginCard from './LoginCard';
import AnnouncementsPanel from './AnnouncementsPanel';
import ContactPopup from './ContactPopup';

function LoginPage() {
  const [siteInfo, setSiteInfo] = useState({ title: 'Instyte', logoUrl: '/assets/logo.png' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

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

  const handleLogin = async (e) => {
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
      <div className="login-left">
        <AnnouncementsPanel />
      </div>

      <div className="login-right">
        <LoginCard
          siteInfo={siteInfo}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleLogin={handleLogin}
        />
      </div>
      <div className="contact-icon" onClick={() => setShowContactForm(true)}>
        <span className="material-icons">contact_support</span>
      </div>
      {showContactForm && (<ContactPopup onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
}

export default LoginPage;