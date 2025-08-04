import React from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="hero">
      <img 
        src="/images/hero-bg.jpg" 
        alt="House of Holmes Manufacturing" 
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <div className="hero-overlay">
        <h1 className="hero-title">{t('hero.title')}</h1>
        <p className="hero-tagline">
          {t('hero.tagline')}
        </p>
        <a href="#services" className="hero-cta">
          {t('hero.cta')}
        </a>
      </div>
    </section>
  );
};

export default Hero; 