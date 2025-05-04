// LoginCard.jsx (with Login with Phone option)
import React, { useState } from 'react';
import './LoginPage.css';

function LoginCard({ siteInfo, email, setEmail, password, setPassword, rememberMe, setRememberMe, handleLogin }) {
  const [usePhoneLogin, setUsePhoneLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="login-card">
      <img src={siteInfo.logoUrl} alt="Logo" className="login-logo" />
      <h2 className="login-title">{siteInfo.title}</h2>
      <p className="login-subtitle">Log in to your account</p>

      <form className="login-form" onSubmit={handleLogin}>
        {!usePhoneLogin ? (
          <>
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
          </>
        ) : (
          <div className="input-wrapper">
            <span className="material-icons">phone</span>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        )}
        <div className="submit-button">
        <button type="submit">{usePhoneLogin ? 'Send OTP' : 'Log in'} </button>
        </div>
      </form>

      <button
        type="button"
        className="submit-button alt-button"
        onClick={() => setUsePhoneLogin((prev) => !prev)}>
        {usePhoneLogin ? 'Log in with Username' : 'Log in with Phone'}
      </button>

      <div className="login-footer">© 2025 Instyte</div>
    </div>
  );
}

export default LoginCard;