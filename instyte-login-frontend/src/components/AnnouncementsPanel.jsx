// AnnouncementsPanel.jsx (Responsive Info Cards - Horizontal Layout)
import React from 'react';
import './LoginPage.css';

function AnnouncementsPanel() {
  const announcements = [
    { icon: '🎉', text: 'New courses launching next week!,New courses launching next week!, New courses launching next week! New courses launching next week!' },
    { icon: '🛠', text: 'System maintenance on Sunday' },
    { icon: '📊', text: 'Your attendance report is now live' },
    { icon: '🎓', text: 'Admissions for 2025 are now open' },
    { icon: '📣', text: 'Parent-Teacher meeting on Friday' },
  ];

  const infoCards = [
    {
      title: 'Why choose Instyte?',
      description: 'Empowering schools with smart CRM, attendance, fees, and academic tools — all in one place.',
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
    },
    {
      title: 'Trusted by 500+ Schools',
      description: 'Institutes across India trust Instyte for reliability, support and student growth.',
      icon: '🏫'
    },
    {
      title: 'Your Data is Safe',
      description: 'Hosted on AWS with secure backups, encryption and full data privacy compliance.',
      icon: '🔒'
    },
    {
      title: 'Seamless Onboarding',
      description: 'Get started in minutes with guided setup, training, and personal onboarding support.',
      icon: '🚀'
    }
  ];

  return (
    <div className="announcement-wrapper">
      <div className="info-card" style={{ marginBottom: '1.5rem' }}>
        <span className="info-icon">👋</span>
        <div className="info-content">
          <h4>Welcome to Instyte</h4>
          <p>Stay informed with the latest updates from your school</p>
        </div>
      </div>

      <div className="info-card" style={{ marginBottom: '1.5rem' }}>
      <div className="info-content">
      <h2 className="announcement-title">📢 Announcements</h2>
      </div>
      <ul className="announcement-list">
        {announcements.map((item, idx) => (
          <li key={idx} className="announcement-item">
            <span className="announcement-icon">{item.icon}</span>
            <span className="announcement-text">{item.text}</span>
          </li>
        ))}
      </ul>
      </div>


      <div className="info-cards">
        {infoCards.map((card, idx) => (
          <div key={idx} className="info-card">
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