import React from 'react';

function LoginCard({ siteInfo, email, setEmail, password, setPassword, rememberMe, setRememberMe, handleLogin }) {
  return (
    <div className="login-card">
      <img src={siteInfo.logoUrl} alt="Logo" className="login-logo" />
      <h2 className="login-title">{siteInfo.title}</h2>
      <p className="login-subtitle">Log in to your account</p>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-wrapper">
          <span className="material-icons">person</span>
          <input type="email" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="input-wrapper">
          <span className="material-icons">lock</span>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Remember me</label>
          <a href="/auth/forgot">Forgot password?</a>
        </div>
        <div className="submit-button">
            <button type="submit" >Log in</button>
        </div>
        
      </form>
      <div className="login-footer">© 2025 Instyte</div>
    </div>
  );
}

export default LoginCard;