import React from 'react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.service1.title'),
      description: t('services.service1.desc'),
      icon: "🚀",
      aria: t('services.service1.aria')
    },
    {
      title: t('services.service2.title'),
      description: t('services.service2.desc'),
      icon: "✂️",
      aria: t('services.service2.aria')
    },
    {
      title: t('services.service3.title'),
      description: t('services.service3.desc'),
      icon: "📋",
      aria: t('services.service3.aria')
    },
    {
      title: t('services.service4.title'),
      description: t('services.service4.desc'),
      icon: "🏭",
      aria: t('services.service4.aria')
    }
  ];

  return (
    <section id="services">
      <h2>{t('services.title')}</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon" aria-label={service.aria}>
              {service.icon}
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services; 