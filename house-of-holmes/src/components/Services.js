import React from 'react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  const serviceData = [
    {
      icon: '🛠️',
      title: t('services.service1.title'),
      desc: t('services.service1.desc'),
      aria: t('services.service1.aria')
    },
    {
      icon: '✂️',
      title: t('services.service2.title'),
      desc: t('services.service2.desc'),
      aria: t('services.service2.aria')
    },
    {
      icon: '📐',
      title: t('services.service3.title'),
      desc: t('services.service3.desc'),
      aria: t('services.service3.aria')
    },
    {
      icon: '🏭',
      title: t('services.service4.title'),
      desc: t('services.service4.desc'),
      aria: t('services.service4.aria')
    }
  ];

  return (
    <section id="services">
      <h2>{t('services.title')}</h2>
      <div className="services-grid">
        {serviceData.map((service) => (
          <div className="service-card" key={service.title}>
            <div className="service-icon" aria-label={service.aria} role="img">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services; 