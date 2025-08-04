import React from 'react';
import { useTranslation } from 'react-i18next';
import './MissionValues.css';
import { Link, useLocation } from 'react-router-dom';

const MissionValues = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isStandalone = location.pathname === '/mission-values';

  const values = [
    { title: t('missionValues.value1'), content: 'We commit to upholding the highest standards of craftsmanship and precision across all stages of development and production, ensuring that each product meets or exceeds client expectations.' },
    { title: t('missionValues.value2'), content: 'We treat all colleagues, clients, shareholders and stakeholders with dignity and respect. We embrace diversity in race, gender, religion, sexual orientation, ability, and thought, fostering an inclusive environment.' },
    { title: t('missionValues.value3'), content: 'We promote teamwork, open communication, and synergy across employees, clients, shareholders and stakeholders to achieve mutual success and growth.' },
    { title: t('missionValues.value4'), content: 'We operate with honesty, transparency, and strong ethical principles, building trust and credibility with clients, employees, and partners.' },
    { title: t('missionValues.value5'), content: 'Our clients are central to our operations. We prioritize personalized service and tailor-made solutions that cater to their specific needs and challenges.' },
    { title: t('missionValues.value6'), content: 'We prioritize and advocate for the well-being of our team by fostering a safe and supportive work environment.' }
  ];

  return (
    <section className="mission-values">
      <div className="mv-header">
        <img src="/images/owl-logo.JPG" alt="House of Holmes Owl Logo" className="mv-logo" />
        <h1 className="mv-title">{t('header.title')}</h1>
        {isStandalone && (
          <Link to="/" className="mv-back-home">← Back to Home</Link>
        )}
      </div>
      <h2 className="mv-heading">{t('missionValues.mission')}</h2>
      <p className="mv-mission">
        {t('missionValues.missionContent')}
      </p>
      <hr className="mv-divider" />
      <h2 className="mv-heading">{t('missionValues.vision')}</h2>
      <p className="mv-vision">{t('missionValues.visionContent')}</p>
      <hr className="mv-divider" />
      <h2 className="mv-heading">{t('missionValues.values')}</h2>
      <div className="mv-values-grid">
        {values.map((value, index) => (
          <div key={index} className="mv-value">
            <h3>{value.title}</h3>
            <p>{value.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionValues; 