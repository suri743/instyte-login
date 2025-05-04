import React, { useState } from 'react';
import './LoginPage.css';

function ContactPopup({ onClose }) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="contact-popup">
      <div className="popup-header gradient-header">
        <h3>Need Help?</h3>
        <span className="material-icons close-icon" onClick={onClose}>close</span>
      </div>

      <form className="popup-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <span className="material-icons">badge</span>
          <input type="text" placeholder="Name" required />
        </div>

        <div className="input-wrapper">
          <span className="material-icons">phone</span>
          <input type="text" placeholder="Mobile" required />
        </div>

        <div className="input-wrapper">
          <span className="material-icons">person</span>
          <input type="text" placeholder="Username" required />
        </div>

        <div className="input-wrapper">
          <textarea placeholder="Issue Description" required></textarea>
        </div>

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>

      {showSuccess && (
        <div className="success-toast">We've received your request</div>
      )}
    </div>
  );
}

export default ContactPopup;