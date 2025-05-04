// LoginCard.jsx (with error display at the top)
import React, { useState } from 'react';
import './LoginPage.css';

function LoginCard({ siteInfo, email, setEmail, password, setPassword, rememberMe, setRememberMe, handleLogin }) {
  const [usePhoneLogin, setUsePhoneLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const validateFields = () => {
    if (usePhoneLogin) {
      if (!phoneNumber) return 'Phone number is required';
      if (otpSent && !otp) return 'OTP is required';
    } else {
      if (!email) return 'Username is required';
      if (!password) return 'Password is required';
    }
    return '';
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    const err = validateFields();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    if (!otpSent) {
      setOtpSent(true); // simulate sending OTP
    } else {
      handleLogin(e);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const err = validateFields();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    handleLogin(e);
  };

  return (
    <div className="login-card">
      <img src={siteInfo.logoUrl} alt="Logo" className="login-logo" />
      <h2 className="login-title">{siteInfo.title}</h2>
      <p className="login-subtitle">Log in to your account</p>

      {error && <div className="login-error">{error}</div>}

      <form className="login-form" onSubmit={usePhoneLogin ? handlePhoneLogin : handleFormSubmit}>
        {!usePhoneLogin ? (
          <>
            <div className="input-wrapper">
              <span className="material-icons">person</span>
              <input
                type="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-wrapper">
              <span className="material-icons">lock</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="remember-forgot">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}/> Remember me
              </label>
              <a href="/auth/forgot">Forgot password?</a>
            </div>
          </>) : (<>
            <div className="input-wrapper">
              <span className="material-icons">phone</span>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                  setPhoneNumber(onlyNums);
                }}/>
            </div>

            {otpSent && (
              <div className="input-wrapper">
                <span className="material-icons">key</span>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
          </>
        )}

        <div className="submit-button">
        <button type="submit" >
          {usePhoneLogin ? (otpSent ? 'Verify & Login' : 'Send OTP') : 'Log in'}
        </button></div>
      </form>
        <div>
      <button className="submit-button alt-button"
        type="button"
        
        onClick={() => {
          setUsePhoneLogin((prev) => !prev);
          setOtpSent(false);
          setOtp('');
          setPhoneNumber('');
          setEmail('');
          setPassword('');
          setError('');
        }}
      >
        {usePhoneLogin ? 'Log in with Username' : 'Log in with Phone Number'}
      </button>
      </div>

      <div className="login-footer">© 2025 Instyte</div>
    </div>
  );
}

export default LoginCard;