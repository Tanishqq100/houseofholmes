import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Pricing.css';

const Pricing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const pricingData = [
    { label: 'First 15 Minute Consult', value: 'FREE', note: 'for new clients only' },
    { label: 'Consulting Rate', value: '$250/hour', note: 'minimum 1-hour charge' },
    { label: 'Patternmaking', value: '$150/hour', note: 'minimum 3-hour charge' },
    { label: 'HoH Pattern Licensing', value: '$150–$450', note: 'depending on pattern' },
    { label: 'Grading', value: '$150/hour', note: 'minimum 1-hour charge' },
    { label: 'Marker Making', value: '$150/hour', note: 'minimum 1-hour charge' },
    { label: 'Development/Engineering', value: '$150/hour', note: 'minimum 5-hour charge' },
    { label: 'Sourcing', value: '$150/hour', note: 'minimum 1-hour charge' },
    { label: 'MSRP Calculations', value: '1st Initial - $150 per style' },
    { label: 'MSRP Adjustments', value: '$100 per style' },
    { label: 'Sample Making', value: '~$7.00/seam or quantity of 1', note: 'Includes cutting/sewing, minimum charge of $500/sample', italic: true },
    { label: 'Production', value: 'Project based. $300 reset fee if pieces not sewn together.' },
    { label: 'Thread Color Change Fee', value: '$20/color' },
    { label: 'Delivery', value: 'Allow 4–6 weeks for developmental samples, 16–20 weeks for production deliveries.' },
    { label: 'Rush Fee', value: 'If needed sooner than timelines listed, rush fee will be applied and is assessed based on project need.', italic: true },
  ];

  return (
    <div className="pricing-page">
      <button className="back-home-btn" onClick={() => navigate('/')}>← Back to Home</button>
      <h1 className="pricing-title">{t('pricing.title')}</h1>
      <div className="pricing-note">
        <strong>{t('pricing.note')}</strong>
      </div>
      <ul className="pricing-list">
        {pricingData.map((item, idx) => (
          <li className={`pricing-list-item${item.bold ? ' bold' : ''}${item.italic ? ' italic' : ''}`} key={idx}>
            <span className="pricing-label">{item.label}{item.note && <span className="pricing-note"> – {item.note}</span>}</span>
            <span className="pricing-value">{item.value}</span>
          </li>
        ))}
      </ul>
      <div className="pricing-note">
        <strong>{t('pricing.rushFee')}</strong>
      </div>
    </div>
  );
};

export default Pricing; 