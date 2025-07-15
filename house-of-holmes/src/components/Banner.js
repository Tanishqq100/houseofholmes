import React from 'react';
import { useTranslation } from 'react-i18next';

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div className="banner">
      <a href="#consultation">{t('banner')}</a>
    </div>
  );
};

export default Banner; 