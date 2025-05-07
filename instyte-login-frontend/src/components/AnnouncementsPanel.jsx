import React from 'react';
import './LoginPage.css';

function AnnouncementsPanel() {
  const announcements = [
    { icon: '🎉', text: 'New courses launching next week!,New courses launching next week!, New courses launching next week! New courses launching next week!' },
    { icon: '🛠', text: 'System maintenance on Sunday' },
    { icon: '📊', text: 'Your attendance report is now live' },
    { icon: '🎓', text: 'Admissions for 2025 are now open' },
    { icon: '📣', text: 'Parent-Teacher meeting on Friday' },
    { icon: '🎉', text: '2. New courses launching next week!,New courses launching next week!, New courses launching next week! New courses launching next week!' },
    { icon: '🛠', text: '2. System maintenance on Sunday' },
    { icon: '📊', text: '2. Your attendance report is now live' },
    { icon: '🎓', text: '2. Admissions for 2025 are now open' },
    { icon: '📣', text: '2. Parent-Teacher meeting on Friday' },
  ];

  const infoCards = [
    {
      title: 'Why choose Instyte?',
      description: 'Empowering schools with smart CRM, attendance, fees, and academic tools — all in one place.' +
      'Empowering schools with smart CRM, attendance, fees, and academic tools — all in one place'
      + 'Empowering schools with smart CRM, attendance, fees, and academic tools — all in one place',
      icon: '💡'
    },
    {
      title: 'Need Help?',
      description: 'Contact support@instyte.in or use the help icon at bottom right.',
      icon: '🆘'
    },
    {
      title: 'Mobile App Available',
      description: 'Download our Android/iOS app and access features anytime, anywhere.',
      icon: '📱'
    }
  ];

  return (
    <div className="announcement-wrapper">
      <div className="info-card" style={{ marginBottom: '1.5rem' }}>
        <div className="info-content">
          <h4>👋 Welcome to Instyte</h4>
          <p>Stay informed with the latest updates from your school</p>
        </div>
      </div>

      <div className="info-card announcement-scroll-container" style={{ marginBottom: '1.5rem' }}>
  <div className="info-content">
    <h2 className="announcement-title">🔔 Announcements</h2>
  </div>
  <div className="announcement-scroll-viewport">
    <ul className="announcement-scroll-list">
      {[...announcements, ...announcements].map((item, idx) => (
        <li key={idx} className="announcement-item">
          <span className="announcement-icon">{item.icon}</span>
          <span className="announcement-text">{item.text}</span>
        </li>
      ))}
    </ul>
  </div>
</div>


<div className="info-cards">
  {infoCards.map((card, idx) => (
    <div
      key={idx}
      className={`info-card ${
        idx === 0 ? 'card-academic' : idx === 1 ? 'card-help' : 'card-mobile'
      }`}
    >
      <span className="info-icon">{card.icon}</span>
      <div className="info-content">
        <h4>{card.title}</h4>
        <p>{card.description}</p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default AnnouncementsPanel;