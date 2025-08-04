import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about">
      <h2>{t('about.title')}</h2>
      <div className="about-panel">
        <p>{t('about.content')}</p>
      </div>
    </section>
  );
};

export default About; 